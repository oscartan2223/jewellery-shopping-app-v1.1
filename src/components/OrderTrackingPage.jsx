import React, { useState, useEffect } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/OrderTrackingPage.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import TrackingOrder from "./trackingOrder/TrackingOrder";

const OrderTrackingPage = ({ showAlert }) => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("Processing");
    const [tracking, setTracking] = useState(false);
    const [orderTrackingData, setOrderTrackingData] = useState([
        {
            docNo: "S1641121552-603",
            status: "Processing",
            action: 603 //should be id or smt so call backend generate or backend return data
        },
        {
            docNo: "S1641121552-111",
            status: "Shipping",
            trackingNo: "1341",
            action: 422
        },
        {
            docNo: "S1641121552-604",
            status: "Delivered",
            trackingNo: "1342",
            action: 183
        },
        {
            docNo: "S1641121552-222",
            status: "Shipping",
            trackingNo: "1343",
            action: 609
        },
        {
            docNo: "S1641121552-634",
            status: "Delivered",
            trackingNo: "1344",
            action: 604
        }
    ]);

    useEffect(() => {
        if (isLoggedIn === false && loading === false) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 100);
            return () => clearTimeout(timer);
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

    const handleTrack = (data) => {
        setTracking(true);
    }

    const handleMark = (data) => {
        const updatedData = [...orderTrackingData];
        const index = updatedData.findIndex(order => order.docNo === data.docNo);
        if (index !== -1) {
            updatedData[index].status = "Delivered";
            showAlert("success", "Order had been successful mark as Delivered status");
        }
        setOrderTrackingData(updatedData);
    };


    return (
        <div className="w-100 all-center justify-content-end">
            <div className={`w-100 all-center pt-4 ${!isMobile ? isNavBarOpen ? 'navigate-bar-desktop-open' : 'navigate-bar-desktop-close' : ''}`}>
                <NavigationBar setMobileState={setIsMobile} setOpenState={setIsNavBarOpen} />
                {tracking &&
                    <TrackingOrder onClose={() => { setTracking(false) }} />
                }
                <div className="order-tracking-form">
                    <h2 className="font-custom mb-3 fs-2">Order Tracking</h2>
                    <div className="order-tracking-container">
                        <h3 className="order-tracking-content-header">Order Tracking</h3>
                        <div>
                            <div className="nav-tabs-container">
                                <ul className="nav nav-tabs">
                                    <li className={`nav-item ${selectedStatus === "Processing" ? 'active' : ''}`}
                                        onClick={() => handleTabClick("Processing")}>
                                        <span className="nav-link" href="#">Processing</span>
                                    </li>
                                    <li className={`nav-item ${selectedStatus === "Shipping" ? 'active' : ''}`}
                                        onClick={() => handleTabClick("Shipping")}>
                                        <span className="nav-link" href="#">Shipping</span>
                                    </li>
                                    <li className={`nav-item ${selectedStatus === "Delivered" ? 'active' : ''}`}
                                        onClick={() => handleTabClick("Delivered")}>
                                        <span className="nav-link" href="#">Delivered</span>
                                    </li>
                                    <div className="nav-tab-empty" />
                                </ul>
                            </div>

                            <h2 className="font-custom fs-2 mt-4">{selectedStatus}</h2>
                            <div className="order-tracking-page-search-container pt-4">
                                <div className="d-flex justify-content-start align-items-center">
                                    Showing
                                    <select className="order-tracking-page-option-select">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label className="mr-2">Search</label>
                                    <input className="order-tracking-content-search d-flex" type="text" />
                                </div>
                            </div>

                            <div className="w-100 overflow-auto mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="order-tracking-table-head-content text-nowrap">#</th>
                                            <th className="order-tracking-table-head-content text-nowrap">Doc No.</th>
                                            <th className="order-tracking-table-head-content text-nowrap">Status</th>
                                            {selectedStatus !== "Processing" &&
                                                <>
                                                    <th className="order-tracking-table-head-content text-nowrap">Tracking No.</th>
                                                    <th className="order-tracking-table-head-content text-nowrap">Action</th>
                                                </>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderTrackingData && orderTrackingData.filter(row => row.status === selectedStatus).length > 0 ? (
                                            orderTrackingData.filter(row => row.status === selectedStatus).map((row, index) => (
                                                <tr key={index}>
                                                    <td className={`order-tracking-table-body-content text-nowrap`}>{index + 1}</td>
                                                    <td className={`order-tracking-table-body-content text-nowrap`}>{row.docNo}</td>
                                                    <td className={`order-tracking-table-body-content text-nowrap ${row.status === "Processing" ? 'text-warning fw-medium' : ''}`}>{row.status}</td>
                                                    {selectedStatus !== "Processing" &&
                                                        <>
                                                            <td className={`order-tracking-table-body-content text-nowrap`}>{row.trackingNo}</td>
                                                            <td className={`order-tracking-table-body-content d-flex`}>
                                                                <button className="order-tracking-table-view-btn" onClick={() => { handleTrack(row); }}>
                                                                    Tracking
                                                                </button>

                                                                {(row.status === "Shipping") &&
                                                                    <button className="order-tracking-table-mark-btn" onClick={() => { handleMark(row); }}>
                                                                        Mark as Delivered
                                                                    </button>
                                                                }
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={selectedStatus !== "Processing" ? "5" : "3"} className="text-center">No Record Found, Sorry</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>

                            <div className="order-tracking-page-manage-container d-flex align-items-center">
                                <div className="fs-7 d-flex justify-content-start align-items-center">
                                    {orderTrackingData && orderTrackingData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
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
                        <button className="order-tracking-back-btn" onClick={() => { navigate(-1); }}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;