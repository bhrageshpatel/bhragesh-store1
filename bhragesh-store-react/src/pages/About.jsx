import "./About.css";

export default function About() {
  return (
    <section className="about-page">

      <div className="about-container">

        <div className="about-hero">

          <span className="about-tag">
            ABOUT B STORE
          </span>

          <h1>
            Electronics Made
            <span> Simple.</span>
          </h1>

          <p>
            Welcome to B Store, your destination for quality
            electronics components, development boards, sensors
            and IoT modules.
          </p>

        </div>


        <div className="about-grid">

          <div className="about-card">

            <div className="about-icon">
              ⚡
            </div>

            <h2>
              Our Mission
            </h2>

            <p>
              Our mission is to make reliable electronics
              components easily accessible to students,
              developers, makers and technology enthusiasts.
            </p>

          </div>


          <div className="about-card">

            <div className="about-icon">
              🔧
            </div>

            <h2>
              What We Offer
            </h2>

            <p>
              Explore development boards, sensors, IoT modules
              and other electronics components for your
              next project.
            </p>

          </div>


          <div className="about-card">

            <div className="about-icon">
              🚀
            </div>

            <h2>
              Built For Makers
            </h2>

            <p>
              Whether you are building your first Arduino
              project or developing an IoT prototype,
              B Store is here to support your journey.
            </p>

          </div>

        </div>


        <div className="about-owner">

          <h2>
            About Bhragesh
          </h2>

          <p>
            B Store is created by
            <strong> Bhragesh Patel</strong>,
            with a focus on creating a simple and useful
            shopping experience for electronics enthusiasts
            and developers.
          </p>

        </div>

      </div>

    </section>
  );
}