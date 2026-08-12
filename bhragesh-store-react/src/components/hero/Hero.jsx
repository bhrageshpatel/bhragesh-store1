import HeroCanvas from "./HeroCanvas";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          ⚡ Premium Electronic Store
        </span>

        <h1>
          Electronics <br />
          & Robotics
        </h1>

        <p>
          High-quality Electronic Components, Robotics Parts,
          IoT Modules and DIY Kits for Students,
          Engineers and Professionals.
        </p>

        <a href="#products" className="hero-btn">
          Explore Products →
        </a>

      </div>

      <div className="hero-right">
        <HeroCanvas />
      </div>

    </section>
  );
}