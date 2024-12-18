import React, { useState, useRef } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/DashboardPage.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const DashboardPage = () => {
    const [collaseDashboard, setCollapseDashboard] = useState(false);
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dashboardData, setDashboardData] = useState([
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
            status: "Failed",
            action: 603
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
            status: "Failed",
            action: 604
        }
    ]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const scrollDistance = (x - startX);
        scrollContainerRef.current.scrollLeft = scrollLeft - scrollDistance;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        scrollContainerRef.current.style.cursor = 'grab';
    };

    const handleNavi = (target_data) => {
        //navi here
    }

    return (
        <div className="all-center pt-4">
            <NavigationBar />
            <div className="dashboard-form">
                <h2 className="font-custom mb-3 fs-2">Customer</h2>
                <div className="dashboard-container">
                    <h3 className="dashboard-content-header">Order Activities 
                     {!collaseDashboard ? <ExpandLessIcon className="dashboard-content-header-icon" onClick={() => {setCollapseDashboard(!collaseDashboard)}} />
                      : <ExpandMoreIcon className="dashboard-content-header-icon" onClick={() => {setCollapseDashboard(!collaseDashboard)}} />} </h3>
                    <div className={collaseDashboard ? 'hide' : ''}>
                        <h4 className="fs-5">Your Order</h4>
                        <div className="justify-content-end d-flex align-items-center">
                            <span className="dashboard-red-square-label" />
                            : Failed
                        </div>
                        <div className="dashboard-page-search-container pt-4">
                            <div className="d-flex justify-content-start align-items-center">
                                Showing
                                <select className="dashboard-page-option-select">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                entries
                            </div>
                            <div className="d-flex justify-content-end">
                                <label className="mr-2">Search</label>
                                <input className="dashboard-content-search d-flex" type="text" />
                            </div>
                        </div>

                        <div ref={scrollContainerRef} className="w-100 hide-scroll-container mb-3" onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="dashboard-table-head-content text-nowrap">#</th>
                                        <th className="dashboard-table-head-content text-nowrap">Doc No.</th>
                                        <th className="dashboard-table-head-content text-nowrap">Total</th>
                                        <th className="dashboard-table-head-content text-nowrap">Payment Amt</th>
                                        <th className="dashboard-table-head-content text-nowrap">Payment Method</th>
                                        <th className="dashboard-table-head-content text-nowrap">Pay With</th>
                                        <th className="dashboard-table-head-content text-nowrap">Collect Type</th>
                                        <th className="dashboard-table-head-content text-nowrap">Buyer Name</th>
                                        <th className="dashboard-table-head-content text-nowrap">Buyer IC</th>
                                        <th className="dashboard-table-head-content text-nowrap">Phone</th>
                                        <th className="dashboard-table-head-content text-nowrap">Email</th>
                                        <th className="dashboard-table-head-content text-nowrap">Temporary Invoice</th>
                                        <th className="dashboard-table-head-content text-nowrap">Transaction Date</th>
                                        <th className="dashboard-table-head-content text-nowrap">Remark</th>
                                        <th className="dashboard-table-head-content text-nowrap">Status</th>
                                        <th className="dashboard-table-head-content text-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.map((row, index) => (
                                        <tr key={index}>
                                            <td className="dashboard-table-body-content text-nowrap">{index + 1}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.docNo}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.total}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.paymentAmt}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.paymentMethod}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.payWith}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.collectType}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.buyerName}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.buyerIC}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.phone}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.email}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.temporaryInvoice}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.transactionDate}</td>
                                            <td className="dashboard-table-body-content text-nowrap">{row.remark}</td>
                                            <td className="dashboard-table-body-content text-nowrap text-danger fw-medium">{row.status}</td>
                                            <td className="dashboard-table-body-content">
                                                <button className="dashboard-table-view-btn" onClick={() => { handleNavi(row.action) }}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex align-items-center">
                            <span className="fs-8 mr-3">
                                {dashboardData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
                            </span>

                            <div className="d-flex">
                                <button className="">
                                    Previous
                                </button>
                                <button className="">
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                    <button>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;