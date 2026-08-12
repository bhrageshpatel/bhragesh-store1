import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-container">

        <div className="contact-heading">

          <span>
            GET IN TOUCH
          </span>

          <h1>
            Contact B Store
          </h1>

          <p>
            Have a question about a product, order or
            electronics component? Feel free to contact us.
          </p>

        </div>


        <div className="contact-grid">

          {/* Contact Details */}

          <div className="contact-info">

            <div className="contact-info-card">

              <div className="contact-icon">
                👤
              </div>

              <div>
                <h3>
                  Owner
                </h3>

                <p>
                  Bhragesh Patel
                </p>
              </div>

            </div>


            <div className="contact-info-card">

              <div className="contact-icon">
                📧
              </div>

              <div>
                <h3>
                  Email
                </h3>

                <a href="mailto:bhragesh.work@gmail.com">
                  bhragesh.work@gmail.com
                </a>
              </div>

            </div>


            <div className="contact-info-card">

              <div className="contact-icon">
                📞
              </div>

              <div>
                <h3>
                  Phone
                </h3>

                <a href="tel:6263793011">
                  +91 62637 93011
                </a>
              </div>

            </div>


            <div className="contact-info-card">

              <div className="contact-icon">
                📍
              </div>

              <div>
                <h3>
                  Location
                </h3>

                <p>
                  India
                </p>
              </div>

            </div>

          </div>


          {/* Contact Form */}

          <div className="contact-form-card">

            <h2>
              Send a Message
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been received.");
              }}
            >

              <div className="contact-form-row">

                <div className="contact-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="contact-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              <div className="contact-field">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What is this about?"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-submit"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}