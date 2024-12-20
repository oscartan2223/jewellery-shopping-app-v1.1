import React from "react";
import { FaTimes } from "react-icons/fa";
import './TrackingOrder.css';


const TrackingOrder = ({ trackingDetails, onClose }) => {
    return (
        <div className="tracking-overlay" onClick={() => { onClose(); }}>
            <div className="tracking-container" onClick={(e) => { e.stopPropagation(); }}>
                <h2 className="tracking-header">Cannot Detect Courier Company</h2>
            </div>

            <button className="tracking-close-btn">
                <FaTimes className="tracking-close-icon" />
            </button>
        </div>
    );
};

export default TrackingOrder;