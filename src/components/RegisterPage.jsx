import React, { useState, useEffect } from "react";
import '../assets/css/RegisterPage.css'
import { useAuth } from '../authContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';

const RegisterPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const { isLoggedIn, register } = useAuth();
    const [viewPassword, setViewPassword] = useState(false);
    const [registerData, setRegisterData] = useState({
        email: "",
        name: "",
        ic: "",
        phone: "",
        password: "",
        otp: ""
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [id.replace("register_", "")]: value,
        }));
    };

    const handleRegister = () => {
        const registerEmail = document.getElementById('register_email').value;
        const registerName = document.getElementById('register_name').value;
        const registerIC = document.getElementById('register_ic').value;
        const registerPhone = document.getElementById('register_phone').value;
        const registerPassword = document.getElementById('register_password').value;
        const registerOTP = document.getElementById('register_otp').value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //email field
        if (!registerEmail) {
            showAlert('warning', 'Email cannot be empty!');
        } else if (!emailPattern.test(registerEmail)) {
            showAlert('warning', 'Please enter a valid email address!');
        }

        //name field
        else if (!registerName) {
            showAlert('warning', 'Name cannot be empty!');
        } else if (/[0-9]/.test(registerName)) {
            showAlert('error', 'Name should not consists of numerical digits!');
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(registerName)) {
            showAlert('error', 'Name should not consists of special character!');
        }

        //ic field
        else if (!registerIC) {
            showAlert('warning', "IC cannot be empty!");
        } else if (!/^\d+$/.test(registerIC)) {
            showAlert('error', 'IC should must contain only numerical digits!');
        }

        //phone field
        else if (!registerPhone) {
            showAlert('warning', "Phone cannot be empty!");
        } else if (!/^\d+$/.test(registerPhone)) {
            showAlert('error', 'Phone must contain only numerical digits!');
        }

        //password field
        else if (!registerPassword) {
            showAlert('warning', "Password cannot be empty!");
        } else if (registerPassword.length < 8) {
            showAlert('error', 'Password must be at least 8 characters long!');
        } else if (!/[A-Z]/.test(registerPassword)) {
            showAlert('error', 'Password must contain at least one uppercase letter!');
        } else if (!/[a-z]/.test(registerPassword)) {
            showAlert('error', 'Password must contain at least one lowercase letter!');
        } else if (!/[0-9]/.test(registerPassword)) {
            showAlert('error', 'Password must contain at least one number!');
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(registerPassword)) {
            showAlert('error', 'Password must contain at least one special character!');
        }

        //otp field
        else if (!registerOTP) {
            showAlert('warning', "OTP Code cannot be empty!");
        } else if (registerOTP.length !== 6) {
            showAlert('error', 'OTP Code must be 6 characters long!');
        } else if (!/^\d+$/.test(registerOTP)) {
            showAlert('error', 'OTP Code must contain only numerical digits!');
        }

        // success
        else {
            if (handleCheckOtp()) {
                navigate('/login');
                showAlert('success', "Account Register Successful.");
            } else {
                showAlert('error', "Invalid OTP. Please enter correct OTP.");
            }
        }
    };

    const handleCheckOtp = () => {
        // Code here to compare OTP right or wrong
        return true;
    };

    return (
        <div className="w-100 all-center">
            <div className="register_form d-flex flex-column">
                <h1 className="register-title text-center font-custom mb-5 position-relative">
                    Register
                    <Tooltip title="Back to Login" arrow placement="top">
                        <FaArrowLeft className="back-login-arrow position-absolute top-0 bottom-0 start-0" onClick={() => { navigate('/login'); }} />
                    </Tooltip>
                </h1>
                <input
                    className="feedback_input form-control mb-3"
                    type="text"
                    id="register_email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('register_name').focus(); } }}
                />
                <input
                    className="feedback_input form-control mb-3"
                    type="text"
                    id="register_name"
                    placeholder="Name"
                    value={registerData.name}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('register_ic').focus(); } }}
                />
                <input
                    className="feedback_input form-control mb-3"
                    type="text"
                    id="register_ic"
                    placeholder="IC"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={registerData.ic}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('register_phone').focus(); } }}
                />
                <input
                    className="feedback_input form-control mb-3"
                    type="text"
                    id="register_phone"
                    placeholder="Phone"
                    value={registerData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('register_password').focus(); } }}
                />
                <div className="password-input">
                    <input
                        className="feedback_input form-control  mb-3"
                        type={viewPassword ? 'text' : 'password'}
                        id="register_password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={handleChange}
                        onKeyDown={(e) => { if (e.key === "Enter") { document.getElementById('register_otp').focus(); } }}
                    />
                    <div className="password-view" onClick={() => { setViewPassword(!viewPassword) }}>
                        {viewPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                <input
                    className="feedback_input form-control mb-3"
                    type="text"
                    id="register_otp"
                    placeholder="Email OTP Code"
                    value={registerData.otp}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") { handleRegister(); } }}
                />
                <button
                    className="register_button btn-secondary w-100"
                    type="button"
                    onClick={handleRegister}>
                    <strong>Register</strong>
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;