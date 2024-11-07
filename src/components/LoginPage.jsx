import React, { useState } from 'react';
import '../assets/css/LoginPage.css';
import { useAuth } from '../authContext';

const LoginPage = ({ showAlert }) => {
  const { isLoggedIn } = useAuth();
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

  const submitLogin = () => {

  };

  return (
    <div className="w-100 all-center">
      <div className="login_form d-flex flex-column">
        <h1 className="login-title text-center font-custom mb-4">Login</h1>
        <p className="login-text text-center font-custom">Don't have an account? <a href="/register">Sign Up here.</a></p>
        <input
          className="feedback_input form-control mb-3"
          type="text"
          id="login_phone"
          placeholder="Phone"
          value={loginData.phone}
          onChange={handleChange}
        />
        <input
          className="feedback_input form-control  mb-3"
          type="password"
          id="login_password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        <p className="login-text login-forgot text-center"><a href='/forgot'>Forgot your password?</a></p>
        <button
          className="login_button btn-secondary w-100"
          type="button"
          onClick={submitLogin}>
          <strong>Sign In</strong>
        </button>
        <p className="login-text login-return"><a href='/'>Return to Store</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
