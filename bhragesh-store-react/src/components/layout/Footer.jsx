import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* ================================
            BRAND
        ================================= */}

        <div className="footer-brand">

          <div className="footer-logo">
            <span>⚡</span>
            BHRAGESH
          </div>

          <p>
            Quality electronics components for makers,
            developers and modern technology projects.
          </p>

          <p className="footer-owner">
            Built by <strong>Bhragesh Patel</strong>
          </p>

        </div>


        {/* ================================
            QUICK LINKS
        ================================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="/#products">
            Products
          </a>

          <a href="/cart">
            Cart
          </a>

          <a href="/checkout">
            Checkout
          </a>

        </div>


        {/* ================================
            CATEGORIES
        ================================= */}

        <div className="footer-column">

          <h3>Categories</h3>

          <a href="/#products">
            Development Boards
          </a>

          <a href="/#products">
            Sensors
          </a>

          <a href="/#products">
            IoT Modules
          </a>

          <a href="/#products">
            Electronics
          </a>

        </div>


        {/* ================================
            CONTACT
        ================================= */}

        <div className="footer-column footer-contact">

          <h3>Contact</h3>

          <a href="mailto:bhragesh.work@gmail.com">
            📧 bhragesh.work@gmail.com
          </a>

          <a href="tel:+916263793011">
            📞 +91 62637 93011
          </a>

          <p>
            📍 India
          </p>

        </div>

      </div>


      {/* ================================
          FOOTER BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <p>
          © 2026 <strong>Bhragesh Store</strong>. All Rights Reserved.
        </p>

        <p>
          Built with React &amp; ❤️ by{" "}
          <strong>Bhragesh Patel</strong>
        </p>

      </div>

    </footer>
  );
}