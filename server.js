const cors = require("cors");
require("dotenv").config();

const express = require("express");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");
const Razorpay = require("razorpay");

const app = express();

const PORT = process.env.PORT || 3000;

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// POSTGRESQL CONNECTION
// =====================================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    // Required for Render PostgreSQL connection
    ssl: {
        rejectUnauthorized: false
    }
});

// Test database connection when server starts
pool.connect()
    .then((client) => {
        console.log("✅ PostgreSQL connected successfully");
        client.release();
    })
    .catch((error) => {
        console.error(
            "❌ PostgreSQL connection failed:",
            error.message
        );
    });

// =====================================
// RAZORPAY
// =====================================

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// =====================================
// SERVE REACT / VITE FRONTEND
// =====================================

const reactDistPath = path.join(
    __dirname,
    "bhragesh-store-react",
    "dist"
);

// Serve new React/Vite production frontend
app.use(express.static(reactDistPath));

// Keep existing public assets available if needed
app.use(express.static(path.join(__dirname, "public")));

// =====================================
// TEST DATABASE
// =====================================

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "PostgreSQL connected successfully",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error("Database Test Error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

// =====================================
// GET PRODUCTS
// =====================================

app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                id,
                name,
                description,
                price,
                category,
                image_url,
                stock
            FROM products
            ORDER BY id ASC
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Products API Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load products",
            error: error.message
        });
    }
});

// =====================================
// CREATE RAZORPAY ORDER
// =====================================

app.post("/api/payment/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment amount"
            });
        }

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        console.log(
            "Razorpay Order Created:",
            order.id
        );

        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error(
            "Razorpay Order Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to create Razorpay order",
            error: error.message
        });
    }
});

// =====================================
// PAYMENT VERIFICATION
// =====================================

app.post("/api/payment/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            customer,
            cart,
            total_amount
        } = req.body;

        // =====================================
        // CHECK REQUIRED DATA
        // =====================================

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are missing"
            });
        }

        // =====================================
        // GENERATE SIGNATURE
        // =====================================

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");

        // =====================================
        // VERIFY PAYMENT
        // =====================================

        if (
            generatedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // =====================================
        // SAVE ORDER IN POSTGRESQL
        // =====================================

        const result = await pool.query(
            `
            INSERT INTO orders (
                customer_name,
                customer_email,
                customer_phone,
                customer_address,
                items,
                total_amount,
                razorpay_order_id,
                razorpay_payment_id,
                payment_status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9
            )
            RETURNING id
            `,
            [
                customer.name,
                customer.email,
                customer.phone,
                customer.address,
                JSON.stringify(cart),
                total_amount,
                razorpay_order_id,
                razorpay_payment_id,
                "paid"
            ]
        );

        // =====================================
        // SUCCESS RESPONSE
        // =====================================

        return res.json({
            success: true,
            message:
                "Payment verified and order saved",
            order_id: result.rows[0].id,
            payment_id: razorpay_payment_id
        });
    } catch (error) {
        console.error(
            "Payment verification error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while saving order",
            error: error.message
        });
    }
});

// =====================================
// REACT SPA FALLBACK
// =====================================

app.use((req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }

    // Never send API requests to React
    if (req.path.startsWith("/api/")) {
        return next();
    }

    // React/Vite SPA entry point
    res.sendFile(
        path.join(
            reactDistPath,
            "index.html"
        )
    );
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {
    console.log(
        `🚀 Bhragesh Store running on port ${PORT}`
    );
});