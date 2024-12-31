import React, { useState } from "react";
import './downloadReceipt.css'
import { FaTimes } from "react-icons/fa";

const DownloadReceipt = ({ onClose, downloadUrl }) => {
    const [closeDialog, setCloseDialog] = useState(false);

    const handleDownload = (documentLink) => {
        var link = document.createElement('a');
        link.href = documentLink;
        link.download = 'Receipt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.close();
    };

    const handleClose = () => {
        setTimeout(() => {
            onClose();
        }, 350);
        setCloseDialog(true);
    }

    return (
        <div className="downloadreceipt-container-overlay" onClick={handleClose}>
            <div className={`downloadreceipt-container ${closeDialog ? 'close' : ''}`} onClick={(e) => { e.stopPropagation(); }}>
                <div className="downloadreceipt-dialog-header">
                    <FaTimes className="downloadreceipt-dialog-close-btn" onClick={() => { onClose(); }} />
                </div>

                <div className="d-flex flex-column w-100 p-2">
                    <span className="fs-7">Collect Receipt</span>
                    <button className="downloadreceipt-button" onClick={() => { handleDownload(downloadUrl); }}>
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadReceipt;