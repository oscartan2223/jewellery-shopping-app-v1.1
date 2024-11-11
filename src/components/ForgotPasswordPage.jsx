import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/ForgotPasswordPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';

const ForgotPasswordPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const [resetPhase, setResetPhase] = useState(1);
    const [forgotEmail, setForgotEmail] = useState();
    const [viewPassword, setViewPassword] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [forgotData, setForgotData] = useState({
        email: "",
        otp: "",
        password: "",
        reenterpassword: "",
    });

    const handleRequest = () => {
        setTimeLeft(120);
        setIsActive(true);
    };

    const handleForgot = useCallback(() => {
        switch (resetPhase) {
            case 1:
                const emailValue = document.getElementById('forgot_email').value;
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailValue) {
                    showAlert('warning', 'Email cannot be empty!');
                } else if (!emailPattern.test(emailValue)) {
                    showAlert('warning', 'Please enter a valid email address!');
                } else {
                    setResetPhase(2);
                    handleRequest();
                }
                break;
            case 2:
                const otpValue = document.getElementById('forgot_otp');

                if (!otpValue.value) {
                    showAlert('warning', 'OTP cannot be empty!');
                } else if (otpValue.value.length !== 6) {
                    showAlert('error', 'Please enter complete OTP code!');
                } else {
                    if (handleCheckOtp()) {
                        setResetPhase(3);
                    } else {
                        showAlert('error', "Invalid OTP. Please enter correct OTP.");
                        otpValue.value = '';
                    }

                }
                break;
            case 3:
                const passwordValue = document.getElementById('forgot_password').value;
                const confirmPasswordValue = document.getElementById('forgot_reenterpassword').value;

                if (!passwordValue) {
                    showAlert('warning', "Password cannot be empty!");
                } else if (passwordValue.length < 8) {
                    showAlert('error', 'Password must be at least 8 characters long!');
                } else if (!/[A-Z]/.test(passwordValue)) {
                    showAlert('error', 'Password must contain at least one uppercase letter!');
                } else if (!/[a-z]/.test(passwordValue)) {
                    showAlert('error', 'Password must contain at least one lowercase letter!');
                } else if (!/[0-9]/.test(passwordValue)) {
                    showAlert('error', 'Password must contain at least one number!');
                } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
                    showAlert('error', 'Password must contain at least one special character!');
                } else if (!confirmPasswordValue) {
                    showAlert('warning', "Re-enter Password cannot be empty!");
                } else if (passwordValue !== confirmPasswordValue) {
                    showAlert('error', "Password must be the same as Re-enter Password!");
                } else {
                    if (handleCheckOtp()) {
                        navigate('/login');
                        showAlert('success', "Password Reset Successful.");
                    } else {
                        showAlert('error', "Invalid OTP. Please enter correct OTP.");
                    }
                }
                break;
            default:
                break;
        }
    }, [resetPhase, handleRequest]);

    const handleCheckOtp = () => {
        // Code here to compare OTP right or wrong
        return true;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "forgot_otp" && !/^\d*$/.test(value)) {
            showAlert('warning', 'OTP Code must contain only numbers!');
            return;
        }

        if (id === "forgot_otp" && value.length > 6) {
            showAlert('warning', 'OTP code must contain 6 digits only.')
            return;
        }

        setForgotData((prevData) => ({
            ...prevData,
            [id.replace("forgot_", "")]: value,
        }));
    };

    useEffect(() => {
        let interval;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="w-100 all-center">
            <div className="forgot-form">
                {resetPhase === 1 &&
                    <div className="all-center flex-column">
                        <h1 className="w-100 forgot-title text-center font-custom mb-5 position-relative">
                            Enter Your Email
                            <Tooltip title="Back to Login" arrow placement="top">
                                <FaArrowLeft className="back-login-arrow position-absolute top-0 bottom-0 start-0" onClick={() => { navigate('/login'); }} />
                            </Tooltip>
                        </h1>
                        <p className="mb-4">Please enter your email at below. You will be receive an email for 6-digit verfication code.</p>
                        <input
                            className="feedback_input form-control mb-4"
                            type="text"
                            id="forgot_email"
                            placeholder="Email"
                            value={forgotData.email}
                            onChange={handleChange}
                        />
                        <button
                            className="forgot_button btn-secondary w-100"
                            type="button"
                            onClick={handleForgot}>
                            <strong>Proceed</strong>
                        </button>
                    </div>
                }
                {resetPhase === 2 &&
                    <div className="all-center flex-column">
                        <h1 className="w-100 forgot-title text-center font-custom mb-4 position-relative">
                            Enter OTP Code
                            <Tooltip title="Back" arrow placement="top">
                                <FaArrowLeft className="back-login-arrow position-absolute top-0 bottom-0 start-0" onClick={() => { setResetPhase(resetPhase - 1) }} />
                            </Tooltip>
                        </h1>
                        <p className="mb-4">Please enter the 6-digits verfication code from your email at below.</p>
                        <input
                            className="feedback_input form-control mb-5"
                            type="text"
                            id="forgot_otp"
                            value={forgotData.otp}
                            placeholder="6-digits OTP code"
                            onChange={handleChange}
                        />
                        <button className="mb-1 text-decoration-underline" onClick={handleRequest} disabled={isActive}>{isActive ? `Request in ${formatTime(timeLeft)}` : 'Request'}</button>
                        <button
                            className="forgot_button btn-secondary w-100"
                            type="button"
                            onClick={handleForgot}>
                            <strong>Verify</strong>
                        </button>
                    </div>
                }
                {resetPhase === 3 &&
                    <div className="all-center flex-column">
                        <h1 className="w-100 forgot-title text-center font-custom mb-4 position-relative">
                            Reset Password
                            <Tooltip title="Back" arrow placement="top">
                                <FaArrowLeft className="back-login-arrow position-absolute top-0 bottom-0 start-0" onClick={() => { setResetPhase(resetPhase - 2) }} />
                            </Tooltip>
                        </h1>
                        <p className="mb-4">Please type the new password at below to reset your account's password.</p>
                        <input
                            className="feedback_input form-control mb-3"
                            type="password"
                            id="forgot_password"
                            placeholder="Enter new password"
                            value={forgotData.password}
                            onChange={handleChange}
                        />
                        <div className="password-input">
                            <input
                                className="feedback_input form-control  mb-4"
                                type={viewPassword ? 'text' : 'password'}
                                id="forgot_reenterpassword"
                                placeholder="Re-enter new password"
                                value={forgotData.reenterpassword}
                                onChange={handleChange}
                            />
                            <div className="password-view" onClick={() => { setViewPassword(!viewPassword) }}>
                                {viewPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                        <button
                            className="forgot_button btn-secondary w-100"
                            type="button"
                            onClick={handleForgot}>
                            <strong>Reset</strong>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ForgotPasswordPage;