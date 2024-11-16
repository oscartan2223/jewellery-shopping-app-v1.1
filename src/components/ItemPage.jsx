import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStock } from '../stockContext';
import { FaFilter, FaTimes } from 'react-icons/fa';
import '../assets/css/ItemPage.css';

const ItemPage = () => {
    const location = useLocation();
    const data = location.state;
    const { stocks } = useStock();
    const [stockList, setStockList] = useState();
    const [currentItemList, setCurrentItemList] = useState([]);
    const [filterBox, setFilterBox] = useState(false);

    useEffect(() => {
        if (filterBox) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [filterBox]);


    useEffect(() => {
        if (data) {
            console.log(data);  // Log the data if it's passed via navigate
        } else {
            console.log('No data passed.');
        }
    }, [data])

    useEffect(() => {
        if (stocks.current) {
            const items = stocks.current.flatMap(eachGroup =>
                eachGroup.items.map(eachItem => eachItem)
            );
            setCurrentItemList(items);
        }
    }, [stocks]);


    return (
        <div className="item-container">
            <h1 className="w-100 mb-4 text-center font-custom">Category Name</h1>
            <div className="item-filter-container">
                <div className="item-filter">
                    <span className="item-filter-button" onClick={() => { setFilterBox(!filterBox) }}>
                        <FaFilter className="item-filter-icon" />
                        <label>Show Filters</label>
                    </span>
                    <div className={`item-filter-box ${filterBox ? 'item-filter-box-show' : 'item-filter-box-hide'}`}>
                        <div className="item-filter-title font-custom fw-bold mb-4">
                            FILTERS
                            <button className="item-filter-close-btn" onClick={() => { setFilterBox(!filterBox) }}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="overflow-auto">
                            <div className="mb-3">
                                <button className="w-100 font-custom-2 fw-bold text-start p-0">
                                    Types
                                </button>
                                <div className={`d-flex flex-column`}>
                                    <span className="w-100 font-custom-2">All</span>
                                    <span className="w-100 font-custom-2">Gold</span>
                                    <span className="w-100 font-custom-2">Silver</span>
                                </div>
                            </div>

                            <div>
                                <button className="w-100 font-custom-2 fw-bold text-start p-0">
                                    Advanced
                                </button>
                                <div className={`d-flex flex-column`}>
                                    <span className="w-100 font-custom-2">With box only</span>
                                    <span className="w-100 font-custom-2">Certificate only</span>
                                </div>
                            </div>

                                Price, Measurement and Weight.....
                            </div>
                    </div>
                    <div className={`item-filter-box-overlay ${filterBox ? 'item-filter-box-overlay-show' : ''}`} onClick={() => { setFilterBox(!filterBox) }}>
                    </div>
                </div>
            </div>
            <div className="item-boxes-container d-flex flex-wrap">
                <div className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="item-box-image">
                        <img src="https://www.pohkong.com.my/cdn/shop/files/6729b0416c72d_1730785345.jpg?v=1730785368&width=254" alt="item.heading" className="item-image mb-4" />
                    </div>
                    <h5 className="text-center item-heading">999.9/24K BUNGA RAYA GOLD BAR (100G)</h5>
                    <p className="text-center item-content">Price: RM1000 ~ RM2000</p>
                    <p className="text-center item-content">Weight: 1 ~ 2</p>
                    <p className="text-center item-content">Width: 13 ~ 29</p>
                    <p className="text-center item-content">Gold Type: Silver</p>
                </div>
                <div className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="item-box-image">
                        <img src="https://www.pohkong.com.my/cdn/shop/files/6722eb87ed3d9_1730341768.jpg?v=1730341798&width=254" alt="item.heading" className="item-image mb-4" />
                    </div>
                    <h5 className="text-center item-heading">999.9/24K BUNGA RAYA GOLD BAR (100G)</h5>
                    <p className="text-center item-content">Price: RM1000 ~ RM2000</p>
                    <p className="text-center item-content">Weight: 1 ~ 2</p>
                    <p className="text-center item-content">Width: 13 ~ 29</p>
                    <p className="text-center item-content">Gold Type: Silver</p>
                </div>
                <div className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="item-box-image">
                        <img src="https://www.pohkong.com.my/cdn/shop/files/6722e986072c9_1730341254.jpg?v=1730341276&width=254" alt="item.heading" className="item-image mb-4" />
                    </div>
                    <h5 className="text-center item-heading">999.9/24K BUNGA RAYA GOLD BAR (100G)</h5>
                    <p className="text-center item-content">Price: RM1000 ~ RM2000</p>
                    <p className="text-center item-content">Weight: 1 ~ 2</p>
                    <p className="text-center item-content">Width: 13 ~ 29</p>
                    <p className="text-center item-content">Gold Type: Silver</p>
                </div>
                <div className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="item-box-image">
                        <img src="https://www.pohkong.com.my/cdn/shop/files/6722e77cb9c83_1730340732.jpg?v=1730340759&width=254" alt="item.heading" className="item-image mb-4" />
                    </div>
                    <h5 className="font-custom text-center item-heading">999.9/24K BUNGA RAYA GOLD BAR (100G)</h5>
                    <p className="text-center item-content">Price: RM1000 ~ RM2000</p>
                    <p className="text-center item-content">Weight: 1 ~ 2</p>
                    <p className="text-center item-content">Width: 13 ~ 29</p>
                    <p className="text-center item-content">Gold Type: Silver</p>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;//1 poh kong stock ui