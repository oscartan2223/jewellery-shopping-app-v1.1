import React, { useState, useEffect} from "react";

const ContactPage = ( showAlert ) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedbackData, setFeedbackData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

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
        }
    }, [isSubmitted, setFeedbackData]);

    const handleFeedbackSubmit = (feedbackData) => {
        console.log("Feedback submitted:", feedbackData);
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

            else if (feedbackData.message === '') {
                showAlert('warning', "Message cannot be empty!");
            }
            else {
                showAlert('success', 'Successfully submitted feedback form!');
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 2000);
            }
        }
    };

    return (
        <div className="feedback_form p-4 shadow">
            <h1 className="feedback_title text-center mb-5">Feedback Form</h1>
            <div className="mb-4">
                <input
                    className="feedback_input form-control"
                    type="text"
                    id="feedback_name"
                    placeholder="Name"
                    value={feedbackData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <input
                    className="feedback_input form-control"
                    type="text"
                    id="feedback_phone"
                    placeholder="Phone"
                    value={feedbackData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <input
                    className="feedback_input form-control"
                    type="email"
                    id="feedback_email"
                    placeholder="Email"
                    value={feedbackData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5">
                <textarea
                    className="feedback_textarea form-control"
                    id="feedback_message"
                    placeholder="Message"
                    rows="4"
                    value={feedbackData.message}
                    onChange={handleChange}
                />
            </div>
            <button
                className="feedback_button btn btn-primary w-100"
                type="button"
                onClick={submitFeedback}
            >
                Send Message
            </button>
        </div>
    );
};

export default ContactPage;