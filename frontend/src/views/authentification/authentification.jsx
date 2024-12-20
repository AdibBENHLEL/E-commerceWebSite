import React, { useState } from "react";
import "./authentification.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    const data = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5500${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(isLogin ? "Logged in successfully!" : "Signed up successfully!");
      } else {
        setErrorMessage(result.error || "An error occurred.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth_total_page_div">
      <div className={`auth-box ${isLogin ? "login-box" : "sign_up-box"}`}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              {/* Fields for Signup */}
              <div className="user-box">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="user-input"
                />
              </div>
            </>
          )}

          {/* Shared Fields */}
          <div className="user-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="user-input"
            />
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="user-input"
            />
          </div>

          {/* Action Buttons */}
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Error Message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="alert_message">
            <p className="message">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="toggle-auth-mode"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

          <div className="alert_message">
            <p className="message">
              Return to Home <a href="/" className="home-link">HOME</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
