import "./Categories.css";

const categories = [
  "Arduino",
  "Sensors",
  "ESP8266",
  "ESP32",
  "Robotics",
  "Motors",
  "Modules",
  "Power Supply",
];

export default function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="container">

        <h2 className="category-title">
          Browse Categories
        </h2>

        <div className="category-list">
          {categories.map((item) => (
            <button key={item}>
              {item}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}