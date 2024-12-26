import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/OrderPage.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const OrderPage = () => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [collaseOrder, setCollapseOrder] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("Pending Payment");
    const [orderData, setOrderData] = useState([
        {
            docNo: "S1641121552-603",
            total: "448.00",
            paymentAmt: "50.00",
            paymentMethod: "Installment",
            payWith: "ipay88",
            collectType: "Self Collect",
            buyerName: "Lim",
            buyerIC: "920831105391",
            phone: "0169551982",
            email: "ginnz30@gmail.com",
            temporaryInvoice: "TIV220102-0003",
            transactionDate: "02/01/2022 19:05:52",
            remark: "testing",
            status: "Pending Payment",
            action: 603
        },
        {
            docNo: "S1641121552-111",
            total: "4249.00",
            paymentAmt: "21.00",
            paymentMethod: "Half Payment",
            payWith: "ipay88",
            collectType: "Delivery",
            buyerName: "Lim",
            buyerIC: "920831105391",
            phone: "0169551982",
            email: "ginnz30@gmail.com",
            temporaryInvoice: "TIV220102-0009",
            transactionDate: "02/01/2023 12:32:06",
            remark: "insufficient amount",
            status: "Success",
            action: 604
        },
        {
            docNo: "S1641121552-604",
            total: "449.00",
            paymentAmt: "51.00",
            paymentMethod: "Full Payment",
            payWith: "ipay88",
            collectType: "Delivery",
            buyerName: "Lim",
            buyerIC: "920831105391",
            phone: "0169551982",
            email: "ginnz30@gmail.com",
            temporaryInvoice: "TIV220102-0003",
            transactionDate: "02/01/2023 11:32:06",
            remark: "insufficient amount",
            status: "Pending Payment",
            action: 604
        },
        {
            docNo: "S1641121552-222",
            total: "414192.00",
            paymentAmt: "51.00",
            paymentMethod: "Installment",
            payWith: "ipay88",
            collectType: "Delivery",
            buyerName: "Lim",
            buyerIC: "920831105391",
            phone: "0169551982",
            email: "ginnz30@gmail.com",
            temporaryInvoice: "TIV220102-0003",
            transactionDate: "02/01/2023 11:32:06",
            remark: "insufficient amount",
            status: "Failed",
            action: 604
        },
        {
            docNo: "S1641121552-634",
            total: "0.00",
            paymentAmt: "51.00",
            paymentMethod: "Full Payment",
            payWith: "ipay88",
            collectType: "Delivery",
            buyerName: "Lim",
            buyerIC: "920831105391",
            phone: "0169551982",
            email: "ginnz30@gmail.com",
            temporaryInvoice: "TIV220102-0003",
            transactionDate: "02/01/2023 11:32:06",
            remark: "insufficient amount",
            status: "Failed",
            action: 604
        }
    ]);

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

    const handleNavi = (target_data) => {
        setTimeout(() => {
            navigate('/orderdetail', { state: target_data });
        }, 200);
        window.scrollTo(0, 0);
    };

    const handleTabClick = (tabIndex) => {
        setSelectedStatus(tabIndex);
    };

    return (
        <div className="w-100 all-center justify-content-end">
        <div className={`w-100 all-center pt-4 ${!isMobile ? isNavBarOpen ? 'navigate-bar-desktop-open' : 'navigate-bar-desktop-close' : ''}`}>
            <NavigationBar setMobileState={setIsMobile} setOpenState={setIsNavBarOpen} />
            <div className="order-form">
                <h2 className="font-custom mb-3 fs-2">Order History</h2>
                <div className="order-container">
                    <h3 className="order-content-header">Order History
                        {!collaseOrder ? <ExpandLessIcon className="order-content-header-icon" onClick={() => { setCollapseOrder(!collaseOrder) }} />
                            : <ExpandMoreIcon className="order-content-header-icon" onClick={() => { setCollapseOrder(!collaseOrder) }} />} </h3>
                    <div className={collaseOrder ? 'hide' : ''}>
                        <div className="nav-tabs-container">
                            <ul className="nav nav-tabs">
                                <li className={`nav-item ${selectedStatus === "Pending Payment" ? 'active' : ''}`}
                                    onClick={() => handleTabClick("Pending Payment")}>
                                    <span className="nav-link" href="#">Pending Payment</span>
                                </li>
                                <li className={`nav-item ${selectedStatus === "Pending Approve" ? 'active' : ''}`}
                                    onClick={() => handleTabClick("Pending Approve")}>
                                    <span className="nav-link" href="#">Pending Approve</span>
                                </li>
                                <li className={`nav-item ${selectedStatus === "Success" ? 'active' : ''}`}
                                    onClick={() => handleTabClick("Success")}>
                                    <span className="nav-link" href="#">Approved</span>
                                </li>
                                <li className={`nav-item ${selectedStatus === "Failed" ? 'active' : ''}`}
                                    onClick={() => handleTabClick("Failed")}>
                                    <span className="nav-link" href="#">Failed</span>
                                </li>
                                <div className="nav-tab-empty" />
                            </ul>
                        </div>

                        <h2 className="font-custom fs-2 mt-4">{selectedStatus !== "Success" ? selectedStatus : 'Approved'}</h2>
                        <div className="order-page-search-container pt-4">
                            <div className="d-flex justify-content-start align-items-center">
                                Showing
                                <select className="order-page-option-select">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                entries
                            </div>
                            <div className="d-flex justify-content-end">
                                <label className="mr-2">Search</label>
                                <input className="order-content-search d-flex" type="text" />
                            </div>
                        </div>

                        <div className="w-100 overflow-auto mb-3">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="order-table-head-content text-nowrap">#</th>
                                        <th className="order-table-head-content text-nowrap">Doc No.</th>
                                        <th className="order-table-head-content text-nowrap">Total</th>
                                        <th className="order-table-head-content text-nowrap">Payment Amt</th>
                                        <th className="order-table-head-content text-nowrap">Payment Method</th>
                                        <th className="order-table-head-content text-nowrap">Temporary Invoice</th>
                                        <th className="order-table-head-content text-nowrap">Transaction Date</th>
                                        <th className="order-table-head-content text-nowrap">Remark</th>
                                        <th className="order-table-head-content text-nowrap">Status</th>
                                        <th className="order-table-head-content text-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData && orderData.filter(row => row.status === selectedStatus).length > 0 ? (
                                        orderData.filter(row => row.status === selectedStatus).map((row, index) => (
                                            <tr key={index}>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{index + 1}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.docNo}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.total}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.paymentAmt}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.paymentMethod}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.temporaryInvoice}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.transactionDate}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap`}>{row.remark}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content text-nowrap ${row.status === "Failed" ? 'text-danger' : row.status === "Success" ? 'text-success' : 'text-warning'} fw-medium`}>{row.status}</td>
                                                <td className={`${row.status !== "Failed" ? (row.status !== "Success" ? 'origin' : 'success') : ''} order-table-body-content d-flex`}>
                                                    <button className="order-table-view-btn" onClick={() => { handleNavi(row.action) }}>
                                                        View
                                                    </button>

                                                    {(row.status === "Failed" || row.status === "Success")  &&
                                                        <button className="order-table-download-btn" onClick={() => { console.log("generate download pdf here") }}>
                                                            Download
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">No data available in table</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>

                        <div className="order-page-manage-container d-flex align-items-center">
                            <div className="fs-7 d-flex justify-content-start align-items-center">
                                {orderData && orderData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
                            </div>

                            <div className="d-flex justify-content-end">
                                <button className="">
                                    Previous
                                </button>
                                <button className="current">
                                    {currentPage}
                                </button>
                                <button className="">
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                    <button className="order-back-btn" onClick={() => { navigate(-1); }}>
                        Back
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrderPage;