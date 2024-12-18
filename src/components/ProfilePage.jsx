import React, { useState, useEffect } from "react";
import '../assets/css/ProfilePage.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../authContext';
import NavigationBar from "./navigationBar/NavigationBar";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [profileData, setProfileData] = useState({
        email: "test@gmail.com",
        name: "",
        race: "",
        language: "",
        ic: "",
        phone: "0123456789",
    });

    useEffect(() => {
        if (isLoggedIn === false) {
          const timer = setTimeout(() => {
            navigate('/login');
          }, 100);
          return () => clearTimeout(timer);
        } else {
          //setProfileData();
        }
      }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        setProfileData((prevData) => ({
            ...prevData,
            [id.replace("profile-", "")]: value,
        }));
    };

    const handleUpdate = () => {
        // post data to backend
    }

    return (
        <div className="w-100 all-center">
            <NavigationBar />
            <div className="profile-form">
                <h1 className="text-center mb-4">Edit account</h1>
                <div>
                    <label>Name<strong className="text-danger font-bold">*</strong></label>
                    <input
                        className="feedback_input form-control mb-3"
                        type="text"
                        id="profile-name"
                        placeholder="Name"
                        value={profileData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>IC<strong className="text-danger font-bold">*</strong></label>
                    <input
                        className="feedback_input form-control mb-3"
                        type="text"
                        id="profile-ic"
                        placeholder="IC"
                        value={profileData.ic}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Race</label>
                    <select
                        className="feedback_input form-control mb-3"
                        id="profile-race"
                        value={profileData.race}
                        onChange={handleChange}
                    >
                        <option value="">--RACE--</option>
                        <option value="Cina">Cina</option>
                        <option value="India">India</option>
                        <option value="Melayu">Melayu</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label>Language</label>
                    <select
                        className="feedback_input form-control mb-3"
                        id="profile-language"
                        value={profileData.language}
                        onChange={handleChange}
                    >
                        <option value="">--Language--</option>
                        <option value="English">English</option>
                        <option value="Bahasa Melayu">Bahasa Melayu</option>
                    </select>
                </div>
                <div>
                    <label>Phone<strong className="text-danger font-bold">*</strong></label>
                    <input
                        className="feedback_input form-control disabled-input mb-3"
                        type="text"
                        id="profile-phone"
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div>
                    <label>Email<strong className="text-danger font-bold">*</strong></label>
                    <input
                        className="feedback_input form-control disabled-input mb-5"
                        type="text"
                        id="profile-email"
                        placeholder="Email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <button
                    className="profile-update-button btn-secondary w-100 mb-3"
                    type="button"
                    onClick={handleUpdate}>
                    <strong>Update</strong>
                </button>

                <button
                    className="profile-back-button btn-secondary w-100 mb-5"
                    type="button"
                    onClick={() => {navigate(-1);}}>
                    <strong>Back</strong>
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;