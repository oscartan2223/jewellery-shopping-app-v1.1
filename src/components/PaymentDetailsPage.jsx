import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../assets/css/PaymentDetailsPage.css';

const PaymentDetailsPage = ({ showAlert }) => {
    const amount = useLocation().state;
    const [collectType, setCollectType] = useState('delivery');

    return (
        <div className="w-100 all-center">
            {collectType === "" &&
                <div className="feedback_form">
                    <h2>Collect Type</h2>
                    <div>
                        <span>Collect Type<strong className="text-danger">*</strong></span>
                        <label>
                            <input type="radio" /> 
                            Delivery
                        </label>
                        <label>
                            <input type="radio" />
                            Self Collect
                        </label>
                    </div>
                </div>
            }
            {collectType === "delivery" &&
                <div className="feedback_form">
                    <h2>Collect Type</h2>
                    <div>
                        <span>Collect Type<strong className="text-danger">*</strong></span>
                    </div>
                    <div>
                        <span>Delivery with:</span>
                        <select>
                            <option>GDEX</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <span>IC <strong className="text-danger">*</strong></span>
                            <label>
                                <input type="radio" />
                                IC
                            </label>
                            <label>
                                <input type="radio" />
                                Passport
                            </label>
                        </div>
                        <input type="text" placeholder="920831105391" />
                    </div>
                    <div>
                        <span>Name: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="Lim" />
                    </div>
                    <div>
                        <span>Address: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="ENTER ADDRESS" />
                    </div>
                    <div>
                        <span>Cities: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="CITIES" />
                    </div>

                    <div>
                        <span>Postcode: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="Postcode" />
                    </div>
                    <div>
                        <span>State: <strong className="text-danger">*</strong></span>
                    </div>
                    <div>
                        <span>Country: <strong className="text-danger">*</strong></span>
                        <select disabled>
                            <option>MALAYSIA</option>
                        </select>
                    </div>
                    <div>
                        <span>Phone: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="0169551982" />
                    </div>
                    <div>
                        <span>Email: <strong className="text-damger">*</strong></span>
                        <input type="text" placeholder="ginz30@gmail.com" />
                    </div>
                    <div>
                        <span>Whatsapp:</span>
                        <select>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div>
                        <span>Remark:</span>
                        <input type="text" />
                    </div>
                </div>
            }
            {collectType === "selfcollect" &&
                <div className="feedback_form">
                    <div>
                        <div>
                            <span>IC <strong className="text-danger">*</strong></span>
                            <label>
                                <input type="radio" />
                                IC
                            </label>
                            <label>
                                <input type="radio" />
                                Passport
                            </label>
                        </div>
                        <input type="text" placeholder="920831105391" />
                    </div>
                    <div>
                        <span>Picker Name: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="Lim" />
                    </div>
                    <div>
                        <span>Picker Phone: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="0169551982" />
                    </div>
                    <div>
                        <span>Picker Email: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="ginnz30@gmail.com" />
                    </div>
                    <div>
                        <span>Collect Date: <strong className="text-danger">*</strong></span>
                        <input type="text" placeholder="02/01/2025 03:34 PM - 02/01/2025 03:34 PM" />
                    </div>
                    <div>
                        <span>Remark:</span>
                        <input type="text" />
                    </div>
                </div>
            }
        </div>
    );
};

export default PaymentDetailsPage;