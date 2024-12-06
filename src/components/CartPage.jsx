import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/css/CartPage.css';
import ThumbnailSlider from './thumbnailSlider/thumbnailSlider.jsx';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../cartContext.jsx";

const CartPage = ({ showAlert, openCart }) => {
    const { addCart } = useCart();
    const navigate = useNavigate();
    const populateData = useLocation().state;
    const [showNavigate, setShowNavigate] = useState(false);

    const handleAddToCart = async (headingValue, stock) => {
        stock["heading"] = headingValue;
        const status = await addCart(stock);
        if (status === "success") {
            showAlert('success', 'Item has added into cart!');
            setShowNavigate(true);
        } else if (status === "item exist") {
            showAlert('error', 'Item already existed in cart!');
        } else if (status === "length exceed") {
            showAlert('warning', 'Cart item cannot more than 5!');
        }
    };

    const handleBack = () => {
        setTimeout(() => {
            navigate(-1);
        }, 200)
        window.scrollTo(0, 0);
    };

    return (
        <div>
            {populateData ? (
                <div className="stock-select-content">
                    {showNavigate &&
                        <div className="cart-navigate-overlay">
                            <div className="cart-navigate-container">
                                <div className="cart-navigate-heading-container">
                                    <h4 className="cart-navigate-heading font-custom fw-bold">Product Added to Cart</h4>
                                </div>
                                <button
                                    className="cart-navcheckout-button btn-secondary mb-2"
                                    type="button"
                                    onClick={() => {setShowNavigate(!showNavigate); openCart();}}>
                                    <strong>Go To Checkout</strong>
                                </button>

                                <button
                                    className="cart-shopback-button btn-secondary mb-3"
                                    type="button"
                                    onClick={() => {setShowNavigate(!showNavigate); handleBack(); }}>
                                    <strong>Continue to Shop</strong>
                                </button>
                            </div>
                        </div>
                    }

                    <div className={`stock-content selected-stock-ui`}>
                        <div className="selected-stock-image-container">
                            <ThumbnailSlider images={populateData[1].imageUrl} />
                        </div>
                        <div className="selected-stock-content-container">
                            <div className="selected-item-stock-title">
                                <label className="selected-title">{populateData[0]}&nbsp;{populateData[1].stockCode}</label>
                            </div>
                            <div className="">
                                <p className="stock-item-price text-danger">Price: RM {populateData[1].actual_price}.00</p>
                            </div>
                            <div className="selected-stock-content">
                                <p className="selected-stock-item-text">Weight: {populateData[1].count > 1 ? `${populateData[1].minWeight} g ~ ${populateData[1].maxWeight} g` : `${populateData[1].weight} g`}</p>
                                <p className="selected-stock-item-text">Measurement: {populateData[1].count > 1 ? `${populateData[1].minMeasurement} mm ~ ${populateData[1].maxMeasurement} mm` : `${populateData[1].measurement} mm`}</p>
                                <p className="selected-stock-item-text">Width: {populateData[1].count > 1 ? `${populateData[1].minSize} mm ~ ${populateData[1].maxSize} mm` : `${populateData[1].size} mm`}</p>
                                <p className="selected-stock-item-text">Product Code: {populateData[1].stockCode}</p>
                                <hr className="featurette-divider selected-stock" />
                                <button className="stock-item-cart-btn" onClick={() => handleAddToCart(populateData[0], populateData[1])}>
                                    <i className="stock-item-cart-icon"><FaShoppingCart /></i>Add to Cart
                                </button>
                                <button className="stock-item-back-btn" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="unavailable-item-view">
                    <label>Unavailable Cart Item.</label>
                </div>
            )}
        </div>
    );
};

export default CartPage;