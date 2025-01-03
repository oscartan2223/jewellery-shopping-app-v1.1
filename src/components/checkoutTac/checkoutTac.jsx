import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import './checkoutTac.css';

const CheckoutTAC = ({ onClose, proceedPayment }) => {
    const [page, setPage] = useState('tac');
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="checkouttac-dialog-container-overlay">
            {page === "tac" &&
                <div className="checkouttac-dialog-container">
                    <div className="checkouttac-dialog-header">
                        <h2 className="m-0 fs-4">Company term and condition</h2>
                        <FaTimes className="checkouttac-close-btn" onClick={() => { onClose(); }} />
                    </div>

                    <div className="checkouttac-dialog-content-container hide-scroll-container">
                        <div className="checkouttac-dialog-content">
                            <span className="font-custom-2">1. Pictures may be slightly different in color, size and so on from the actual jewelry. Please check the measurements provided before making the payment.</span>
                            <span className="font-custom-2">2. The net weight of gold goods is exactly 2 Decimal places. A slight difference of 0.03 grams should be allowed for the sensitivity of the balancing machine.</span>
                            <span className="font-custom-2">3. Some parts of gold items such as springs and solder may be made of gold of different mouth standards due to technical problems.</span>
                            <span className="font-custom-2">4. The shop reserves the right to cancel any transaction that has been made / paid for a specific reason. However, the payment will be refunded within 7 working days.</span>
                            <span className="font-custom-2">5. Please take note that those items that already purchased or ordered cannot be changed and cancelled.</span>
                            <span className="text-danger fw-bold fs-7 m-0 pb-3">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(event) => { setIsChecked(event.target.checked); }}
                                    className="checkbox-input"
                                />
                                <label className="checkbox-label">
                                    I have read and agree to the terms and condition stated by Kedai Emas Ion.
                                </label>
                            </span>
                        </div>
                    </div>

                    <div className="checkouttac-dialog-footer">
                        <button className="checkouttac-button" onClick={() => { setPage('payNow') }} disabled={!isChecked}>
                            Submit
                        </button>
                    </div>
                </div>
            }

            {page === "payNow" &&
                <div className="checkouttac-pay-dialog-container">
                    <div className="checkouttac-dialog-header">
                        <h2 className="m-0 fs-4">Pay Now</h2>
                        <FaTimes className="checkouttac-close-btn" onClick={() => { onClose(); }} />
                    </div>

                    <div className="checkouttac-pay-dialog-content-container">
                        <button className="checkouttac-button pay" onClick={() => { proceedPayment(); }} disabled={!isChecked}>
                            Pay Now
                        </button>
                        <label className="text-danger fs-7 fw-medium">(Note: Pay now using FPX Bank Online Payment)</label>
                    </div>
                </div>
            }

        </div >
    );
};

export default CheckoutTAC;