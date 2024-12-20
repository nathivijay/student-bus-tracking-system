import React from "react";
import Header from "../Header/Header";
import Footer from "../Fotter/Fotter";
import {
  MapPin,
  Clock,
  Bell,
  Shield,
  Phone,
  Mail,
  MapPinned,
  Smartphone,
  Bus
} from "lucide-react";
import "./Home.css"; // Import the CSS file
// import aboutus from './Assets/aboutus.jpg'
import carousel1 from "./Assets/carousel1.jpg";
import carousel2 from "./Assets/carousel2.jpg";
import carousel3 from "./Assets/carousel3.jpg";
import aboutus from "./Assets/aboutus.jpg";
import GGU from "./Assets/GGU.png";
import IIT from "./Assets/IIT.png";
import IITT from "./Assets/IITT.png";

const Home = () => {
  return (
    <div className="home-page-div">
      <Header />
      <section id="home" className="hero-section">
        <div className="container">
          <div className="text-container">
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide hero-image-container"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={carousel1} className="d-block w-100" alt="1" />
                </div>
                <div className="carousel-item">
                  <img src={carousel2} className="d-block w-100" alt="2" />
                </div>
                <div className="carousel-item">
                  <img src={carousel3} className="d-block w-100" alt="3" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/*  */}

            <h1 className="hero-heading">Track Your Bus in Real-Time</h1>
            <p className="hero-subheading">
              Ensuring a seamless commute experience for students and staff.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-padding">
        <div className="features-container">
          <h2 className="features-heading">Features</h2>
          <div className="features-grid-container">
            <div className="feature-card">
              <MapPin className="feature-card-icon" />
              <h3 className="feature-card-subheading">Real-Time Tracking</h3>
              <p className="feature-card-paragraph">
                Track your school bus location in real-time with precise GPS
                technology
              </p>
            </div>
            <div className="feature-card">
              <Clock className="feature-card-icon" />
              <h3 className="feature-card-subheading">Schedule Updates</h3>
              <p className="feature-card-paragraph">
                Get instant updates about bus timings and schedule changes
              </p>
            </div>
            <div className="feature-card">
              <Smartphone className="feature-card-icon" />
              <h3 className="feature-card-subheading">User-Friendly App</h3>
              <p className="feature-card-paragraph">
                Easy to use mobile app for scheduling and monitoring rides.
              </p>
            </div>
            <div className="feature-card">
              <Bus className="feature-card-icon" />
              <h3 className="feature-card-subheading">Multiple Bus Tracking</h3>
              <p className="feature-card-paragraph">
                Track multiple buses simultaneously, perfect for families with
                more than one child or multiple bus routes.   
              </p>
            </div>
            <div className="feature-card">
              <Bell className="feature-card-icon" />
              <h3 className="feature-card-subheading">Notifications</h3>
              <p className="feature-card-paragraph">
                Receive alerts about bus arrival, delays, and emergency
                situations
              </p>
            </div>
            <div className="feature-card">
              <Shield className="feature-card-icon" />
              <h3 className="feature-card-subheading">Safety First</h3>
              <p className="feature-card-paragraph">
                Secure rides with verified drivers and safety protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-container-flex-container">
            <div className="about-us-half-width">
              <img
                // src="https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&q=80"
                src={aboutus}
                alt="About Us"
                className="about-us-img"
              />
            </div>
            <div className="about-us-half-width">
              <h2 className="about-us-main-head">About Us</h2>
              <p className="about-us-para">
                We are dedicated to providing the safest and most reliable bus
                tracking solution for schools and parents. Our system helps
                ensure the safety of students during their daily commute.
                <br />
                <br /> Our advanced bus tracking system offers a seamless and
                reliable way to monitor your campus transportation in real-time.
                Using GPS technology, our system allows students, staff, and
                visitors to track the exact location of buses, ensuring timely
                arrivals and departures.
                <br />
                <br /> This system not only enhances convenience but also
                prioritizes safety by providing real-time updates on the bus’s
                movement and estimated arrival times. With an easy-to-use mobile
                app, users can plan their journeys efficiently, avoid
                unnecessary wait times, and enjoy a stress-free commute. Whether
                it's for a regular daily route or an unexpected delay, our bus
                tracking system keeps you informed every step of the way.
              </p>
              <div className="about-us-icon-div">
                <Shield className="about-us-icon" />
                <span>Trusted</span>
              </div>
              <div className="about-us-icon-div">
                <MapPinned className="about-us-icon" />
                <span>Active in multiple cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* partner Section */}
      <section className="our-partner-section">
        <div class="partner">
          <h2>Technical Partners</h2>
          <div className="logo">
            <img src={IIT} alt="IIT" className="img-logos" />
          </div>
        </div>
        <div className="partner">
          <h2>University Partners</h2>
          <div className="universal-partners-div">
            <div className="logo">
              <img src={GGU} alt="GGU" className="img-logo" />
            </div>
            <div className="logo">
              <img src={IITT} alt="IITT" className="img-logo" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-Section">
        <div className="contact-container">
          <h2 className="contact-heading">Contact Us</h2>
          <div className="contact-grid-container">
            <div className="details-space">
              <div className="details-flex-container">
                <Phone className="details-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="details-flex-container">
                <Mail className="details-icon" />
                <div>
                  <h3>Email</h3>
                  <p>support@campuscommute.com</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Name" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
              <textarea placeholder="Message" className="form-input"></textarea>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
