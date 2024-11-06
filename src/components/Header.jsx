import React, { useEffect, useState } from 'react';
import '../assets/css/Header.css';
import { FaUser, FaShoppingCart, FaBars, FaSearch } from 'react-icons/fa';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ action }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [cartItem, setCartItem] = useState(0);

    useEffect(() => {
        if (isLoggedIn) {
            //fetch from db get shopping cart index
            setCartItem(1);
        }
    }, [isLoggedIn]);

    const handleNavigate = (target) => {
        setTimeout(() => {
            navigate(target);
        }, 200)
        window.scrollTo(0, 0);
    }

    const navigateCall = (type) => {
        if (type === "home") {
            handleNavigate('/');
        } else if (type === "user") {
            if (isLoggedIn) {
                handleNavigate('/profile');
            } else {
                handleNavigate('/login');
            }
        }
    }

    const handleAction = (type) => {
        if (action) {
            action(type);
        }
    };

    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-sidebar-btn header-btn" onClick={() => { handleAction('menu') }}>
                    <button>
                        <FaBars className="header-icon-size" />
                    </button>
                </div>
                <div className="header-search-btn header-btn" onClick={() => { handleAction('search') }}>
                    <button>
                        <FaSearch className="header-icon-size" />
                    </button>
                </div>
                <button className="header-icon" onClick={() => { navigateCall('home') }}>
                    <img src="https://kedaiemasion.my/assets/png-ion.png" alt="logo" width="100px" height="40px" />{/* height 40px */}
                </button>
                <div className="header-user-btn header-btn" onClick={() => { handleNavigate('user') }}>
                    <button>
                        <FaUser className="header-icon-size" />
                    </button>
                </div>
                <div className="header-cart-btn header-btn" onClick={() => { handleAction('cart') }}>
                    <button>
                        <FaShoppingCart className="header-icon-size" /><label className="header-cart-num">{cartItem}</label>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;