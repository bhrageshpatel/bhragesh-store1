require("dotenv").config();
const express = require("express");

const path = require("path");
const { Pool } = require("pg");
const Razorpay = require("razorpay");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
const crypto = require("crypto");
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bhragesh_store",
    password: "Apna@123123",
    port: 5432
});
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

//payment verification
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

        // ===============================
        // Check Required Data
        // ===============================

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

        // ===============================
        // Generate Signature
        // ===============================

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

        // ===============================
        // Verify Payment
        // ===============================

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // ===============================
        // Save Order in PostgreSQL
        // ===============================

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

        // ===============================
        // Success Response
        // ===============================

        return res.json({
            success: true,

            message: "Payment verified and order saved",

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
            message: "Server error while saving order"
        });
    }
});
// =====================================
// TEST DATABASE
// =====================================

app.get("/api/test-db", async (req, res) => {

    try {

        await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "PostgreSQL connected successfully",
            time: new Date()
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
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
            message: "Unable to load products"
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

        console.log("Razorpay Order Created:", order.id);

        res.json({
            success: true,
            order: order
        });

    } catch (error) {

        console.error("Razorpay Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create Razorpay order",
            error: error.message
        });

    }

});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {

    console.log(
        `Bhragesh Store running on port ${PORT}`
    );

});