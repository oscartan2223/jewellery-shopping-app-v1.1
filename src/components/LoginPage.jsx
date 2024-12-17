import React, { useState, useEffect } from 'react';
import '../assets/css/LoginPage.css';
import { useAuth } from '../authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cartContext';

const LoginPage = ({ showAlert }) => {
  const navigate = useNavigate();
  const { cartList } = useCart();
  const { isLoggedIn, login } = useAuth();
  const [viewPassword, setViewPassword] = useState(false);
  const [cartSelect, setCartSelect] = useState(false);
  const [loginData, setLoginData] = useState({
    phone: "",
    password: ""
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id.replace("login_", "")]: value,
    }));
  };

  const handleLogin = () => {
    const phoneInput = document.getElementById('login_phone');
    const passwordInput = document.getElementById('login_password');

    if (!phoneInput.value) {
      showAlert('warning', 'Phone Number cannot be empty!');
    } else if (!/^\d+$/.test(phoneInput.value)) {
      showAlert('error', 'Phone Number must contain only numerical digits!');
    } else if (!passwordInput.value) {
      showAlert('warning', 'Password cannot be empty!');
    } else if (passwordInput.value.length < 8) {
      showAlert('error', 'Password must be at least 8 characters long!');
    } else if (!/[A-Z]/.test(passwordInput.value)) {
      showAlert('error', 'Password must contain at least one uppercase letter!');
    } else if (!/[a-z]/.test(passwordInput.value)) {
      showAlert('error', 'Password must contain at least one lowercase letter!');
    } else if (!/[0-9]/.test(passwordInput.value)) {
      showAlert('error', 'Password must contain at least one number!');
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
      showAlert('error', 'Password must contain at least one special character!');
    } else {
      console.log("Success");

      const json_response = {
        status: true, // true for success, false for failure
        email: "example123@gmail.com",
        username: "exampleName",
        ic: "234342424",
        race: null
      };

      if (json_response.status) {
        //post api add the cartlist into database
        let cartAddStatus = true; // post api status
        if (cartAddStatus) {
          const userInfo = { phone: phoneInput.value, password: passwordInput.value, email: json_response.email, username: json_response.username, ic: json_response.ic, race: json_response.race };
          login(userInfo);
          showAlert('success', `Login Successful. Welcome back, ${json_response.username}!`, 4);
          setTimeout(() => {
            navigate('/');
          }, 100);
        } else {
          setCartSelect(true);
        }

      } else {
        showAlert('error', 'Incorrect Phone Number or Password!');
      }
    }
  };

  return (
    <div className="w-100 all-center">
      <div className="login_form d-flex flex-column">
        <h1 className="login-title text-center font-custom mb-4 select-none">Customer Login</h1>
        <p className="login-text text-center font-custom select-none">Don't have an account? <a href="/register">Register</a></p>
        <input
          className="feedback_input form-control mb-3"
          type="text"
          id="login_phone"
          placeholder="Phone"
          value={loginData.phone}
          onChange={handleChange}
          onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('login_password').focus(); } }}
        />
        <div className="password-input">
          <input
            className="feedback_input form-control  mb-3"
            type={viewPassword ? 'text' : 'password'}
            id="login_password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            onKeyDown={(e) => { if (e.key === "Enter") { e.target.blur(); handleLogin(); } }}
          />
          <div className="password-view" onClick={() => { setViewPassword(!viewPassword) }}>
            {viewPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <p className="login-text login-forgot text-center select-none"><a href='/forgot'>Forgot your password?</a></p>
        <button
          className="login_button btn-secondary w-100"
          type="button"
          onClick={handleLogin}>
          <strong>Sign In</strong>
        </button>
        <p className="login-text login-return select-none"><a href='/'>Return to Store</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
