import { API_URL } from "./api";

// =====================================
// CREATE RAZORPAY ORDER
// =====================================

export async function createOrder(amount) {

  const response = await fetch(
    `${API_URL}/payment/create-order`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        amount,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {

    throw new Error(
      data.message ||
      "Unable to create Razorpay order"
    );

  }

  return data.order;

}


// =====================================
// VERIFY PAYMENT
// =====================================

export async function verifyPayment(paymentData) {

  const response = await fetch(
    `${API_URL}/payment/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(
        paymentData
      ),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {

    throw new Error(
      data.message ||
      "Payment verification failed"
    );

  }

  return data;

}