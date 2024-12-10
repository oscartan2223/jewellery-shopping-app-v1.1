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
    const { cartList, cartDisplayList, removeCart, addRemark } = useCart();
    const { stocks, loading, error } = useStock();
    const [closeAmination, setCloseAnimation] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [popularCategories, setPopularCategories] = useState([]);
    const [selectedCartItem, setSelectedCartItem] = useState([]);
    const selectCartItem = useRef([]);
    const [openRemark, setOpenRemark] = useState(false);
    const selectedCartStockCode = useRef();
    const [remarkChangeSize, setRemarkChangeSize] = useState(false);
    const [remarkAddMinus, setRemarkAddMinus] = useState('');
    const [addMinusValue, setAddMinusValue] = useState();
    const [remarkReturnOption, setRemarkReturnOption] = useState('');
    const [remarkBankAcc, setRemarkBankAcc] = useState();
    const [remarkAccName, setRemarkAccName] = useState();
    const [remarkBankName, setRemarkBankName] = useState();
    const [remarkContent, setRemarkContent] = useState();

    useEffect(() => {
        // api (fetch to get popular catagories)
        const fetchedData = ['Pendants & Charms', 'Rings', 'Couple Rings', 'Bar & Notes', 'Earrings', 'Bracelet', 'Bangle', 'Necklace']
        setSearchInput(searchInputValue);
        setPopularCategories(fetchedData);
    }, []);

    const handleClose = () => {
        document.documentElement.style.overflow = '';
        setCloseAnimation(!closeAmination);
        setTimeout(() => {
            onClose();
        }, 300);
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

    const handleRemark = (cartItem) => {
        // setOpenRemark(!openRemark);
        if (cartItem && cartItem.stockCode) {
            selectedCartStockCode.current = cartItem.stockCode;
            setRemarkChangeSize(cartItem.remarkChangeSize || false);
            setRemarkAddMinus(cartItem.remarkAddMinus || '');
            setAddMinusValue(cartItem.addMinusValue || undefined);
            setRemarkReturnOption(cartItem.remarkReturnOption || '');
            setRemarkBankAcc(cartItem.remarkBankAcc || undefined);
            setRemarkAccName(cartItem.remarkAccName || undefined);
            setRemarkBankName(cartItem.remarkBankName || undefined);
            setRemarkContent(cartItem.remarkContent || undefined);
        }
    };

    const handleRemarkInputChange = (value, type) => {
        if (type === "bank_acc") {
            setRemarkBankAcc(value);
        } else if (type === "acc_name") {
            setRemarkAccName(value);
        } else if (type === "bank_name") {
            setRemarkBankName(value);
        }
    };

    const handleSaveRemark = () => {
        addRemark(selectedCartStockCode.current, "remarkChangeSize", remarkChangeSize);
        addRemark(selectedCartStockCode.current, "remarkAddMinus", remarkAddMinus);
        addRemark(selectedCartStockCode.current, "addMinusValue", addMinusValue);
        addRemark(selectedCartStockCode.current, "remarkReturnOption", remarkReturnOption);
        addRemark(selectedCartStockCode.current, "remarkBankAcc", remarkBankAcc);
        addRemark(selectedCartStockCode.current, "remarkAccName", remarkAccName);
        addRemark(selectedCartStockCode.current, "remarkBankName", remarkBankName);
        addRemark(selectedCartStockCode.current, "remarkContent", remarkContent);
        setOpenRemark(!openRemark);
    };

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

                {value === "cart" &&
                    <div className={`sidebar-cart-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>

                        {openRemark &&
                            <div className="sidebar-cart-remark-overlay">
                                <div className="sidebar-cart-remark-container">
                                    <div className="sidebar-cart-remark-heading-container">
                                        <h4>Remarks</h4>
                                        <FaTimes className="sidebar-cart-remark-close-btn" onClick={() => { setOpenRemark(!openRemark); }} />
                                    </div>
                                    <div className="sidebar-cart-remark-content hide-scroll-container">
                                        <div className="d-flex align-items-center mb-2" onClick={() => { setRemarkChangeSize(!remarkChangeSize); }} >
                                            <input className="cart-remark-checkbox all-center" type="checkbox" checked={remarkChangeSize === true} />
                                            <span className="cart-remark-change-size">Change Size</span>
                                        </div>
                                        <div className="sidebar-cart-remark-addminus-container">
                                            <span className="font-custom-2">Add/Minus: (Original Measurement : 1g)</span>
                                            <div className="mb-2">
                                                <label className="sidebar-cart-remark-radio-container">
                                                    <input type="radio" checked={remarkAddMinus === "add"} onClick={() => { remarkAddMinus !== "add" ? setRemarkAddMinus('add') : setRemarkAddMinus('') }} />
                                                    Add
                                                </label>
                                                <label className="sidebar-cart-remark-radio-container">
                                                    <input type="radio" checked={remarkAddMinus === "minus"} onClick={() => { remarkAddMinus !== "minus" ? setRemarkAddMinus('minus') : setRemarkAddMinus('') }} />
                                                    Minus
                                                </label>
                                            </div>
                                            <input
                                                className="sidebar-cart-addminus-input" type="number" placeholder="Number to be adjusted" value={addMinusValue}
                                                onKeyDown={(e) => { if (!/^\d*$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") { e.preventDefault(); } }}
                                                onChange={(e) => { const value = e.target.value; if (/^\d*$/.test(value)) { setAddMinusValue(value); } }}
                                                disabled={remarkAddMinus === ''}
                                            />

                                        </div>
                                        <div className={`sidebar-cart-remark-addminus-container ${remarkAddMinus !== "minus" ? 'hide' : ''}`}>
                                            <span className="font-custom-2">Return Options:</span>
                                            <div className="mb-2">
                                                <label className="sidebar-cart-remark-radio-container">
                                                    <input type="radio" checked={remarkReturnOption === "keep"} onClick={() => { remarkReturnOption !== "keep" ? setRemarkReturnOption('keep') : setRemarkReturnOption('') }} />
                                                    Keep Yourself
                                                </label>
                                                <label className="sidebar-cart-remark-radio-container">
                                                    <input type="radio" checked={remarkReturnOption === "back"} onClick={() => { remarkReturnOption !== "back" ? setRemarkReturnOption('back') : setRemarkReturnOption('') }} />
                                                    Sell back to shop
                                                </label>
                                            </div>
                                        </div>
                                        <strong className={`text-danger fs-8 mb-2 ${remarkReturnOption !== "back" ? 'hide' : ''}`}>
                                            * Please fill in your bank detail as any extra amount will be refunded to your bank account.* The purchase price is RM 376 per gram.* There might be charges for the changes of size; if there are any charges, we will remind you after that.
                                        </strong>
                                        <input
                                            className="feedback_input form-control mb-3"
                                            type="text"
                                            placeholder="Bank Account No"
                                            value={remarkBankAcc}
                                            onChange={(e) => {handleRemarkInputChange(e.target.value, "bank_acc");}}
                                        />
                                        <input
                                            className="feedback_input form-control mb-3"
                                            type="text"
                                            placeholder="Account Name"
                                            value={remarkAccName}
                                            onChange={(e) => {handleRemarkInputChange(e.target.value, "acc_name");}}
                                        />
                                        <input
                                            className="feedback_input form-control mb-3"
                                            type="text"
                                            placeholder="Bank Name"
                                            value={remarkBankName}
                                            onChange={(e) => {handleRemarkInputChange(e.target.value, "bank_name");}}
                                        />
                                        <span className="fs-8 fw-bold">Remarks:</span>
                                        <textarea rows="4" cols="37" value={remarkContent} onChange={(e) => { setRemarkContent(e.target.value) }} />
                                    </div>

                                    <div className="w-100 all-center">
                                        <button className="remark-save-button" onClick={() => { handleSaveRemark(); }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="sidebar-cart-list-content">
                            <div className="sidebar-cart-heading">
                                <h4 className="sidebar-cart-header font-custom">Cart List</h4>
                                <FaTimes className="sidebar-close-icon" onClick={handleClose} />
                            </div>
                            <div className="hide-scroll-container sidebar-cart-boxes-container">
                                {cartDisplayList && cartDisplayList.length < 1 &&
                                    <div className="w-100 all-center h-100 fw-bold">No cart items available.</div>
                                }
                                {cartDisplayList && cartDisplayList.length > 0 &&
                                    <div className="sidebar-cart-boxes">
                                        {cartDisplayList.map((eachCartItem, index) => (
                                            <div className={`sidebar-cart-box ${selectedCartItem.some(item => item.stockCode === eachCartItem.stockCode) ? 'selected' : ''}`} key={index} onClick={() => { handleCartSelect(eachCartItem) }}>
                                                <div className="sidebar-cart-image-container">
                                                    <img className="sidebar-cart-image" src={eachCartItem.imageUrl[0].original} alt="image" />
                                                </div>

                                                <div className="sidebar-cart-details-container">
                                                    <h4 className="sidebar-cart-box-heading font-custom">{eachCartItem.heading} {eachCartItem.stockCode}</h4>
                                                    <p className="sidebar-cart-box-content font-custom">Measurement: {eachCartItem.measurement}</p>
                                                    <p className="sidebar-cart-box-content font-custom">Weight: {eachCartItem.weight}</p>
                                                    <p className="sidebar-cart-box-content font-custom mb-2">Product Type: {eachCartItem.type}</p>
                                                    <div className={`sidebar-cart-box-bottom ${selectedCartItem.some(item => item.stockCode === eachCartItem.stockCode) ? 'selected' : ''}`}>
                                                        <button className="font-custom" onClick={(e) => { e.stopPropagation(); handleRemark(eachCartItem); }} disabled={!selectedCartItem.some(item => item.stockCode === eachCartItem.stockCode)}>Remark</button>
                                                        <p className="font-custom">{`RM ${eachCartItem.promotion_price || eachCartItem.actual_price}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
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
                                    <button className="sidebar-cart-remove-btn" title="Remove Item" onClick={() => { handleRemoveCartItem(); }}>
                                        <FaTrash className="sidebar-cart-remove-icon" />
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