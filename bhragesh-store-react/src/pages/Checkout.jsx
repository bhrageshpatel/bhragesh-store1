import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

import {
  createOrder,
  verifyPayment,
} from "../services/payment";

export default function Checkout() {

  const { cart, cartTotal } = useCart();

  const navigate = useNavigate();

  return (

    <section className="checkout-page">

      <div className="container">

        {/* ================================
            CHECKOUT HEADER
        ================================= */}

        <div className="checkout-header">

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="checkout-heading">

            <h1>Checkout</h1>

            <p className="checkout-subtitle">
              Enter your details to place your order.
            </p>

          </div>

        </div>


        {/* ================================
            CHECKOUT LAYOUT
        ================================= */}

        <div className="checkout-layout">


          {/* ================================
              LEFT - CUSTOMER DETAILS
          ================================= */}

          <section className="checkout-form">

            <h2>Customer Details</h2>

            <form>

              {/* Full Name */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  required
                />

              </div>


              {/* Email */}

              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                />

              </div>


              {/* Phone */}

              <div className="form-group">

                <label htmlFor="phone">
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter Mobile Number"
                  pattern="[0-9]{10}"
                  required
                />

              </div>


              {/* Address */}

              <div className="form-group">

                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="5"
                  placeholder="Delivery Address"
                  required
                />

              </div>


              {/* Payment Button */}

              <button
                className="checkout-btn"
                type="submit"
              >
                Continue To Payment
              </button>

            </form>

          </section>


          {/* ================================
              RIGHT - ORDER SUMMARY
          ================================= */}

          <section className="order-summary">

            <h2>Order Summary</h2>


            {/* Cart Items */}

            <div className="checkout-items">

              {cart.length === 0 ? (

                <p className="empty-checkout">
                  Your cart is empty.
                </p>

              ) : (

                cart.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div className="checkout-item-info">

                      <span className="checkout-item-name">
                        {item.name}
                      </span>

                      <span className="checkout-item-qty">
                        Qty: {item.quantity}
                      </span>

                    </div>

                    <strong>
                      ₹{" "}
                      {(
                        Number(item.price) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                ))

              )}

            </div>


            <hr />


            {/* Total */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹ {Number(cartTotal).toLocaleString("en-IN")}
              </strong>

            </div>

          </section>

        </div>

      </div>

    </section>

  );
}