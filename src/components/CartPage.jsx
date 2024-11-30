import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/css/CartPage.css';
import ThumbnailSlider from './thumbnailSlider/thumbnailSlider.jsx';
import { FaShoppingCart } from 'react-icons/fa';

const CartPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const populateData = useLocation().state;

    const handleAddToCart = (heading, stock) => {
        console.log("Success", heading, stock);
    };

    const handleBack = () => {
        setTimeout(() => {
            navigate(-1);
        }, 200)
        window.scrollTo(0, 0);
    };

    return (
        <div className="">
            {populateData ? (
                <div className="stock-select-content">
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