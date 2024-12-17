import React, { useEffect, useState, useCallback } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import '../assets/css/ChangePassword.css';

const ChangePasswordPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const { isLoggedIn, userInformation } = useAuth();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');


    useEffect(() => {
        if (isLoggedIn === false) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (value, type) => {
        if (type === "old") {
            setOldPassword(value);
        } else if (type === "new") {
            setNewPassword(value);
        } else if (type === "reenter") {
            setReenterPassword(value);
        }
    };

    const togglePasswordVisibility = (type) => {
        if (type === 'old') {
            setShowOldPassword(!showOldPassword);
        } else if (type === 'new') {
            setShowNewPassword(!showNewPassword);
        }
    };

    const handleAutoNextLine = (e, target) => {
        if (e.key === 'Enter') {
            const targetFocus = document.getElementById(target);
            if (targetFocus) {
                targetFocus.focus();
            }
        }
    }

    const handleUpdateClick = () => {
        const oldPassword = document.getElementById('o_p').value;
        const newPassword = document.getElementById('n_p').value;
        const reenterPassword = document.getElementById('rn_p').value;

        if (!oldPassword) {
            showAlert("warning", "Old password is required.");
            return;
        }

        if (!newPassword) {
            showAlert("warning", "New password is required.");
            return;
        }

        if (!reenterPassword) {
            showAlert("warning", "Re-enter password is required.");
            return;
        }

        if (newPassword !== reenterPassword) {
            showAlert("error", "New password and re-entered password must be match.");
            return;
        }

        showAlert("success", "All fields are filled. Proceed with update...");
    };

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            handleUpdateClick();
        };
    };

    return (
        <div className="w-100 all-center">
            <NavigationBar />
            <div className="changepassword-form">
                <h1 className="text-center mb-4">Change Password</h1>
                <div>
                    <label>Old Password<strong className="text-danger font-bold">*</strong></label>
                    <div className="changepassword-input-container mb-4">
                        <input
                            className="feedback_input form-control"
                            type={showOldPassword ? "text" : "password"}
                            id="o_p"
                            placeholder="Old Password"
                            value={oldPassword}
                            onKeyDown={(e) => handleAutoNextLine(e, 'n_p')}
                            onChange={(e) => handleChange(e.target.value, "old")}
                        />
                        {showOldPassword ? <FaEye className="changepassword-input-password-icon" onClick={() => { setShowOldPassword(!showOldPassword) }} />
                            : <FaEyeSlash className="changepassword-input-password-icon" onClick={() => { setShowOldPassword(!showOldPassword) }} />}
                    </div>
                </div>

                <div>
                    <label>New Password<strong className="text-danger font-bold">*</strong></label>
                    <div className="changepassword-input-container mb-4">
                        <input
                            className="feedback_input form-control"
                            type={showNewPassword ? "text" : "password"}
                            id="n_p"
                            placeholder="New Password"
                            value={newPassword}
                            onKeyDown={(e) => handleAutoNextLine(e, 'rn_p')}
                            onChange={(e) => handleChange(e.target.value, "new")}
                        />
                        {showNewPassword ? <FaEye className="changepassword-input-password-icon" onClick={() => { setShowNewPassword(!showNewPassword) }} />
                            : <FaEyeSlash className="changepassword-input-password-icon" onClick={() => { setShowNewPassword(!showNewPassword) }} />}
                    </div>
                </div>

                <div>
                    <label>Re-enter New Password<strong className="text-danger font-bold">*</strong></label>
                    <input
                        className="feedback_input form-control mb-5"
                        type="password"
                        id="rn_p"
                        placeholder="Re-enter Password"
                        value={reenterPassword}
                        onKeyDown={(e) => handleSubmit(e)}
                        onChange={(e) => handleChange(e.target.value, "reenter")}
                    />
                </div>



                <button
                    className="changepassword-update-button btn-secondary w-100 mb-4"
                    type="button"
                    onClick={handleUpdateClick}>
                    <strong>Update</strong>
                </button>

                <button
                    className="changepassword-back-button btn-secondary w-100 mb-5"
                    type="button"
                    onClick={() => { navigate(-1); }}>
                    <strong>Back</strong>
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordPage;