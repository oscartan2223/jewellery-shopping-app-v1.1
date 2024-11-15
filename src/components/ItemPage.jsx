import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStock } from '../stockContext';
import { FaFilter } from 'react-icons/fa';
import '../assets/css/ItemPage.css';

const ItemPage = () => {
    const location = useLocation();
    const data = location.state;
    const { stocks } = useStock();
    const [stockList, setStockList] = useState();
    const [currentItemList, setCurrentItemList] = useState([]);
    
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
                    <span className="item-filter-button">
                        <FaFilter className="item-filter-icon" />
                        <label>Show Filters</label>
                    </span>
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