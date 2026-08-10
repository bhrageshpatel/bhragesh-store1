const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutTotal = document.getElementById("checkout-total");
const cartCount = document.getElementById("cart-count");
const checkoutForm = document.getElementById("checkout-form");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// Display Checkout Items
// ===============================

function displayCheckout() {
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>

            <a href="/">
                Continue Shopping
            </a>
        `;

        checkoutSubtotal.textContent = "₹0";
        checkoutTotal.textContent = "₹0";
        cartCount.textContent = "0";

        return;
    }

    let total = 0;
    let quantity = 0;

    checkoutItems.innerHTML = cart
        .map((item) => {
            const itemQuantity = item.quantity || 1;
            const itemPrice = Number(item.price);
            const itemTotal = itemPrice * itemQuantity;

            total += itemTotal;
            quantity += itemQuantity;

            return `
                <div class="checkout-item">

                    <div>
                        <strong>
                            ${item.name}
                        </strong>

                        <p>
                            ₹${itemPrice.toLocaleString("en-IN")}
                            × ${itemQuantity}
                        </p>
                    </div>

                    <strong>
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </strong>

                </div>
            `;
        })
        .join("");

    checkoutSubtotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    checkoutTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    cartCount.textContent = quantity;
}

// ===============================
// Submit Checkout
// ===============================

checkoutForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // ===============================
    // Check Cart
    // ===============================

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // ===============================
    // Customer Details
    // ===============================

    const customer = {
        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        address: document.getElementById("address").value.trim()
    };

    console.log("Customer Details:", customer);
    console.log("Cart:", cart);

    // ===============================
    // Calculate Total
    // ===============================

    const totalAmount = cart.reduce((total, item) => {
        const quantity = item.quantity || 1;

        return total + Number(item.price) * quantity;
    }, 0);

    console.log("Total Amount:", totalAmount);

    try {
        // ===============================
        // Create Razorpay Order
        // ===============================

        const response = await fetch(
            "/api/payment/create-order",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: totalAmount
                })
            }
        );

        const data = await response.json();

        console.log("Razorpay Order:", data);

        // ===============================
        // Check Backend Response
        // ===============================

        if (!response.ok || !data.success) {
            alert(
                data.message ||
                "Unable to create payment order."
            );

            return;
        }

        // ===============================
        // Razorpay Checkout Options
        // ===============================

        const options = {
            // Your Razorpay TEST Key ID
            key: "rzp_test_TOCYj6IkxcUzFT",

            amount: data.order.amount,

            currency: data.order.currency,

            name: "Bhragesh Store",

            description: "Electronics & DIY Components",

            order_id: data.order.id,

            // ===============================
            // Customer Information
            // ===============================

            prefill: {
                name: customer.name,

                email: customer.email,

                contact: customer.phone
            },

            // ===============================
            // Notes
            // ===============================

            notes: {
                address: customer.address
            },

            // ===============================
            // Razorpay Theme
            // ===============================

            theme: {
                color: "#ff8a00"
            },

            // ===============================
            // Payment Success
            // ===============================

            handler: async function (paymentResponse) {
                try {
                    const response = await fetch(
                        "/api/payment/verify",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                razorpay_order_id:
                                    paymentResponse.razorpay_order_id,

                                razorpay_payment_id:
                                    paymentResponse.razorpay_payment_id,

                                razorpay_signature:
                                    paymentResponse.razorpay_signature,
                                customer: customer,

                                cart: cart,

                                total_amount: totalAmount   
                            })
                        }
                    );

                    const data = await response.json();

                    // ===============================
                    // Verification Successful
                    // ===============================

                    if (data.success) {
                         // Save payment details for success page
                        localStorage.setItem(
                         "lastOrderId",
                         data.order_id
                        );

                        localStorage.setItem(
                        "lastPaymentId",
                         data.payment_id
                       );

                        localStorage.setItem(
                        "lastAmount",
                         totalAmount
                        );

                     // Clear cart
                        localStorage.removeItem("cart");
 
                        console.log(
                         "Verified Payment:",
                         paymentResponse
                        );

                      // Go to success page
                        window.location.href =
                       "/success.html";
                    }

                    // ===============================
                    // Verification Failed
                    // ===============================

                    else {
                        alert("Payment verification failed.");

                        console.error(
                            "Verification failed:",
                            data
                        );
                    }
                }

                catch (error) {
                    console.error(
                        "Verification Error:",
                        error
                    );

                    alert(
                        "Unable to verify payment."
                    );
                }
            },

            // ===============================
            // Payment Modal Closed
            // ===============================

            modal: {
                ondismiss: function () {
                    console.log(
                        "Razorpay checkout closed."
                    );
                }
            }
        };

        // ===============================
        // Create Razorpay Instance
        // ===============================

        const razorpay = new Razorpay(options);

        // ===============================
        // Payment Failure
        // ===============================

        razorpay.on(
            "payment.failed",
            function (response) {
                console.error(
                    "Payment Failed:",
                    response.error
                );

                alert(
                    "Payment failed.\n\n" +
                    response.error.description
                );
            }
        );

        // ===============================
        // Open Razorpay
        // ===============================

        razorpay.open();
    }

    catch (error) {
        console.error(
            "Payment Error:",
            error
        );

        alert(
            "Something went wrong while starting payment."
        );
    }
});

// ===============================
// Initial Load
// ===============================

displayCheckout();