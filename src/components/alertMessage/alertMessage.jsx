import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './alertMessage.css';

const AlertMessage = ({ alert, duration, content, onClose }) => {
    const [visible, setVisible] = useState(true);

    const effectiveDuration = duration || 3;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, effectiveDuration * 1000);

        return () => clearTimeout(timer);
    }, [effectiveDuration, onClose]);

    if (!visible) return null;

    return (
        <div className={`alert ${alert}`}>
            <span 
                className="closebtn" 
                onClick={() => { 
                    setVisible(false);
                    onClose();
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
