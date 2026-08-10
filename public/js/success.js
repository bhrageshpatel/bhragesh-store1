// ===============================
// Payment Success Page
// ===============================

// Get saved payment details
const orderId = localStorage.getItem("lastOrderId");
const paymentId = localStorage.getItem("lastPaymentId");
const amount = localStorage.getItem("lastAmount");

// Get HTML elements
const orderIdElement = document.getElementById("order-id");
const paymentIdElement = document.getElementById("payment-id");
const amountElement = document.getElementById("amount");

// ===============================
// Display Payment Details
// ===============================

if (orderId) {
    orderIdElement.textContent = orderId;
}

if (paymentId) {
    paymentIdElement.textContent = paymentId;
}

if (amount) {
    amountElement.textContent =
        `₹${Number(amount).toLocaleString("en-IN")}`;
}