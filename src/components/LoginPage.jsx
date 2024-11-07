import React, { useState } from 'react';
import '../assets/css/LoginPage.css';
import { useAuth } from '../authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = ({ showAlert }) => {
  const { isLoggedIn } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);
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
        <div className="password-input">

        
        <input
          className="feedback_input form-control  mb-3"
          type={viewPassword ? 'text' : 'password'}
          id="login_password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        <div className="password-view" onClick={() => {setViewPassword(!viewPassword)}}>
          {viewPassword ? <FaEye /> : <FaEyeSlash/>}
        </div>
        </div>
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
