import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";


export default function Cart() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>

          <h3>Your cart is empty.</h3>

          <Link to="/">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      <div className="container">

        <h1>Shopping Cart</h1>

        {cart.map((item) => (

          <div
            key={item.id}
            className="cart-item"
          >

            <img
              src={`http://localhost:3000${item.image_url}`}
              alt={item.name}
              width="120"
            />

            <div>

              <h3>{item.name}</h3>

              <p>₹ {item.price}</p>

            </div>

            <div>

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                -
              </button>

              <span
                style={{
                  margin: "0 10px",
                }}
              >
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                removeItem(item.id)
              }
            >
              Remove
            </button>

          </div>

        ))}

        <hr />

        <h2>Total : ₹ {cartTotal}</h2>

        <button
          onClick={() =>
            navigate("/checkout")
          }
        >
          Proceed To Checkout
        </button>

      </div>

    </section>
  );
}