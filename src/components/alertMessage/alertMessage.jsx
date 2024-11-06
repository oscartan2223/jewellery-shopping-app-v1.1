import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './alertMessage.css';

const AlertMessage = ({ alert, duration, content, onClose }) => {
    const [visible, setVisible] = useState(true);

    const effectiveDuration = duration || 3;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose(); // Call onClose function passed from parent to notify it to hide alert
        }, effectiveDuration * 1000); // Convert seconds to milliseconds

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [effectiveDuration, onClose]);

    if (!visible) return null; // Don't render if not visible

    return (
        <div className={`alert ${alert}`}>
            <span 
                className="closebtn" 
                onClick={() => { 
                    setVisible(false);
                    onClose(); // Call onClose function
                }}
            >
                &times;
            </span>
            <span className={`icon ${alert}`}>&nbsp;<strong>{content}</strong></span>
        </div>
    );
};

AlertMessage.propTypes = {
    alert: PropTypes.oneOf(['error', 'warning', 'success']).isRequired,
    duration: PropTypes.number, // seconds
    content: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};


export default AlertMessage;
