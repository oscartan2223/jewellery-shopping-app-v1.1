import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/SideBar.css';
import { FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import { useAuth } from '../authContext';
import { useStock } from '../stockContext'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cartContext';

const SideBar = ({ value = "", onClose, SearchInput, searchInputValue = '', showAlert }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { cartList, cartDisplayList, removeCart } = useCart();
    const { stocks, loading, error } = useStock();
    const [closeAmination, setCloseAnimation] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [popularCategories, setPopularCategories] = useState([]);
    const [selectedCartItem, setSelectedCartItem] = useState([]);
    const selectCartItem = useRef([]);

    useEffect(() => {
        // api (fetch to get popular catagories)
        const fetchedData = ['Pendants & Charms', 'Rings', 'Couple Rings', 'Bar & Notes', 'Earrings', 'Bracelet', 'Bangle', 'Necklace']
        setSearchInput(searchInputValue);
        setPopularCategories(fetchedData);
    }, []);

    useEffect(() => {
        if (value && value === "cart") {
            document.documentElement.style.overflow = 'hidden'
        }

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [value]);

    const handleClose = () => {
        document.documentElement.style.overflow = '';
        setCloseAnimation(!closeAmination);
        setTimeout(() => {
            onClose();
        }, 500)
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            handleClose();
        }
    };

    const handleCartSelect = (selectedItem) => {
        if (!selectCartItem.current.some(item => item.stockCode === selectedItem.stockCode)) {
            selectCartItem.current = [...selectCartItem.current, selectedItem];
            setSelectedCartItem(selectCartItem.current);
        } else {
            selectCartItem.current = selectCartItem.current.filter(item => item.stockCode !== selectedItem.stockCode)
            setSelectedCartItem(selectCartItem.current);
        }
    };

    const getTotalPrice = () => {
        let price_amount = 0;
        selectedCartItem.forEach((eachCartItem) => {
            if (eachCartItem.promotion_price) {
                price_amount += eachCartItem.promotion_price;
            } else {
                price_amount += eachCartItem.actual_price;
            }
        })
        return `RM ${price_amount.toFixed(2)}`;
    }

    const handleRemoveCartItem = async () => {
        if (selectCartItem.current.length < 1) {
            showAlert("warning", "Please select any of item before removing!");
            return;
        }

        for (const cartItem of selectCartItem.current) {
            const result = await removeCart(cartItem);
            if (!result) {
                showAlert("error", "An unexpected error occur while removing the cart items!");
            }
        }
        selectCartItem.current = [];
        setSelectedCartItem(selectCartItem.current);
    }

    const handleCheckout = () => {
        if (selectCartItem.current.length < 1) {
            showAlert("warning", "Please select any of item before checkout!");
            return;
        }
    }

    return (
        <div className="sidebar-overlay">
            <div className="sidebar-content" onClick={handleClose}>
                {value === "search" &&
                    <div className={`sidebar-search-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>
                        <div className="sidebar-search-list-content">
                            <div className="sidebar-search-input-container">
                                <input className="sidebar-search-input" placeholder="Search" value={searchInput} onKeyDown={handleSearch} onChange={(event) => { setSearchInput(event.target.value.trim()); SearchInput(event.target.value.trim()) }} />
                                <FaSearch className="sidebar-search-icon-btn" />
                                <button className="sidebar-search-clear-btn" onClick={() => { setSearchInput('') }}><FaTrash className="sidebar-search-clear-icon" title="Clear All" /></button>
                                <FaTimes className="sidebar-search-close-btn" onClick={handleClose} />
                            </div>
                            {searchInput === '' && popularCategories.length > 0 && (
                                <div className="sidebar-search-result-container">
                                    <div className="sidebar-search-title">
                                        <strong>Popular Searchs</strong>
                                    </div>
                                    {popularCategories.map((item, index) => (
                                        <div className="sidebar-search-result" key={index}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                }

                {value === "carts" &&
                    <div className={`sidebar-cart-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>
                        <div className="sidebar-cart-list-content">
                            <div className="sidebar-cart-heading">
                                <h4 className="sidebar-cart-header font-custom">Cart List</h4>
                                <FaTimes className="sidebar-close-icon" onClick={handleClose} />
                            </div>
                            <div className="hide-scroll-container sidebar-cart-boxes-container">
                                <div className="sidebar-cart-boxes">
                                    {cartDisplayList &&
                                        cartDisplayList.map((eachCartItem, index) => (
                                            <div className={`sidebar-cart-box ${selectedCartItem.some(item => item.stockCode === eachCartItem.stockCode) ? 'selected' : ''}`} key={index} onClick={() => {handleCartSelect(eachCartItem)}}>
                                                <div className="sidebar-cart-image-container">
                                                    <img className="sidebar-cart-image" src={eachCartItem.imageUrl[0].original} alt="image" />
                                                </div>

                                                <div className="sidebar-cart-details-container">
                                                    <h4 className="sidebar-cart-box-heading font-custom">{eachCartItem.heading} {eachCartItem.stockCode}</h4>
                                                    <p className="sidebar-cart-box-content font-custom">Measurement: {eachCartItem.measurement}</p>
                                                    <p className="sidebar-cart-box-content font-custom">Weight: {eachCartItem.weight}</p>
                                                    <p className="sidebar-cart-box-content font-custom mb-2">Product Type: {eachCartItem.type}</p>
                                                    <div className="sidebar-cart-box-bottom">
                                                        <button className="font-custom" onClick={(e) => { e.stopPropagation(); }}>Remark</button>
                                                        <p className="font-custom">{`RM ${eachCartItem.promotion_price || eachCartItem.actual_price}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="sidebar-total-panel-container">
                                <div className="sidebar-cart-total-details-container">
                                    <span className="sidebar-cart-total-text">Total</span>
                                    <div className="sidebar-cart-details">
                                        <span className="sidebar-cart-total-selected">
                                            ({selectedCartItem.length} items selected)
                                        </span>
                                        <span className="sidebar-cart-total-price">
                                            {getTotalPrice()}
                                        </span>
                                    </div>
                                </div>

                                <div className="sidebar-cart-total-btn-container">
                                    <button className="sidebar-cart-remove-btn" title="Remove Item" onClick={() => {handleRemoveCartItem();}}>
                                        <FaTrash className="sidebar-cart-remove-icon"/>
                                    </button>
                                    <button className="sidebar-cart-checkout-btn" title="Proceed to Checkout" onClick={handleCheckout}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SideBar;