import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {

  const orderId =
    localStorage.getItem("lastOrderId");

  const paymentId =
    localStorage.getItem("lastPaymentId");

  const amount =
    localStorage.getItem("lastAmount");

  return (

    <section className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Payment Successful!
        </h1>

        <p>
          Thank you for your order.
          Your payment has been verified successfully.
        </p>

        <div className="order-details">

          <div>

            <span>
              Order ID
            </span>

            <strong>
              {orderId || "-"}
            </strong>

          </div>

          <div>

            <span>
              Payment ID
            </span>

            <strong>
              {paymentId || "-"}
            </strong>

          </div>

          <div>

            <span>
              Amount
            </span>

            <strong>
              ₹
              {amount
                ? Number(amount).toLocaleString("en-IN")
                : "0"
              }
            </strong>

          </div>

        </div>

        <Link
          to="/"
          className="continue-btn"
        >
          Continue Shopping
        </Link>

      </div>

    </section>

  );

}