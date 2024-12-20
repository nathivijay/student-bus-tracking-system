import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Bus, Menu, X } from 'lucide-react';
import './Header.css'
import GGU from './Assets/GGU.png'
import IIT from './Assets/IIT.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLoginOptions = () => setShowLoginOptions(!showLoginOptions);

  return (
    <nav className="header-nav">
      <div className="header">
        <div className="custom-element">

          <div className='header-partners-images-div'>
            <img src={GGU} alt="GGU" className='header-partners-image-left' />
            <img src={IIT} alt="IIt" className='header-partners-image' />
          </div>
          
          <div className="logo-div">
            <Link to="/" className="home-link">
              <Bus className="bus-logo" />
              <span className="bus-logo-text">Campus Commute</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-header">
            <ScrollLink to="home" className="nav-link">
              Home
            </ScrollLink>
            <ScrollLink to="features" className="nav-link">
              Features
            </ScrollLink>
            <ScrollLink to="about" className="nav-link">
              About Us
            </ScrollLink>
            <ScrollLink to="contact" className="nav-link">
              Contact
            </ScrollLink>
            
            <div className="relative">
              <button
                onClick={toggleLoginOptions}
                className="nav-link login-btn"
              >
                Login
              </button>
              {showLoginOptions && (
                <div className="login-options">
                  <Link
                    to="/admin-login"
                    className="login-link"
                  >
                    Admin
                  </Link>
                  <Link
                    to="/student-login"
                    className="login-link"
                  >
                    Student
                  </Link>
                </div>
              )}
            </div>
            
            {/* <Link
              to="/signup"
              className="sign-up-link"
            >
              Sign Up
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="menu-btn-div">
            <button
              onClick={toggleMenu}
              className="menu-btn"
            >
              {isOpen ? <X className="menu-logo" /> : <Menu className="menu-logo" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <div className="options-div">
              <ScrollLink
                to="home"
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="features"
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="about"
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </ScrollLink>
              <ScrollLink
                to="contact"
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </ScrollLink>
              <Link
                to="/admin-login"
                className="scroll-link"
              >
                Admin Login
              </Link>
              <Link
                to="/student-login"
                className="scroll-link"
              >
                Student Login
              </Link>
              {/* <Link
                to="/signup"
                className="sign-up-link-s"
              >
                Sign Up
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;