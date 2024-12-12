import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/css/CartPage.css';
import ThumbnailSlider from './thumbnailSlider/thumbnailSlider.jsx';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../cartContext.jsx";
import { useWish } from "../wishContext.jsx";

const CartPage = ({ showAlert, openCart }) => {
    const { addWish } = useWish();
    const { addCart, getCart } = useCart();
    const navigate = useNavigate();
    const populateData = useLocation().state;
    const [showNavigate, setShowNavigate] = useState(false);

    const handleAddToCart = async (headingValue, stock) => {
        stock["heading"] = headingValue;
        stock["type"] = populateData[1];
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

    const handleAddToWish = async (headingValue, stock) => {
        stock["heading"] = headingValue;
        stock["type"] = populateData[1];
        if (getCart(stock)){
            const status = await addWish(stock);
            if (status === "success") {
                showAlert('success', 'Item has added into wishlist!');
            } else if (status === "item exist") {
                showAlert('error', 'Item already existed in wishlist!');
            }
        } else {
            showAlert('warning', 'Wishlist can only add item that are not already in the Cart!');
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
                        <div className="cart-navigate-overlay hide-scroll-container">
                            <div className="cart-navigate-container">
                                <div className="cart-navigate-heading-container">
                                    <h4 className="cart-navigate-heading font-custom fw-bold">Product Added to Cart</h4>
                                </div>
                                <div className="cart-stock-dialog-container">
                                    <div className="cart-stock-dialog-content">
                                        <img className="cart-stock-dialog-image" src={populateData[2].imageUrl[0].original} />
                                        <div className="cart-stock-dialog-text-container">
                                            <p className="fs-7 font-custom mb-2">{populateData[0]}</p>
                                            <em className="fs-8 font-custom font-italic">Measurement: {populateData[2].measurement}</em>
                                            <em className="fs-8 font-custom font-italic">Weight: {populateData[2].weight}g</em>
                                            <em className="fs-8 font-custom font-italic">Gold Type: {populateData[1]}</em>
                                            <label className="fs-6 font-custom">RM {populateData[2].actual_price}</label>
                                        </div>
                                    </div>
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
                            <ThumbnailSlider images={populateData[2].imageUrl} />
                        </div>
                        <div className="selected-stock-content-container">
                            <div className="selected-item-stock-title">
                                <label className="selected-title">{populateData[0]}&nbsp;{populateData[2].stockCode}</label>
                            </div>
                            <div className="">
                                <p className="stock-item-price text-danger">Price: RM {populateData[2].promotion_price ? populateData[2].promotion_price.toFixed(2) : populateData[2].actual_price.toFixed(2)} <del className="cart-before-discount-price blinking-text">{populateData[2].promotion_price ? `RM${populateData[2].actual_price.toFixed(2)}` : ''}</del></p>
                            </div>
                            <div className="selected-stock-content">
                                <p className="selected-stock-item-text">Weight: {populateData[2].count > 1 ? `${populateData[2].minWeight} g ~ ${populateData[2].maxWeight} g` : `${populateData[2].weight} g`}</p>
                                <p className="selected-stock-item-text">Measurement: {populateData[2].count > 1 ? `${populateData[2].minMeasurement} mm ~ ${populateData[2].maxMeasurement} mm` : `${populateData[2].measurement} mm`}</p>
                                <p className="selected-stock-item-text">Width: {populateData[2].count > 1 ? `${populateData[2].minSize} mm ~ ${populateData[2].maxSize} mm` : `${populateData[2].size} mm`}</p>
                                <p className="selected-stock-item-text">Product Code: {populateData[2].stockCode}</p>
                                <p className="selected-stock-item-text">Gold Type: {populateData[1]}</p>
                                <p className="selected-stock-item-text">Branch Code: {populateData[2].branchCode}</p>
                                <p className="selected-stock-item-text">Branch Name: {populateData[2].branchName}</p>
                                <hr className="featurette-divider selected-stock" />
                                <button className="stock-item-cart-btn" onClick={() => handleAddToCart(populateData[0], populateData[2])}>
                                    <i className="stock-item-cart-icon"><FaShoppingCart /></i>Add to Cart
                                </button>
                                <button className="stock-item-wish-btn" onClick={() => handleAddToWish(populateData[0], populateData[2])}>
                                    <i className="stock-item-cart-icon"><FaHeart /></i>Add to Wishlist
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