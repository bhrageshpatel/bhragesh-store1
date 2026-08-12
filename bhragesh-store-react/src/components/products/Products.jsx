import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Products.css";

export default function Products() {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        console.log("✅ Products Data:", data);

        setProducts(data);

        if (data.length > 0) {
          console.log("First Product:", data[0]);
          console.log("Image URL:", data[0].image_url);
        }
      } catch (err) {
        console.error("❌ API Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // =====================================
  // ADD TO CART
  // =====================================

  const handleAddToCart = (product) => {
    addToCart(product);

    console.log("🛒 Added To Cart:", product.name);
  };

  // =====================================
  // BUY NOW
  // =====================================

  const handleBuyNow = (product) => {
    console.log("⚡ Buy Now:", product.name);

    // Product cart mein add/update karo
    buyNow(product);

    // Direct checkout page
    navigate("/checkout");
  };

  // =====================================
  // UI
  // =====================================

  return (
    <section className="products" id="products">
      <div className="container">

        <h2>Our Products</h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : products.length === 0 ? (
          <h3>No products available.</h3>
        ) : (
          <div className="product-grid">

            {products.map((item) => (

              <div className="product-card" key={item.id}>

                {/* Product Image */}
                <img
                  src={`http://localhost:3000${item.image_url}`}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Product Name */}
                <h3>{item.name}</h3>

                {/* Product Description */}
                <p>{item.description}</p>

                {/* Product Price */}
                <h4>
                  ₹ {Number(item.price).toLocaleString("en-IN")}
                </h4>

                {/* Buttons */}
                <div className="product-buttons">

                  {/* Add To Cart */}
                  <button
                    type="button"
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add To Cart
                  </button>

                  {/* Buy Now */}
                  <button
                    type="button"
                    className="buy-btn"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}