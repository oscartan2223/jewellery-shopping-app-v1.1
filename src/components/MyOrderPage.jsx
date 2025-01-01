import React, { useState, useEffect, useRef } from "react";
import '../assets/css/MyOrderPage.css';
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import TrackingOrder from "./trackingOrder/TrackingOrder";
import DownloadReceipt from "./downloadReceipt/downloadReceipt";
import TacDialog from "./tacDialog/tacDialog";
import { FaTimes } from "react-icons/fa";
import OwlCarouselComponent from "./owlCarousel/owlCarousel";

const MyOrderPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, loading } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState('Pending Payment');
    const [selectedApprovedStatus, setSelectedApprovedStatus] = useState('Self Collect');
    const [firstPromptTAC, setFirstPromptTAC] = useState(true);
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
    const [tracking, setTracking] = useState(false);
    const [openCollectReceipt, setOpenCollectReceipt] = useState(false);
    const downloadLink = useRef('');

    const [openPictures, setOpenPictures] = useState(false);
    const [openVideos, setOpenVideos] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedPictures, setSelectedPictures] = useState([]);

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
            setOrders([
                {
                    invoice: "TIV220608-00789",
                    paymentType: "Installment",
                    collectType: "taken",
                    deliveryCharge: "RM 1.00",
                    paymentAmount: "RM 1912",
                    orderDate: "21/09/2021",
                    collectStatus: "Collected",
                    name: "Tan Lun",
                    phone: "0193035699",
                    email: "yourstyle1100@yahoo.com.my",
                    collectDetails: "11/11/2020 1:22pm ~ 11/11/2020 1:22pm",
                    remark: "test only",
                    collectReceipt: "https://upload.kianleepd.com/assets/public/img/collect/AE9043/approve_img.jpg",
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
                    invoice: "TIV220608-00789",
                    paymentType: "Installment",
                    collectType: "delivery",
                    deliveryCharge: "RM 0.00",
                    paymentAmount: "RM 1912",
                    orderDate: "21/09/2021",
                    trackingNumber: "testing",
                    posCourier: "pos laju",
                    name: "Tan Lun",
                    phone: "0193035699",
                    email: "yourstyle1100@yahoo.com.my",
                    deliveryDetails: "2124, Cities, 443244, STATES, Malaysia",
                    remark: "test only",
                    video: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
                    pictures: [
                        "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/IMG-20220311-WA0003.jpg",
                        "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/IMG_20220615_170130_mh1655300995072.jpg",
                        "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/IMG-20220310-WA0249.jpg",
                        "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/IMG-20220320-WA0008.jpg",
                        "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/FB_IMG_1652964891532.jpg"
                    ],
                    itemDetails: {
                        name: "PS CLIP",
                        code: "[S1BPSXXBD00119]",
                        price: "RM 645",
                        temporaryInvoice: "TIV220608-0004",
                        transactionDate: "08/06/2022 11:06:28",
                        collectType: "Delivery",
                        status: "Pending Payment",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180"
                    }
                }
            ]);
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
                    document: "http://localhost:3000/image.png",
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
                    document: "http://192.168.42.109:3000/image.png",
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
        }
    }, [isLoggedIn, navigate]);

    const handleViewClick = (invoice) => {
        setOpenView((prevState) => (prevState === invoice ? '' : invoice));
    };

    const handleNavi = (invoice) => {

        //use get api with "invoice" to get the data
        const target_data = {
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
        }
        setTimeout(() => {
            navigate('/orderdetail', { state: { ...target_data, path: true } });
        }, 200);
        window.scrollTo(0, 0);
    }

    const handleDocumentClick = (documentLink = '') => {
        downloadLink.current = documentLink;
        setOpenCollectReceipt(!openCollectReceipt);
    }

    return (
        <div className="myorder-container">
            {tracking &&
                <TrackingOrder onClose={() => { setTracking(false) }} />
            }

            {openCollectReceipt &&
                <DownloadReceipt onClose={handleDocumentClick} downloadUrl={downloadLink.current} />
            }

            {firstPromptTAC && selectedStatus === "Approved" && selectedApprovedStatus === "Delivery" &&
                <TacDialog onClose={() => { setFirstPromptTAC(false); }} />
            }

            {openPictures && selectedStatus === "Approved" && selectedApprovedStatus === "Delivery" &&
                <div className="myorder-picturevideo-container-overlay">
                    <div className="myorder-picturevideo-container pic">
                        <div className="myorder-picturevideo-header">
                            Pictures
                            <FaTimes className="myorder-picturevideo-close-btn" onClick={() => { setOpenPictures(false); }} />
                        </div>
                        <div className="myorder-picturevideo-content">
                            <OwlCarouselComponent imageList={selectedPictures} />
                        </div>
                    </div>
                </div>
            }

            {openVideos && selectedStatus === "Approved" && selectedApprovedStatus === "Delivery" &&
                <div className="myorder-picturevideo-container-overlay">
                    <div className="myorder-picturevideo-container">
                        <div className="myorder-picturevideo-header">
                            Videos
                            <FaTimes className="myorder-picturevideo-close-btn" onClick={() => { setOpenVideos(false); }} />
                        </div>
                        <div className="myorder-picturevideo-content hide-scroll-container">
                            <video controls className="myorder-video-player">
                                <source src={selectedVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            }

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
                        {/* <li className={`nav-item ${selectedStatus === "Reject" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Rejects")}>
                            <span className="nav-link" href="#">Reject</span>
                        </li>
                        <li className={`nav-item ${selectedStatus === "Failed" ? 'active' : ''}`}
                            onClick={() => handleTabClick("Faileds")}>
                            <span className="nav-link" href="#">Failed</span>
                        </li> */}
                        <div className="nav-tab-empty" />
                    </ul>
                </div>

                {selectedStatus && (selectedStatus === "Pending Payment" || selectedStatus === "Pending Approve") &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div key={index}>
                                <div className="w-100 overflow-x-auto">
                                    <div className="myorder-item-container">
                                        <div className="myorder-item-heading">
                                            <h2>{order.invoice}</h2>
                                            <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                        </div>
                                        <div className="w-100 hide-scroll-container">
                                            <table className="mw-100">
                                                <tbody>
                                                    <tr>
                                                        <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                        <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                        <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                        <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                                        <td className="myorder-table-data border-none vertical-align-middle" rowSpan="2">
                                                            <button className="myorder-table-btn" onClick={() => { handleNavi(order.invoice) }}>Upload Bank Slip</button>
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

                                        {order && order.itemDetails &&
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
                                        }
                                    </div>
                                </div>
                                <div className="myorder-item-spacing" />
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
                                {orders.filter(order => order.collectType === "taken").map((order, index) => (
                                    <div key={index}>
                                        <div className="w-100 overflow-x-auto">
                                            <div className="myorder-item-container">
                                                <div className="myorder-item-heading">
                                                    <h2>{order.invoice}</h2>
                                                    <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                                </div>
                                                <div className="w-100 hide-scroll-container">
                                                    <table className="mw-100">
                                                        <tbody>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                                <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                                <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                                <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                                <td className="myorder-table-data border-none">Collect Status: Collected</td>
                                                                <td className="myorder-table-data border-none">Name: Tan Lun</td>
                                                                <td className="myorder-table-data border-none">Phone: 0193035699</td>
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none" colSpan="4">Email: yourstyle1100@yahoo.com.my</td>
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none" colSpan="4">Collect Details:<br /> 11/11/2020 1:22pm ~ 11/11/2020 1:22pm</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="myorder-item-bottom">
                                                    <label><strong>Remark: </strong>{order.remark}</label>
                                                </div>

                                                <div className={`myorder-item-receipt ${openView === order.invoice ? 'view' : ''}`}>
                                                    <label>Collect Receipt:</label>
                                                    <img className="myorder-item-receipt-img" alt="image"
                                                        src={order.collectReceipt} />
                                                </div>

                                                {order && order.itemDetails &&
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
                                                }
                                            </div>
                                        </div>
                                        <div className="myorder-item-spacing" />
                                    </div>
                                ))}
                            </div>
                        }

                        {selectedApprovedStatus === "Delivery" &&
                            <div className="myorder-item-content-container hide-scroll-container">
                                {orders.filter(order => order.collectType === "delivery").map((order, index) => (
                                    <div key={index}>
                                        <div className="w-100 overflow-x-auto">
                                            <div className="myorder-item-container">
                                                <div className="myorder-item-heading">
                                                    <h2>{order.invoice}</h2>
                                                    <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                                </div>
                                                <div className="">
                                                    <table className="mw-100">
                                                        <tbody>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none">Payment Type: {order.paymentType}</td>
                                                                <td className="myorder-table-data border-none">Collect Type: {order.collectType}</td>
                                                                <td className="myorder-table-data border-none">Delivery Charge: {order.deliveryCharge}</td>
                                                                <td className="myorder-table-data border-none">Payment Amount: {order.paymentAmount}</td>
                                                                <td className="border-none" />
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none">Order Date: {order.orderDate}</td>
                                                                <td className="myorder-table-data border-none">
                                                                    Tracking Number: {order.trackingNumber}
                                                                    <br /><button className="myorder-table-btn mt-3" onClick={() => { setTracking(!tracking) }}>Track Order</button>
                                                                </td>
                                                                <td className="myorder-table-data border-none">Pos Courier: {order.posCourier}</td>
                                                                <td className="myorder-table-data border-none">Name: {order.name}</td>
                                                                <td className="myorder-table-data border-none">Phone: {order.phone}</td>
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none" colSpan="5">Email: {order.email}</td>
                                                            </tr>
                                                            <tr className="myorder-table-border-top">
                                                                <td className="myorder-table-data border-none" colSpan="5">
                                                                    Delivery Details:<br />
                                                                    {order.deliveryDetails}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="myorder-item-bottom">
                                                    <label><strong>Remark: </strong>{order.remark}</label>
                                                </div>

                                                <div className={`myorder-item-picture-video pt-3 ${openView === order.invoice ? 'view' : ''}`}>
                                                    <button className="myorder-table-btn mr-3" onClick={() => { setOpenPictures(true); setSelectedPictures(order.pictures || []) }}>Pictures</button>
                                                    <button className="myorder-table-btn" onClick={() => { setOpenVideos(true); setSelectedVideo(order.video || '') }}>Videos</button>
                                                </div>

                                                {order && order.itemDetails &&
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
                                                }
                                            </div>
                                        </div>
                                        <div className="myorder-item-spacing" />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }

                {selectedStatus && selectedStatus === "Reject" &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div key={index}>
                                <div className="w-100 overflow-x-auto">
                                    <div className="myorder-item-container">
                                        <div className="myorder-item-heading">
                                            <h2>{order.invoice}</h2>
                                            <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                        </div>
                                        <div className="w-100 hide-scroll-container">
                                            <table className="mw-100">
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
                                                            <button className="myorder-table-btn" onClick={() => { handleDocumentClick(order.document); }}>Document</button>
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

                                        {order && order.itemDetails &&
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
                                        }
                                    </div>
                                </div>
                                <div className="myorder-item-spacing" />
                            </div>
                        ))}
                    </div>
                }

                {selectedStatus && selectedStatus === "Failed" &&
                    <div className="myorder-item-content-container hide-scroll-container">
                        {orders.map((order, index) => (
                            <div key={index}>
                                <div className="w-100 overflow-x-auto">
                                    <div className="myorder-item-container">
                                        <div className="myorder-item-heading">
                                            <h2>{order.invoice}</h2>
                                            <button className="myorder-view-btn" onClick={() => handleViewClick(order.invoice)}>View Item</button>
                                        </div>
                                        <div className="w-100 hide-scroll-container">
                                            <table className="mw-100">
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
                                                            <button className="myorder-table-btn" onClick={() => { handleDocumentClick(order.document); }}>Document</button>
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

                                        {order && order.itemDetails &&
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
                                        }
                                    </div>
                                </div>
                                <div className="myorder-item-spacing" />
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    );
};

export default MyOrderPage;