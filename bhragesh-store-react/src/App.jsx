import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import Categories from "./pages/Categories";

import Home from "./pages/Home";
import Products from "../src/components/products/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          <Route path="/categories" element={<Categories />} />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }}
              >
                <h1>404 - Page Not Found</h1>
              </div>
            }
          />

        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;