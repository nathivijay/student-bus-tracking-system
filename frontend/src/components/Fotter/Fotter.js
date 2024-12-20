import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import {
  Bus,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Fotter.css";

const Footer = () => {
  return (
    <footer className="footer-page">
      <div className="footer-container">
        <div className="footer-grid-container">
          {/* Company Info */}
          <div className="company-info">
            <Link to="/" className="footer-logo">
              <Bus className="footer-bus-logo" />
              <span className="footer-bus-text">campus commute</span>
            </Link>
            <p className="footer-para">
              Making student transportation safer and more efficient with
              real-time tracking technology.
            </p>
            <div className="footer-socialmedia-logo-div">
              <a href="facebook" className="footer-socialmedia-logo">
                <Facebook size={20} />
              </a>
              <a href="twitter" className="footer-socialmedia-logo">
                <Twitter size={20} />
              </a>
              <a href="instagram" className="footer-socialmedia-logo">
                <Instagram size={20} />
              </a>
              <a href="linkedin" className="footer-socialmedia-logo">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="quick-link-main-head">Quick Links</h3>
            <ul className="quick-link-ul">
              <li>
                <ScrollLink to="home" className="quick-link-scroll-link">
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="features" className="quick-link-scroll-link">
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" className="quick-link-scroll-link">
                  About Us
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" className="quick-link-scroll-link">
                  Contact
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="contact-info-head">Contact Info</h3>
            <ul className="quick-link-ul">
              <li className="contact-info-li">
                <MapPin size={16} />
                <span>123 School Street, City, Country</span>
              </li>
              <li className="contact-info-li">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="contact-info-li">
                <Mail size={16} />
                <span>support@campuscommute.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="contact-info-head">Newsletter</h3>
            <p className="news-letter-para">
              Subscribe to our newsletter for updates
            </p>
            <form className="quick-link-ul">
              <input
                type="email"
                placeholder="Enter your email"
                className="news-letter-input"
              />
              <button type="submit" className="news-letters-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <p>
            &copy; {new Date().getFullYear()} campus commute. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
