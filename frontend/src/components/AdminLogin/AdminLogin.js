import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    userPin: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userPin: "",
    password: "",
    message: ""
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
    navigate("/admin/dashboard", { replace: true });
  };

  const onFailureLogin = (err) => {
    setErrors({ ...errors, message: err });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      const {userPin, password} = formData
      const userDetails = {admin_pin: userPin, password: password}
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          'Content-type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/admin-login', options)
      const data = await response.json()
      if(response.ok === true){
        onSuccessLogin(data.jwtToken)
      }else{
        onFailureLogin(data.error)
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
    <div className="admin-login-page">
      <div className="admin-logo">
        <Link to="/" className="admin-home-link">
          <Bus className="admin-bus-logo" />
          <span className="admin-bus-logo-text">Campus Commute</span>
        </Link>
        <h2 className="admin-main-head">Admin Login</h2>
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
            <Link to="/">
              <p className="admin-forgot-password">forgot password ?</p>
            </Link>
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
  );
};

export default AdminLogin;
