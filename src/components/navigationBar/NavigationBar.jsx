import React, { useState, useEffect } from "react";
import './NavigationBar.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { MdHistory } from 'react-icons/md';
import { FaHome, FaFileAlt, FaTruck, FaKey } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../authContext";

const NavigationBar = () => {
    const navigate = useNavigate();
    const { userInformation } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [collapseMenu, setCollapseMenu] = useState({
        home: true,
        orderhistory: true,
        installmenthistory: true,
    });

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        setCollapseMenu(prevState => {
            const updatedState = {
                home: true,
                orderhistory: true,
                installmenthistory: true,
            };
            updatedState[menu] = !prevState[menu];
            return updatedState;
        });
    };

    const handleNavi = (menu) => {
        if (location.pathname !== menu) {
            setTimeout(() => {
                navigate(menu);
            }, 200);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOverlayVisible(true);
            } else {
                setIsOverlayVisible(false);
                setIsOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className={`${isOverlayVisible ? 'navigate-bar-container-overlay' : 'navigate-bar-container-overlay-hidden'} ${!isOpen ? 'hide' : ''}`} onClick={handleClick} />

            <div className={`navigate-bar-container ${isOpen ? 'open' : ''}`}>
                <div className={isOpen ? 'navigate-bar-content-container hide-scroll-container' : 'hide'}>
                    <div className="navigate-bar-content-container-detail">
                        <label className="fs-7 fw-bold mb-2">General</label>

                        <div
                            className={`navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2 ${selectedMenu === "home" && !collapseMenu.home ? 'selected' : ''}`}
                            onClick={() => handleMenuClick("home")}
                        >
                            <FaHome className="navigate-bar-icon mr-3" />
                            <label>Home</label>
                            {selectedMenu === "home" ? (
                                collapseMenu.home ? (
                                    <ExpandMoreIcon className="navigate-bar-content-status" />
                                ) : (
                                    <ExpandLessIcon className="navigate-bar-content-status" />
                                )
                            ) : (
                                <ExpandMoreIcon className="navigate-bar-content-status" />
                            )}
                        </div>

                        <div className={`navigate-bar-subcontent-container font-custom-2 fs-8 d-flex flex-column ${!collapseMenu.home ? 'show' : ''}`}>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/dashboard')}
                                style={location.pathname === '/dashboard' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Dashboard
                            </span>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/profile')}
                                style={location.pathname === '/profile' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Profile
                            </span>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/')}
                                style={location.pathname === '/' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Shop
                            </span>
                        </div>

                        <div
                            className={`navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2 ${selectedMenu === "orderhistory" && !collapseMenu.orderhistory ? 'selected' : ''}`}
                            onClick={() => handleMenuClick("orderhistory")}
                        >
                            <MdHistory className="navigate-bar-icon mr-3" />
                            <label>Order History</label>
                            {selectedMenu === "orderhistory" ? (
                                collapseMenu.orderhistory ? (
                                    <ExpandMoreIcon className="navigate-bar-content-status" />
                                ) : (
                                    <ExpandLessIcon className="navigate-bar-content-status" />
                                )
                            ) : (
                                <ExpandMoreIcon className="navigate-bar-content-status" />
                            )}
                        </div>

                        <div className={`navigate-bar-subcontent-container font-custom-2 fs-8 d-flex flex-column ${!collapseMenu.orderhistory ? 'show' : ''}`}>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/order')}
                                style={location.pathname === '/order' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Order
                            </span>
                        </div>

                        <div
                            className={`navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2 ${selectedMenu === "installmenthistory" && !collapseMenu.installmenthistory ? 'selected' : ''}`}
                            onClick={() => handleMenuClick("installmenthistory")}
                        >
                            <FaFileAlt className="navigate-bar-icon mr-3" />
                            <label>Installment History</label>
                            {selectedMenu === "installmenthistory" ? (
                                collapseMenu.installmenthistory ? (
                                    <ExpandMoreIcon className="navigate-bar-content-status" />
                                ) : (
                                    <ExpandLessIcon className="navigate-bar-content-status" />
                                )
                            ) : (
                                <ExpandMoreIcon className="navigate-bar-content-status" />
                            )}
                        </div>

                        <div className={`navigate-bar-subcontent-container font-custom-2 fs-8 d-flex flex-column ${!collapseMenu.installmenthistory ? 'show' : ''}`}>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/installmentdocument')}
                                style={location.pathname === '/installmentdocument' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Installment Document
                            </span>
                            <span className="navigate-bar-subcontent p-2" onClick={() => handleNavi('/installmentlist')}
                                style={location.pathname === '/installmentlist' ? { cursor: 'not-allowed', color: 'gray' } : {}}>
                                Installment List
                            </span>
                        </div>

                        <div className="navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2" onClick={() => handleNavi('/ordertracking')}>
                            <FaTruck className="navigate-bar-icon mr-3" />
                            <label>Order Tracking</label>
                        </div>
                    </div>
                </div>

                <div className={isOpen ? 'navigate-bar-profile-container' : 'hide'}>
                    <div className="navigate-bar-profile-image fs-4">
                        {userInformation && userInformation.username && /^[A-Za-z]/.test(userInformation.username.charAt(0))
                            ? userInformation.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="navigate-bar-profile-name fw-bold fs-5">{userInformation && userInformation.username ? userInformation.username : 'Unknown'}</span>
                    <button className="navigate-bar-profile-password-btn" title="Change Password" onClick={() => handleNavi('/password')}>
                        <FaKey className="navigate-bar-profile-password-icon" />
                    </button>
                </div>
            </div>

            <button
                className={`navigate-bar-button ${isOpen ? 'open' : ''}`}
                onClick={handleClick}
                title={isOpen ? 'Close Menu' : 'Open Menu'}
            >
                <ChevronLeftIcon className={isRotated ? 'rotated' : ''} />
            </button>
        </>
    );
};

export default NavigationBar;
