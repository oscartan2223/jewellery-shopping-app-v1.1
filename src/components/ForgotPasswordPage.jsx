import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const [resetPhase, setResetPhase] = useState(1);
    const [forgot_countdown, setForgotCountdown] = useState(120);
    const [isCounting, setIsCounting] = useState(false);
    const [otpLabel, setOtpLabel] = useState("Send OTP");
    const [forgotData, setForgotData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleResendOTP = useCallback(() => {
        if (!isCounting) {
            setIsCounting(true);
            setOtpLabel("Request OTP in 02:00");
            setForgotCountdown(120);
        }
    }, [isCounting]);

    const handleForgot = useCallback(() => {
        switch (resetPhase) {
            case 1:
                const emailValue = document.getElementById('f_email').value;
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailValue) {
                    showAlert('warning', 'Email cannot be empty!');
                } else if (!emailPattern.test(emailValue)) {
                    showAlert('warning', 'Please enter a valid email address!');
                } else {
                    setResetPhase(2);
                    handleResendOTP();
                }
                break;
            case 2:
                const otpValue = document.getElementById('submit1');

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
                const passwordValue = document.getElementById('f_password').value;
                const confirmPasswordValue = document.getElementById('fr_password').value;

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
    }, [resetPhase, handleResendOTP]);

    const handleCheckOtp = () => {
        // Code here to compare OTP right or wrong
        return true;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForgotData((prevData) => ({
            ...prevData,
            [id.replace("forgot_", "")]: value,
        }));
    };

    return (
        <div>
            {resetPhase === 1 &&
                <div>
                    <h1>Enter Your Email</h1>
                    <p>Please enter your email at below. You will be receive an email for 6-digit verfication code.</p>
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="forgot_email"
                        value={forgotData.email}
                        onChange={handleChange}
                    />
                    <button>Proceed</button>
                </div>
            }
            {resetPhase === 2 &&
                <div>
                    <h1>Enter OTP Code</h1>
                    <p>Please enter the 6-digits verfication code from your email at below.</p>
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="forgot_otp"
                        value={forgotData.otp}
                        onChange={handleChange}
                    />
                    <label>Request OTP</label>
                    <button>Verify</button>
                </div>
            }
            {resetPhase === 3 &&
                <div>
                    <h1>Reset Password</h1>
                    <p>Please type the new password at below to reset your account's password.</p>
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="forgot_password"
                        value={forgotData.password}
                        onChange={handleChange}
                    />
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="forgot_reenterpassword"
                        value={forgotData.reenterpassword}
                        onChange={handleChange}
                    />
                </div>
            }
        </div>
    );
};

export default ForgotPasswordPage;