import React, { useState, useEffect } from "react";
import '../assets/css/MyOrderPage.css';
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const MyOrderPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, loading } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState('Pending Payment');
    const [selectedApprovedStatus, setSelectedApprovedStatus] = useState('Self Collect')
    const [orders, setOrders] = useState([
        {
            invoice: "TIV220608-00789",
            paymentType: "Installment",
            collectType: "taken",
            deliveryCharge: "RM 1.00",
            paymentAmount: "RM 1912",
            orderDate: "21/09/2021",
            remark: "test",
            itemDetails: {
                name: "PS CLIP",
                code: "[S1BPSXXBD00119]",
                price: "RM 645",
                temporaryInvoice: "TIV220608-0004",
                transactionDate: "08/06/2022 11:06:28",
                collectType: "Self-Collect",
                status: "Pending Payment",
                imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
            }
        },
        {
            invoice: "TIV220608-00829",
            paymentType: "Cash",
            collectType: "taken",
            deliveryCharge: "RM 0.00",
            paymentAmount: "RM 583",
            orderDate: "16/04/2022",
            remark: "TEST",
            itemDetails: {
                name: "PS CLIP",
                code: "[S1BPSXXBD00120]",
                price: "RM 111",
                temporaryInvoice: "TIV220608-0002",
                transactionDate: "08/06/2022 11:06:28",
                collectType: "Self-Collect",
                status: "Pending Payment",
                imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
            }
        }
    ]);
    const [openView, setOpenView] = useState('');

    const handleApprovedTabClick = (selectedTab) => {
        setSelectedApprovedStatus(selectedTab);
    }

    const handleTabClick = (selectedTab) => {
        setSelectedStatus(selectedTab);
        setOpenView('');
        if (selectedTab === 'Pending Payment' || selectedTab === 'Pending Approve') {
            setOrders([
                {
                    invoice: "TIV220608-00789",
                    paymentType: "Installment",
                    collectType: "taken",
                    deliveryCharge: "RM 1.00",
                    paymentAmount: "RM 1912",
                    orderDate: "21/09/2021",
                    remark: "test",
                    itemDetails: {
                        name: "PS CLIP",
                        code: "[S1BPSXXBD00119]",
                        price: "RM 645",
                        temporaryInvoice: "TIV220608-0004",
                        transactionDate: "08/06/2022 11:06:28",
                        collectType: "Self-Collect",
                        status: "Pending Payment",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
                    }
                },
                {
                    invoice: "TIV220608-00829",
                    paymentType: "Cash",
                    collectType: "taken",
                    deliveryCharge: "RM 0.00",
                    paymentAmount: "RM 583",
                    orderDate: "16/04/2022",
                    remark: "TEST",
                    itemDetails: {
                        name: "PS CLIP",
                        code: "[S1BPSXXBD00120]",
                        price: "RM 111",
                        temporaryInvoice: "TIV220608-0002",
                        transactionDate: "08/06/2022 11:06:28",
                        collectType: "Self-Collect",
                        status: "Pending Payment",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
                    }
                }
            ]);
        } else if (selectedTab === 'Approved') {

        } else if (selectedTab === 'Reject') {
            setOrders([
                {
                    invoice: "TIV220608-00789",
                    paymentType: "Installment",
                    collectType: "taken",
                    deliveryCharge: "RM 1.00",
                    paymentAmount: "RM 1912",
                    orderDate: "21/09/2021",
                    reason: "none",
                    name: "lim",
                    phone: "0169551982",
                    email: "ginnz30@gmail.com",
                    collectDetails: "30/03/2021 4:02pm ~ 30/03/2021 4:02pm",
                    remark: "test",
                    itemDetails: {
                        name: "PS CLIP",
                        code: "[S1BPSXXBD00119]",
                        price: "RM 645",
                        temporaryInvoice: "TIV220608-0004",
                        transactionDate: "08/06/2022 11:06:28",
                        collectType: "Self-Collect",
                        status: "Pending Payment",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
                    }
                }
            ]);
        } else {
            setOrders([
                {
                    invoice: "TIV220608-00342",
                    paymentType: "Installment",
                    collectType: "taken",
                    deliveryCharge: "RM 10.00",
                    paymentAmount: "RM 1912",
                    orderDate: "21/09/2021",
                    name: "lim",
                    phone: "0169551982",
                    email: "ginnz30@gmail.com",
                    collectDetails: "30/03/2021 4:02pm ~ 30/03/2021 4:02pm",
                    remark: "test",
                    itemDetails: {
                        name: "PS CLIP",
                        code: "[S1BPSXXBD00119]",
                        price: "RM 645",
                        temporaryInvoice: "TIV220608-0004",
                        transactionDate: "08/06/2022 11:06:28",
                        collectType: "Self-Collect",
                        status: "Pending Payment",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
                    }
                }
            ]);
        }
    };

    useEffect(() => {
        if (isLoggedIn === false && loading === false) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 100);
            return () => clearTimeout(timer);
        } else {
            //setProfileData();
        }
    }, [isLoggedIn, navigate]);

    const handleViewClick = (invoice) => {
        setOpenView((prevState) => (prevState === invoice ? '' : invoice));
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

                {selectedStatus && (selectedStatus === "Pending Payment" || selectedStatus === "Pending Approve") &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div className="myorder-item-container" key={index}>
                                <div className="myorder-item-heading">
                                    <h2>{order.invoice}</h2>
                                    <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                </div>
                                <div className="w-100 hide-scroll-container">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                                <td className="myorder-table-data border-none vertical-align-middle" rowSpan="2">
                                                    <button className="myorder-table-btn">Upload Bank Slip</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                <td className="border-none" colSpan="3" />
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={`myorder-item-bottom ${openView === order.invoice ? 'view' : ''}`}>
                                    <label><strong>Remark: </strong>{order.remark}</label>
                                </div>

                                <div className={`${openView !== order.invoice ? 'hide' : 'myorder-item-details'}`}>
                                    <div className="myorder-item-details-container">
                                        <img className="myorder-item-details-image" src={order.itemDetails.imageUrl} alt="item" />
                                        <div className="myorder-item-details-description">
                                            <label className="fs-6 font-custom">{order.itemDetails.name}</label>
                                            <label className="fs-5 font-custom">{order.itemDetails.code}</label>
                                            <label className="fs-5 font-custom text-danger fw-bold">{order.itemDetails.price}</label>
                                            <em className="fs-7 font-custom fw-bold">Temporary Invoice: {order.itemDetails.temporaryInvoice}</em>
                                            <em className="fs-7 font-custom">Transaction Date: {order.itemDetails.transactionDate}</em>
                                            <em className="fs-7 font-custom">Collect Type: {order.itemDetails.collectType}</em>
                                            <em className="fs-7 font-custom">Status: {order.itemDetails.status}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {selectedStatus && selectedStatus === "Approved" &&
                    <div>
                        <div className="nav-tabs-container myorder-approved mb-3">
                            <ul className="nav nav-tabs">
                                <li className={`nav-item ${selectedApprovedStatus === "Self Collect" ? 'active' : ''}`}
                                    onClick={() => handleApprovedTabClick("Self Collect")}>
                                    <span className="nav-link" href="#">Self Collect</span>
                                </li>
                                <li className={`nav-item ${selectedApprovedStatus === "Delivery" ? 'active' : ''}`}
                                    onClick={() => handleApprovedTabClick("Delivery")}>
                                    <span className="nav-link" href="#">Delivery</span>
                                </li>
                                <div className="nav-tab-empty" />
                            </ul>
                        </div>
                        {selectedApprovedStatus === "Self Collect" &&
                            <div className="myorder-item-content-container hide-scroll-container">
                                {orders.map((order, index) => (
                                    <div className="myorder-item-container" key={index}>
                                        <div className="myorder-item-heading">
                                            <h2>{order.invoice}</h2>
                                            <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                        </div>
                                        <div className="w-100 hide-scroll-container">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                        <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                        <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                        <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                                        <td className="myorder-table-data border-none vertical-align-middle" rowSpan="2">
                                                            <button className="myorder-table-btn">Upload Bank Slip</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                        <td className="border-none" colSpan="3" />
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={`myorder-item-bottom ${openView === order.invoice ? 'view' : ''}`}>
                                            <label><strong>Remark: </strong>{order.remark}</label>
                                        </div>

                                        <div className={`${openView !== order.invoice ? 'hide' : 'myorder-item-details'}`}>
                                            <div className="myorder-item-details-container">
                                                <img className="myorder-item-details-image" src={order.itemDetails.imageUrl} alt="item" />
                                                <div className="myorder-item-details-description">
                                                    <label className="fs-6 font-custom">{order.itemDetails.name}</label>
                                                    <label className="fs-5 font-custom">{order.itemDetails.code}</label>
                                                    <label className="fs-5 font-custom text-danger fw-bold">{order.itemDetails.price}</label>
                                                    <em className="fs-7 font-custom fw-bold">Temporary Invoice: {order.itemDetails.temporaryInvoice}</em>
                                                    <em className="fs-7 font-custom">Transaction Date: {order.itemDetails.transactionDate}</em>
                                                    <em className="fs-7 font-custom">Collect Type: {order.itemDetails.collectType}</em>
                                                    <em className="fs-7 font-custom">Status: {order.itemDetails.status}</em>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }

                {selectedStatus && selectedStatus === "Reject" &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div className="myorder-item-container" key={index}>
                                <div className="myorder-item-heading">
                                    <h2>{order.invoice}</h2>
                                    <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                </div>
                                <div className="w-100 hide-scroll-container">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                <td className="myorder-table-data border-none">Reason: {order.reason}</td>
                                                <td className="myorder-table-data border-none">
                                                    <button className="myorder-table-btn">Document</button>
                                                </td>
                                                <td className="myorder-table-data border-none" />
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none">Name: {order.name}</td>
                                                <td className="myorder-table-data border-none">Phone: {order.phone}</td>
                                                <td className="myorder-table-data border-none">Email: {order.email}</td>
                                                <td className="myorder-table-data border-none" />
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none" colSpan="4">Collect Details: {order.collectDetails}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={`myorder-item-bottom ${openView === order.invoice ? 'view' : ''}`}>
                                    <label><strong>Remark: </strong>{order.remark}</label>
                                </div>

                                <div className={`${openView !== order.invoice ? 'hide' : 'myorder-item-details'}`}>
                                    <div className="myorder-item-details-container">
                                        <img className="myorder-item-details-image" src={order.itemDetails.imageUrl} alt="item" />
                                        <div className="myorder-item-details-description">
                                            <label className="fs-6 font-custom">{order.itemDetails.name}</label>
                                            <label className="fs-5 font-custom">{order.itemDetails.code}</label>
                                            <label className="fs-5 font-custom text-danger fw-bold">{order.itemDetails.price}</label>
                                            <em className="fs-7 font-custom fw-bold">Temporary Invoice: {order.itemDetails.temporaryInvoice}</em>
                                            <em className="fs-7 font-custom">Transaction Date: {order.itemDetails.transactionDate}</em>
                                            <em className="fs-7 font-custom">Collect Type: {order.itemDetails.collectType}</em>
                                            <em className="fs-7 font-custom">Status: {order.itemDetails.status}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {selectedStatus && selectedStatus === "Failed" &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div className="myorder-item-container" key={index}>
                                <div className="myorder-item-heading">
                                    <h2>{order.invoice}</h2>
                                    <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                </div>
                                <div className="w-100 hide-scroll-container">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                <td className="myorder-table-data border-none">
                                                    <button className="myorder-table-btn">Document</button>
                                                </td>
                                                <td className="myorder-table-data border-none" colSpan="2" />
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none">Name: {order.name}</td>
                                                <td className="myorder-table-data border-none">Phone: {order.phone}</td>
                                                <td className="myorder-table-data border-none">Email: {order.email}</td>
                                                <td className="myorder-table-data border-none" />
                                            </tr>
                                            <tr>
                                                <td className="myorder-table-data border-none" colSpan="4">Collect Details: {order.collectDetails}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={`myorder-item-bottom ${openView === order.invoice ? 'view' : ''}`}>
                                    <label><strong>Remark: </strong>{order.remark}</label>
                                </div>

                                <div className={`${openView !== order.invoice ? 'hide' : 'myorder-item-details'}`}>
                                    <div className="myorder-item-details-container">
                                        <img className="myorder-item-details-image" src={order.itemDetails.imageUrl} alt="item" />
                                        <div className="myorder-item-details-description">
                                            <label className="fs-6 font-custom">{order.itemDetails.name}</label>
                                            <label className="fs-5 font-custom">{order.itemDetails.code}</label>
                                            <label className="fs-5 font-custom text-danger fw-bold">{order.itemDetails.price}</label>
                                            <em className="fs-7 font-custom fw-bold">Temporary Invoice: {order.itemDetails.temporaryInvoice}</em>
                                            <em className="fs-7 font-custom">Transaction Date: {order.itemDetails.transactionDate}</em>
                                            <em className="fs-7 font-custom">Collect Type: {order.itemDetails.collectType}</em>
                                            <em className="fs-7 font-custom">Status: {order.itemDetails.status}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    );
};

export default MyOrderPage;