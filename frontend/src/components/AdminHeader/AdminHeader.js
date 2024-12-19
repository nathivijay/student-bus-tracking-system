import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Menu, X } from 'lucide-react';
import './AdminHeader.css'

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="header-nav">
      <div className="header">
        <div className="custom-element">
          <div className="logo-div">
            <Link to="/" className="home-link">
              <Bus className="bus-logo" />
              <span className="bus-logo-text">Campus Commute</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="desktop-header">
            <Link to="/admin/dashboard" className="nav-link">
              Home
            </Link>
            <Link to="/admin/dashboard/bus" className="nav-link">
              Bus
            </Link>
            <Link to="/admin/dashboard/driver" className="nav-link">
              Driver
            </Link>
            <Link to="/admin/dashboard/route" className="nav-link">
              Route
            </Link>
            <Link to="/admin/dashboard/student" className="nav-link">
              Student
            </Link>
            
            <Link
              to="/admin/dashboard/track"
              className="sign-up-link"
            >
              Track
            </Link>
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
              <Link
                to="/admin/dashboard"
                smooth={true}
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/admin/dashboard/bus"
                smooth={true}
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Bus
              </Link>
              <Link
                to="/admin/dashboard/driver"
                smooth={true}
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Driver
              </Link>
              <Link
                to="contact"
                smooth={true}
                className="scroll-link"
                onClick={() => setIsOpen(false)}
              >
                Route
              </Link>
              <Link
                to="/admin/dashboard/student"
                className="scroll-link"
              >
                Student
              </Link>
              <Link
                to="/admin/dashboard/track"
                className="sign-up-link-s"
              >
                Track
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminHeader;