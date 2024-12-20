import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import '../assets/css/Header.css';
import { FaUser, FaShoppingCart, FaBars, FaSearch, FaWhatsapp, FaHeart } from 'react-icons/fa';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cartContext';

const Header = ({ action }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [isPortrait, setIsPortrait] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { cartDisplayList } = useCart();
    const [allowWishlist, setAllowWishlist] = useState(true);

    const [headerList, setheaderList] = useState([
        { name: "Home", param: "home" },
        { name: "Promotion", param: "promotion" },
        { name: "Contact", param: "contact" }
    ]);

    const handleNavigate = (target) => {
        setTimeout(() => {
            navigate(target);
        }, 200)
        window.scrollTo(0, 0);
    }

    const navigateCall = (type) => {
        setShowMenu(false);
        if (type === "home") {
            handleNavigate('/');
        } else if (type === "user") {
            if (isLoggedIn) {
                handleNavigate('/profile');
            } else {
                handleNavigate('/login');
            }
        } else if (type === "wishlist") {
            handleNavigate('/wishlist');
        } else if (type === "contact") {
            handleNavigate('/contact');
        } else if (type === "promotion") {
            handleNavigate('/promotion');
        }
    }

    const handleAction = (type) => {
        setShowMenu(false);
        if (action) {
            action(type);
        }
    };

    const updateLayout = (first = true) => {
        const headerMenuList = document.getElementById("headerMenuList");

        if (headerMenuList) {
            const containerWidth = headerMenuList.offsetWidth;
            const spanElements = Array.from(document.querySelectorAll('.header-menu-content'));
            const totalSpanWidth = spanElements.reduce((acc, span) => acc + (span ? span.offsetWidth : 0), 0);
            if (totalSpanWidth > containerWidth) {
                headerMenuList.classList.add('hide');
                headerMenuList.classList.remove('header-menu-list');
                setIsPortrait(true);
            } else {
                headerMenuList.classList.add('header-menu-list');
                headerMenuList.classList.remove('hide');
                setIsPortrait(false);
                first ? updateLayout(false) : setShowMenu(false);

            }
        }
    };

    useLayoutEffect(() => {
        const handleResize = () => {
            window.requestAnimationFrame(updateLayout);
        };
        window.addEventListener('resize', handleResize);
        updateLayout();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="header-container">
            <div className="header-content">

                <button className="header-icon" onClick={() => { navigateCall('home') }}>
                    <img src="https://kedaiemasion.my/assets/png-ion.png" alt="logo" width="100px" height="40px" />
                </button>

                <div className={showMenu ? 'header-menu-dropdown' : 'hide'} id="headerMenuList">
                    {headerList.map((item, index) => (
                        <span
                            key={index}
                            className={`header-menu-content select-none ${showMenu ? 'header-menu-content-spacing' : ''}`}
                            id={`menuItem-${index}`}
                            onClick={() => navigateCall(item.param)}
                        >
                            {item.name}
                        </span>
                    ))}
                    <div className="header-menu-icon-list">
                        <div className={`${!isPortrait ? 'header-btn header-user-btn' : 'header-dropdown-btn'} ${!allowWishlist ? 'notallow' : ''}`} onClick={() => { navigateCall('user') }}>
                            <button>
                                <FaUser className="header-icon-size" />
                            </button>
                        </div>
                        {allowWishlist &&
                            <div className={`${!isPortrait ? 'header-btn header-wishlist-btn' : 'header-dropdown-btn'}`} onClick={() => { navigateCall('wishlist') }}>
                                <button>
                                    <FaHeart className="header-icon-size" />
                                </button>
                            </div>
                        }
                        <div className={`${!isPortrait ? 'header-btn header-cart-btn' : 'header-dropdown-btn'}`} onClick={() => { handleAction('cart'); }}>
                            <button>
                                <FaShoppingCart className="header-icon-size" /><label className="header-cart-num">{cartDisplayList.length || 0}</label>
                            </button>
                        </div>
                        <div className={`${!isPortrait ? 'header-btn header-whatsapp-btn' : 'header-dropdown-btn'}`} onClick={() => { window.location.href = 'https://wa.me/60195481017'; }}>
                            <button>
                                <FaWhatsapp className="header-icon-size" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`header-btn ${!isPortrait ? 'header-search-btn' : 'header-search-btn-portrait'} ${!allowWishlist ? 'notallow' : ''}`} onClick={() => { handleAction('search') }}>
                    <button>
                        <FaSearch className="header-icon-size" />
                    </button>
                </div>
                <div className={isPortrait ? 'header-sidebar-btn header-btn' : 'hide'} onClick={() => { setShowMenu(!showMenu); }}>
                    <button>
                        <FaBars className="header-icon-size" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;