import React, { useState } from "react";
import '../assets/css/MyOrderPage.css';

const MyOrderPage = () => {
    const [selectedStatus, setSelectedStatus] = useState('Pending Payment');

    const handleTabClick = (selectedTab) => {
        setSelectedStatus(selectedTab);
    };

    return (
        <div className="myorder-container">
            <div className="myorder-content">
                <h1 className="myorder-title font-custom-2 border-bottom">Order</h1>
                <div className="nav-tabs-container mb-3">
                    <ul className="nav nav-tabs">
                        <li className={`nav-item ${selectedStatus === "Pending Payment" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Pending Payment")}>
                            <span className="nav-link" href="#">Pending Payment</span>
                        </li>
                        <li className={`nav-item ${selectedStatus === "Pending Approve" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Pending Approve")}>
                            <span className="nav-link" href="#">Pending Approve</span>
                        </li>
                        <li className={`nav-item ${selectedStatus === "Approved" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Approved")}>
                            <span className="nav-link" href="#">Approved</span>
                        </li>
                        <li className={`nav-item ${selectedStatus === "Reject" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Reject")}>
                            <span className="nav-link" href="#">Reject</span>
                        </li>
                        <li className={`nav-item ${selectedStatus === "Failed" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Failed")}>
                            <span className="nav-link" href="#">Failed</span>
                        </li>
                        <div className="nav-tab-empty" />
                    </ul>
                </div>

                <div className="myorder-item-container">
                    <div className="myorder-item-heading">
                        <h2>TIV220608-0004</h2>
                        <button className="myorder-view-btn">
                            View Item
                        </button>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="myorder-table-data border-none">Payment Type: Cash</td>
                                    <td className="myorder-table-data border-none">Collect Type: taken</td>
                                    <td className="myorder-table-data border-none">Delivery Charge: RM 0.00</td>
                                    <td className="myorder-table-data border-none">Payment Amount: RM 645</td>
                                    <td className="myorder-table-data border-none vertical-align-middle" rowSpan="4">
                                        <button>Upload Bank Slip</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="myorder-table-data border-none">Order Date: 08/06/2022</td>
                                    <td className="border-none" colSpan="3" />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderPage;