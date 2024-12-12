import React, { useEffect, useState } from 'react';
import '../assets/css/InstallmentPage.css';
import { FaTimes } from 'react-icons/fa';

const InstallmentPage = ({ onClose }) => {
    

    return (
        <div className="installment-dialog-overlay">
            <div className="installment-dialog-container" onClick={() => {onClose();}}>
                <div className="installment-dialog-header">
                    <h4 className="installment-dialog-heading">Installment</h4>
                    <FaTimes className="installment-dialog-close-btn" />
                </div>

                
            </div>
        </div>
    );
};

export default InstallmentPage;
