import "./Categories.css";

export default function Categories() {
  return (
    <section className="categories-page">
      <div className="categories-container">

        <div className="categories-icon">
          ⚡
        </div>

        <span className="categories-badge">
          B STORE
        </span>

        <h1>
          Categories
        </h1>

        <h2>
          Coming Soon
        </h2>

        <p>
          We are working on something exciting.
          <br />
          Product categories will be available here soon.
        </p>

        <div className="categories-box">
          <div className="category-item">
            <span>🔧</span>
            <strong>Development Boards</strong>
          </div>

          <div className="category-item">
            <span>📡</span>
            <strong>IoT Modules</strong>
          </div>

          <div className="category-item">
            <span>📟</span>
            <strong>Sensors</strong>
          </div>

          <div className="category-item">
            <span>🤖</span>
            <strong>Robotics</strong>
          </div>
        </div>

      </div>
    </section>
  );
}