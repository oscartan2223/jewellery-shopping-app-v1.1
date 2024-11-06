import React, { useState } from 'react';
import '../assets/css/LoginPage.css';

const LoginPage = ({ showAlert }) => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id.replace("login_", "")]: value,
    }));
  };

  return (
    <div className="w-100 all-center">
      <div className="login_form d-flex flex-column">
        <h2>Login</h2>
        <p>Don't have an account? <a href="/register">Sign Up here.</a></p>
        <input
          className="feedback_input form-control"
          type="text"
          id="login_phone"
          value={loginData.phone}
          onChange={handleChange}
        />
        <input
          className="feedback_input form-control"
          type="password"
          id="login_password"
          value={loginData.password}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LoginPage;
