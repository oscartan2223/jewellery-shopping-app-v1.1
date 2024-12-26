import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/InstallmentListPage.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { FaDownload } from "react-icons/fa";

const InstallmentListPage = () => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [collapseInstallmentList, setCollapseInstallmentList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("Pending Payment");
    const [installmentListData, setInstallmentListData] = useState([
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
            transactionDate: "02/01/2022",
            remark: "testing",
            status: "Pending Payment",
            action: 603
        },
        {
            paymentNumber: "INST-0000024-01",
            installmentDocNo: "INST-0000024",
            buyerName: "lim",
            buyerIC: "920831105391",
            amount: "336.00",
            deposit: "50.00",
            installmentDate: "20/07/2021",
            installmentPeriod: "6 Months",
            monthlyPayment: "53.00",
            lastMonthPayment: "55.00",
            installmentPrice: "370",
            paymentDate: "20/07/2021",
            paymentAmt: "50.00",
            outstandingBalance: "286.00",
            payWith: "ipay88",
            firstInstallmentDate: "20/07/2021",
            lastInstallmentDate: "20/02/2022",
            status: "Success",
            report: 930
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
            temporaryInvoice: "TIV220102-0006",
            transactionDate: "02/01/2023",
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
            transactionDate: "02/01/2023",
            remark: "insufficient amount",
            status: "Pending Payment",
            action: 604
        },
        {
            paymentNumber: "INST-0000024-03",
            installmentDocNo: "INST-0000026",
            buyerName: "Lim",
            buyerIC: "920831105391",
            amount: "564.00",
            deposit: "324.00",
            installmentDate: "28/04/2014",
            installmentPeriod: "12 Months",
            monthlyPayment: "57.00",
            lastMonthPayment: "59.00",
            installmentPrice: "425",
            paymentDate: "20/07/2021",
            paymentAmt: "50.00",
            outstandingBalance: "999.00",
            payWith: "ipay88",
            firstInstallmentDate: "20/07/2021",
            lastInstallmentDate: "20/02/2022",
            status: "Success",
            report: 849
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
                <div className="installment-list-form">
                    <h2 className="font-custom mb-3 fs-2">Installment</h2>
                    <div className="installment-list-container">
                        <h3 className="installment-list-content-header">Installment
                            {!collapseInstallmentList ? <ExpandLessIcon className="installment-list-content-header-icon" onClick={() => { setCollapseInstallmentList(!collapseInstallmentList) }} />
                                : <ExpandMoreIcon className="installment-list-content-header-icon" onClick={() => { setCollapseInstallmentList(!collapseInstallmentList) }} />} </h3>
                        <div className={collapseInstallmentList ? 'hide' : ''}>
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
                                    <div className="nav-tab-empty" />
                                </ul>
                            </div>

                            <h2 className="font-custom fs-2 mt-4">{selectedStatus !== "Success" ? selectedStatus : 'Approved'}</h2>
                            <div className="installment-list-page-search-container pt-4">
                                <div className="d-flex justify-content-start align-items-center">
                                    Showing
                                    <select className="installment-list-page-option-select">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label className="mr-2">Search</label>
                                    <input className="installment-list-content-search d-flex" type="text" />
                                </div>
                            </div>

                            <div className="w-100 overflow-auto mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            {selectedStatus === "Success" ? (
                                                <>
                                                    <th className="installment-list-table-head-content text-nowrap">Payment Number</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Installment Doc No.</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Buyer Name</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Buyer IC</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Amount</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Deposit</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Installment Date</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Installment Period</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Monthly Payment</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Last Month Payment</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Installment Price</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Payment Date</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Payment Amt</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Outstanding Balance</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Pay With</th>
                                                    <th className="installment-list-table-head-content text-nowrap">First Installment Date</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Last Installment Date</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Status</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Report</th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="installment-list-table-head-content text-nowrap">#</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Doc No.</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Total</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Payment Amt</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Payment Method</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Temporary Invoice</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Transaction Date</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Remark</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Status</th>
                                                    <th className="installment-list-table-head-content text-nowrap">Action</th>
                                                </>
                                            )}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {installmentListData && installmentListData.filter(row => row.status === selectedStatus).length > 0 ? (
                                            installmentListData.filter(row => row.status === selectedStatus).map((row, index) => (
                                                <tr key={index}>
                                                    {selectedStatus === "Success" ? (
                                                        <>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.paymentNumber}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.installmentDocNo}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.buyerName}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.buyerIC}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.amount}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.deposit}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.installmentDate}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.installmentPeriod}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.monthlyPayment}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.lastMonthPayment}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.installmentPrice}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.paymentDate}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.paymentAmt}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.outstandingBalance}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.payWith}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.firstInstallmentDate}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.lastInstallmentDate}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap text-success fw-medium">{row.status}</td>
                                                            <td className="origin installment-list-table-body-content d-flex">
                                                                <button className="installment-list-table-view-btn" onClick={() => { }}>
                                                                    <FaDownload className="installment-list-table-download-icon" />
                                                                    Download
                                                                </button>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{index + 1}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.docNo}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.total}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.paymentAmt}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.paymentMethod}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.temporaryInvoice}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.transactionDate}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap">{row.remark}</td>
                                                            <td className="origin installment-list-table-body-content text-nowrap text-warning fw-medium">{row.status}</td>
                                                            <td className="origin installment-list-table-body-content d-flex">
                                                                <button className="installment-list-table-view-btn" onClick={() => { handleNavi(row.action) }}>
                                                                    View
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={selectedStatus === "Success" ? "19" : "10"} className="text-center">No data available in table</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>

                            <div className="installment-list-page-manage-container d-flex align-items-center">
                                <div className="fs-7 d-flex justify-content-start align-items-center">
                                    {installmentListData && installmentListData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
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
                        <button className="installment-list-back-btn" onClick={() => { navigate(-1); }}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallmentListPage;