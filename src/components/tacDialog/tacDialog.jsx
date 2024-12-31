import React, { useState } from "react";
import './tacDialog.css'

const TacDialog = ({ onClose }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="tacdialog-container-overlay">
            <div className="tacdialog-container" onClick={(e) => { e.stopPropagation(); }}>
                <div className="tacdialog-dialog-header">
                    Company terms and condition
                </div>
                <div className="tacdialog-content hide-scroll-container">
                    <span className="fs-6 fw-bold mb-4">
                        * Please record the entire process while unboxing the package for future reference.
                    </span>

                    <span className="fs-6 fw-bold mb-3">
                        * Sila rakam keseluruhan proses semasa membuka bungkusan untuk rujukan masa hadapan.
                    </span>

                    <span className="text-danger fw-bold fs-7">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(event) => { setIsChecked(event.target.checked); }}
                            className="checkbox-input"
                        />
                        <label className="checkbox-label">
                            I have read and agree to record the entire process while unboxing the package.
                        </label>
                    </span>

                </div>
                <div className="tacdialog-dialog-footer">
                    <button className="tacsubmit-button" onClick={() => { onClose(); }} disabled={!isChecked}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TacDialog;