import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/InstallmentDocumentPage.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";

const InstallmentDocumentPage = () => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [collapseInstallmentDocument, setCollapseInstallmentDocument] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("Success");
    const [sumPrice, setSumPrice] = useState(0);
    const [installmentReportDate, setInstallmentReportDate] = useState(null);
    const [installmentDocumentData, setInstallmentDocumentData] = useState([]);
    const dateInputRef = useRef(null);
    const installmentDocumentDataset = useRef([
        {
            installmentDocNo: "S1641121552-603",
            buyerName: "Lim",
            buyerIC: "920831105391",
            amount: 4034,
            deposit: 410,
            installmentDate: "11/12/2021",
            installmentPeriod: "6 Months",
            monthlyPayment: 676,
            lastMonthPayment: 678,
            installmentPrice: 4468,
            outstandingBalance: 4034,
            payWith: "ipay88",
            firstInstallmentDate: "10/12/2021",
            lastInstallmentDate: "10/05/2022",
            status: "Success",
            action: 603
        },
        {
            installmentDocNo: "S1641121552-603",
            buyerName: "Lim",
            buyerIC: "920831105391",
            amount: 4034,
            deposit: 22,
            installmentDate: "11/11/2021",
            installmentPeriod: "6 Months",
            monthlyPayment: 676,
            lastMonthPayment: 678,
            installmentPrice: 4468,
            outstandingBalance: 4034,
            payWith: "ipay88",
            firstInstallmentDate: "10/12/2021",
            lastInstallmentDate: "10/05/2022",
            status: "Success",
            action: 603
        },
        {
            installmentDocNo: "S1641121552-603",
            buyerName: "Lim",
            buyerIC: "920831105391",
            amount: 4034,
            deposit: 4102,
            installmentDate: "11/11/2021",
            installmentPeriod: "6 Months",
            monthlyPayment: 676,
            lastMonthPayment: 678,
            installmentPrice: 4468,
            outstandingBalance: 4034,
            payWith: "ipay88",
            firstInstallmentDate: "10/12/2021",
            lastInstallmentDate: "10/05/2022",
            status: "Failed",
            action: 603
        },
        {
            installmentDocNo: "S1641121552-603",
            buyerName: "Lim",
            buyerIC: "920831105391",
            amount: 4034,
            deposit: 490,
            installmentDate: "11/11/2021",
            installmentPeriod: "6 Months",
            monthlyPayment: 676,
            lastMonthPayment: 678,
            installmentPrice: 4468,
            outstandingBalance: 4034,
            payWith: "ipay88",
            firstInstallmentDate: "10/12/2021",
            lastInstallmentDate: "10/05/2022",
            status: "Success",
            action: 603
        },
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

    useEffect(() => {
        const totalDeposit = installmentDocumentData
            .filter(row => row.status === selectedStatus)
            .reduce((acc, row) => acc + row.deposit, 0);
        setSumPrice(totalDeposit);
    }, [installmentDocumentData, selectedStatus]);

    const handleDateChange = (newDate) => {
        setInstallmentReportDate(newDate);

        if (!newDate) {
            setInstallmentDocumentData(installmentDocumentDataset.current);
            return;
        }

        const formattedNewDate = formatDate(newDate);
        const formattedData = installmentDocumentDataset.current.filter(item => {
            const formattedInstallmentDate = formatDateFromDataset(item.installmentDate);
            return formattedNewDate === formattedInstallmentDate;
        });

        setInstallmentDocumentData(formattedData);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateFromDataset = (installmentDate) => {
        const [day, month, year] = installmentDate.split('/');
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (installmentDocumentDataset && installmentDocumentDataset.current) {
            setInstallmentDocumentData(installmentDocumentDataset.current);
        }
    }, [installmentDocumentDataset]);

    const handleResetDate = () => {
        setInstallmentReportDate(null);
        handleDateChange(null);
        const date_input = document.getElementsByClassName("react-datepicker-ignore-onclickoutside")[0]
        if (date_input) { date_input.blur(); }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const date_input = document.getElementsByClassName("react-datepicker-ignore-onclickoutside")[0];
            if (date_input) { date_input.blur(); }
        }
    };

    return (
        <div className="w-100 all-center justify-content-end">
            <div className={`w-100 all-center pt-4 ${!isMobile ? isNavBarOpen ? 'navigate-bar-desktop-open' : 'navigate-bar-desktop-close' : ''}`}>
                <NavigationBar setMobileState={setIsMobile} setOpenState={setIsNavBarOpen} />
                <div className="installment-document-form">
                    <h2 className="font-custom mb-3 fs-2">Installment Report</h2>
                    <div className="installment-document-container">
                        <h3 className="installment-document-content-header">Installment Report
                            {!collapseInstallmentDocument ? <ExpandLessIcon className="installment-document-content-header-icon" onClick={() => { setCollapseInstallmentDocument(!collapseInstallmentDocument) }} />
                                : <ExpandMoreIcon className="installment-document-content-header-icon" onClick={() => { setCollapseInstallmentDocument(!collapseInstallmentDocument) }} />} </h3>
                        <div className={collapseInstallmentDocument ? 'hide' : ''}>
                            <div className="mt-2 p-3">
                                <div className="justify-content-end d-flex align-items-center mb-4 font-custom-2">
                                    <span className="installment-document-green-square-label" />
                                    : Available
                                </div>
                                <div className="justify-content-end d-flex align-items-center mb-3 font-custom-2">
                                    <span className="installment-document-red-square-label" />
                                    : Failed
                                </div>
                                <label className="mb-2 font-custom-2 w-100">Date</label>
                                <div className="w-100 d-flex position-relative align-items-center mb-3">
                                    <FaCalendar className="installment-document-calender-icon" />
                                    <DatePicker
                                        selected={installmentReportDate}
                                        onChange={(e) => { handleDateChange(e); }}
                                        onKeyDown={handleKeyDown}
                                        className="form-control w-100 font-custom-2"
                                        dateFormat="dd/MM/yyyy"
                                        ref={dateInputRef}
                                    />
                                    <button className="installment-document-reset-date-btn" onClick={() => { handleResetDate(); }}>Reset</button>
                                </div>
                            </div>
                            <h4 className="fs-6 mt-3 font-custom ml-2 mb-4">Installment Report</h4>

                            <div className="nav-tabs-container">
                                <ul className="nav nav-tabs">
                                    <li className={`nav-item ${selectedStatus === "Success" ? 'active' : ''}`}
                                        onClick={() => handleTabClick("Success")}>
                                        <span className="nav-link" href="#">Available</span>
                                    </li>
                                    <li className={`nav-item ${selectedStatus === "Failed" ? 'active' : ''}`}
                                        onClick={() => handleTabClick("Failed")}>
                                        <span className="nav-link" href="#">Failed</span>
                                    </li>
                                    <div className="nav-tab-empty" />
                                </ul>
                            </div>

                            <h2 className="font-custom fs-2 mt-4">{selectedStatus !== "Success" ? selectedStatus : 'Available'}</h2>
                            <div className="installment-document-page-search-container pt-4">
                                <div className="d-flex justify-content-start align-items-center">
                                    Showing
                                    <select className="installment-document-page-option-select">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label className="mr-2">Search</label>
                                    <input className="installment-document-content-search d-flex" type="text" />
                                </div>
                            </div>

                            <div className="w-100 overflow-auto mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="installment-document-table-head-content text-nowrap">Installment Doc No.</th>
                                            <th className="installment-document-table-head-content text-nowrap">Buyer Name</th>
                                            <th className="installment-document-table-head-content text-nowrap">Buyer IC</th>
                                            <th className="installment-document-table-head-content text-nowrap">Amount</th>
                                            <th className="installment-document-table-head-content text-nowrap">Deposit</th>
                                            <th className="installment-document-table-head-content text-nowrap">Installment Date</th>
                                            <th className="installment-document-table-head-content text-nowrap">Installment Period</th>
                                            <th className="installment-document-table-head-content text-nowrap">Monthly Payment</th>
                                            <th className="installment-document-table-head-content text-nowrap">Last Month Payment</th>
                                            <th className="installment-document-table-head-content text-nowrap">Installment Price</th>
                                            <th className="installment-document-table-head-content text-nowrap">Outstanding Balance</th>
                                            <th className="installment-document-table-head-content text-nowrap">Pay With</th>
                                            <th className="installment-document-table-head-content text-nowrap">First Installment Date</th>
                                            <th className="installment-document-table-head-content text-nowrap">Last Installment Date</th>
                                            <th className="installment-document-table-head-content text-nowrap">Status</th>
                                            <th className="installment-document-table-head-content text-nowrap">Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {installmentDocumentData && installmentDocumentData.filter(row => row.status === selectedStatus).length > 0 ? (
                                            installmentDocumentData.filter(row => row.status === selectedStatus).map((row, index) => (
                                                <tr key={index}>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.installmentDocNo}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.buyerName}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.buyerIC}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.amount.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.deposit.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.installmentDate}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.installmentPeriod}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.monthlyPayment.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.lastMonthPayment.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.installmentPrice.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>RM {row.outstandingBalance.toFixed(2)}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.payWith}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.firstInstallmentDate}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap`}>{row.lastInstallmentDate}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content text-nowrap ${row.status === "Failed" ? 'text-danger' : "text-success"} fw-medium`}>{row.status === "Success" ? 'Available' : ''}</td>
                                                    <td className={`${row.status !== "Failed" ? 'success' : ''} installment-document-table-body-content d-flex`}>
                                                        <button className="installment-document-table-view-btn" onClick={() => { handleNavi(row.action) }}>
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="16" className="text-center">No Record Found, Sorry</td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" className="text-right installment-document-table-body-content origin">Grand Total</td>
                                            <td colSpan="1" className="text-left installment-document-table-body-content origin">RM {sumPrice.toFixed(2)}</td>
                                            <td colSpan="11" />
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="installment-document-page-manage-container d-flex align-items-center">
                                <div className="fs-7 d-flex justify-content-start align-items-center">
                                    {installmentDocumentData && installmentDocumentData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
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
                        <button className="installment-document-back-btn" onClick={() => { navigate(-1); }}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallmentDocumentPage;