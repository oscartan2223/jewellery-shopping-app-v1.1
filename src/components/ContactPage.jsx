import React, { useState, useEffect, useRef } from "react";
import '../assets/css/ContactPage.css';
import { Rating } from '@smastrom/react-rating';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const ContactPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shopName, setShopName] = useState('');
    const [address, setAddress]  = useState('');
    const [feedbackData, setFeedbackData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setShopName('Kedai Emas Ion');
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFeedbackData((prevData) => ({
            ...prevData,
            [id.replace("feedback_", "")]: value,
        }));
    };

    const submitFeedback = () => {
        handleFeedbackSubmit(feedbackData);
    };

    useEffect(() => {
        if (isSubmitted) {
            setFeedbackData({ name: "", phone: "", email: "", message: "" });
            setRating(0);
        }
    }, [isSubmitted, setFeedbackData]);

    const handleFeedbackSubmit = (feedbackData) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Email validation
        if (feedbackData.email === '') {
            showAlert('warning', 'Email cannot be empty!');
        } else if (!emailPattern.test(feedbackData.email)) {
            showAlert('warning', 'Please enter a valid email address!');
        }
        // Name validation
        else if (feedbackData.name === '') {
            showAlert('warning', 'Name cannot be empty!');
        } else if (/[0-9]/.test(feedbackData.name)) {
            showAlert('error', 'Name should not consist of numerical digits!');
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(feedbackData.name)) {
            showAlert('error', 'Name should not consist of special characters!');
        }
        // Phone validation
        else {
            let phoneNumber;
            try {
                phoneNumber = Number(feedbackData.phone);
                if (isNaN(phoneNumber)) {
                    throw new Error('Invalid number');
                }
            } catch (error) {
                showAlert('error', 'Phone must contain only numerical digits!');
                return;
            }

            if (feedbackData.phone === '') {
                showAlert('warning', "Phone cannot be empty!");
            }

            // else if (rating === 0) {
            //     showAlert('warning', "Rating cannot be empty!");
            // }

            else if (feedbackData.message === '') {
                showAlert('warning', "Message cannot be empty!");
            }
            else {
                showAlert('success', 'Successfully submitted feedback form!');
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            }
        }
    };

    const handleNavigate = (target) => {
        setTimeout(() => {
            navigate(target);
        }, 200)
        window.scrollTo(0, 0);
    };

    return (
        <div className="site-container">
            <div className="feedback_form p-4">
            <div className="shop-details-container">
                    <div className="shop-title">
                    <FaMapMarkerAlt  className="adress-icon"/>
                    <div className="shop-name font-custom">
                        {shopName}
                    </div>
                    </div>
                    <div className="shop-detail">
                        <p className="shop-content font-custom-2">28-01, Jalan Pinang 42, Taman Daya, 81100 Johor Bahru, Johor, Malaysia</p>
                        <p className="shop-content font-custom-2">Phone: 019-6691017</p>
                        <p className="shop-content font-custom-2">Email: <a className="shop-content" href="mailto:info@kedaiemasion.my">info@kedaiemasion.my</a></p>
                        <p className="shop-content font-custom-2">Operating Hours: 10:30a.m. - 09:00p.m. (Monday to Sunday)</p>
                    </div>
                </div>

                <hr className="featurette-divider" />
                <h1 className="feedback_title text-center mb-5 font-custom-2">Contact Us</h1>
                <div className="mb-4">
                    <label>Name<strong className="text-danger">*</strong></label>
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="feedback_name"
                        value={feedbackData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Phone<strong className="text-danger">*</strong></label>
                    <input
                        className="feedback_input form-control"
                        type="text"
                        id="feedback_phone"
                        value={feedbackData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label>Email<strong className="text-danger">*</strong></label>
                    <input
                        className="feedback_input form-control"
                        type="email"
                        id="feedback_email"
                        value={feedbackData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4 row d-flex w-100">
                    <label className="dynamic-label">Rating</label>
                    <Rating className="rating-class"
                        value={rating}
                        onChange={setRating}
                    />
                </div>
                <div className="mb-5">
                    <label>Message<strong className="text-danger">*</strong></label>
                    <textarea
                        className="feedback_textarea form-control"
                        id="feedback_message"
                        rows="4"
                        value={feedbackData.message}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="feedback_button btn-secondary w-100 mb-5"
                    type="button"
                    onClick={submitFeedback}
                    disabled={isSubmitted}>
                    <strong>Send Message</strong>
                </button>
                <label className="all-center fw-bold fs-3 text-decoration-underline" onClick={() => {handleNavigate('/location');}}>Find Us&nbsp; <FaArrowRight className="h-100 fs-6"/></label>
            </div>
        </div>
    );
};

export default ContactPage;