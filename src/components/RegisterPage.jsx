import React, { useState, useEffect } from "react";
import '../assets/css/RegisterPage.css'
import { useAuth } from '../authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();
    const [viewPassword, setViewPassword] = useState(false);
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

    const handleRegister = () => {

    };

    return (
        <div className="w-100 all-center">
            <div className="login_form d-flex flex-column">
                <h1 className="login-title text-center font-custom mb-4">Register</h1>
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
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister(); } }}
                    />
                    <div className="password-view" onClick={() => { setViewPassword(!viewPassword) }}>
                        {viewPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <p className="login-text login-forgot text-center"><a href='/forgot'>Forgot your password?</a></p>
                <button
                    className="login_button btn-secondary w-100"
                    type="button"
                    onClick={handleRegister}>
                    <strong>Register</strong>
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;