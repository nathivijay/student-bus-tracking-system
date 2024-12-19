import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    userPin: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userPin: "",
    password: "",
    message: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { userPin: "", password: "" };

    if (!formData.userPin) {
      newErrors.userPin = "User PIN is required";
      isValid = false;
    } else if (formData.userPin.length < 6) {
      newErrors.userPin = "User PIN must be at least 6 characters";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken);
    navigate("/", { replace: true });
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { userPin, password } = formData;
      const userDetails = { student_pin: userPin, password: password };
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:8000/student-login",
        options
      );
      const data = await response.json();
      if (response.ok === true) {
        onSuccessLogin(data.jwtToken);
      } else {
        onFailureLogin(data.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <div class="map-container">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.2588892430417!2d81.86574247462003!3d17.059984712155515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a379f6221208cd9%3A0xd719ebacd3af5c58!2sGodavari%20Global%20University!5e0!3m2!1sen!2sin!4v1732887480873!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="admin-login-page">
        <div className="admin-logo">
          <Link to="/" className="admin-home-link">
            <Bus className="admin-bus-logo" />
            <span className="admin-bus-logo-text">Campus Commute</span>
          </Link>
          <h2 className="admin-main-head">student Login</h2>
        </div>

        <div className="card">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="admin-login-form">
              <div>
                <label htmlFor="userPin" className="admin-login-label">
                  User PIN
                </label>
                <input
                  id="userPin"
                  name="userPin"
                  type="text"
                  autoComplete="username"
                  className="form-input"
                  value={formData.userPin}
                  onChange={handleChange}
                />
                {errors.userPin && (
                  <p className="error-message">{errors.userPin}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="admin-login-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>

              <div>
                <button type="submit" className="submit-button">
                  Sign in
                </button>
              </div>
              {errors.message && (
                <p className="error-message">{errors.message}</p>
              )}
            </form>

            <div className="custom-container">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help? Contact support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
