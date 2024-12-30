import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./navigationBar/NavigationBar";
import '../assets/css/OrderDetailPage.css';
import { useAuth } from "../authContext";

const OrderDetailPage = () => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const viewOrder = useLocation().state;
    const [showBankSlip, setShowBankSlip] = useState(false);
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [orderDetailData, setOrderDetailData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (viewOrder) {
            //replace this to using viewOrder to the api Get request with a response data
            setOrderDetailData([{
                to: "Lim",
                ic: "920831105391",
                phone: "0169551982",
                email: "ginnz30@gmail.com",
                docNo: "S1641121552-603",
                documentDate: "02/01/2022",
                payWith: "ipay88",
                status: "Failed",
                collectType: "Self Collect",
                productName: "BEAD FESYEN",
                productCode: "AGBLB00BDF01 00315",
                weight: "1.57",
                productPrice: 448.00,
                paymentType: "Installment",
                paymentAmt: "50.00",
            }])

            if (viewOrder.path) {
                setShowBankSlip(true);
            }
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn === false && loading === false) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    const totalPrice = orderDetailData.reduce((total, item) => total + item.productPrice, 0);

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

    return (
        <div className="w-100 all-center justify-content-end">
            <div className={`w-100 all-center pt-4 ${!isMobile ? isNavBarOpen ? 'navigate-bar-desktop-open' : 'navigate-bar-desktop-close' : ''}`}>
                <NavigationBar setMobileState={setIsMobile} setOpenState={setIsNavBarOpen} />
                <div className="orderdetail-form">
                    <h2 className="font-custom mb-3 fs-2">Order Detail</h2>
                    <div className="orderdetail-container">
                        <h3 className="orderdetail-content-header mb-4">Order Detail</h3>
                        <div>
                            <h4 className="fs-4">To: {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].to : ''}</h4>
                            <h4 className="fs-4">{orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].ic : ''}</h4>
                            <h4 className="fs-4">{orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].phone : ''}</h4>
                            <a className="text-black fs-7 text-decoration-none" href={`mailto:${orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].email : ''}`}>
                                {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].email : ''}
                            </a>
                            <h1 className="fs-1 mt-3 mb-3">{orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].docNo : ''}</h1>
                            <h4 className="fs-6">Document Date: {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].documentDate : ''}</h4>
                            <h4 className="fs-6">Pay With: {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].payWith : ''}</h4>
                            <h4 className="fs-6">Status: <span className="text-danger fw-mediums">{orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].status : ''}</span></h4>
                            <h4 className="fs-6 mb-2">Collect Type: {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].collectType : ''}</h4>
                            <div className="orderdetail-page-search-container pt-4">
                                <div className="d-flex justify-content-start align-items-center">
                                    Showing
                                    <select className="orderdetail-page-option-select">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    entries
                                </div>
                                <div className="d-flex justify-content-end">
                                    <label className="mr-2">Search</label>
                                    <input className="orderdetail-content-search d-flex" type="text" />
                                </div>
                            </div>

                            <div ref={scrollContainerRef} className="w-100 hide-scroll-container mb-3" onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}>
                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th className="orderdetail-table-head-content text-nowrap">#</th>
                                            <th className="orderdetail-table-head-content text-nowrap">Product Name</th>
                                            <th className="orderdetail-table-head-content text-nowrap">Product Code</th>
                                            <th className="orderdetail-table-head-content text-nowrap">Weight</th>
                                            <th className="orderdetail-table-head-content text-nowrap">Product Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetailData && orderDetailData.map((row, index) => (
                                            <tr key={index}>
                                                <td className="orderdetail-table-body-content text-nowrap">{index + 1}</td>
                                                <td className="orderdetail-table-body-content text-nowrap">{row.productName}</td>
                                                <td className="orderdetail-table-body-content text-nowrap">{row.productCode}</td>
                                                <td className="orderdetail-table-body-content text-nowrap">{row.weight}</td>
                                                <td className="orderdetail-table-body-content text-nowrap">RM {row.productPrice.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="orderdetail-table-body-content text-nowrap text-right" colspan="4" rowspan="1">Grand Total</td>
                                            <td className="orderdetail-table-body-content text-nowrap" colspan="1" rowspan="1">RM {totalPrice.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="orderdetail-page-manage-container d-flex align-items-center">
                                <div className="fs-7 d-flex justify-content-start align-items-center">
                                    {orderDetailData && orderDetailData.length > 0 ? `Showing 1 Page 1 of 1` : `No Record Found, Sorry (Filtered from 1 Total Record)`}
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

                        <table className="mb-3">
                            <tbody>
                                <tr>
                                    <td className="orderdetail-bottom-table-body">Payment Type:</td>
                                    <td className="orderdetail-bottom-table-body">{orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].paymentType : ''}</td>
                                </tr>
                                <tr>
                                    <td className="orderdetail-bottom-table-body">Payment Amt:</td>
                                    <td className="orderdetail-bottom-table-body">RM {orderDetailData && orderDetailData.length > 0 ? orderDetailData[0].paymentAmt : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="orderdetail-back-btn mr-3" onClick={() => { navigate(-1); }}>
                            Back
                        </button>
                        {showBankSlip &&
                            <button className="orderdetail-back-btn" onClick={() => { console.log("handle further") }}>
                                Proceed with upload Bank Slip
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderDetailPage;