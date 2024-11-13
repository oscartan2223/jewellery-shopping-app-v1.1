import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStock } from '../stockContext';
import { FaFilter } from 'react-icons/fa';
import '../assets/css/ItemPage.css';

const ItemPage = ({ }) => {
    const location = useLocation();
    const data = location.state;
    const { stocks } = useStock();
    
    useEffect(() => {
        if (data) {
            console.log(data);  // Log the data if it's passed via navigate
        } else {
            console.log('No data passed.');
        }
    }, [])

    return (
        <div className="item-container">
            <h1 className="w-100 mb-4 text-center font-custom">Category Name</h1>
            <div className="item-filter-container">
                <div className="item-filter-button">
                    <button className="">
                        Show Filters
                    </button>
                </div>
            </div>
            <div className="item-boxes-container">
                <div className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3">
                    <div className="item-box-image">
                        
                    </div>
                    <h5 className="font-custom">999.9/24K BUNGA RAYA GOLD BAR(100G)</h5>
                    <p className="font-custom">Price: RM1000 ~ RM2000</p>
                    <p className="font-custom">Weight: 1 ~ 2</p>
                    <p className="font-custom">Width: 13 ~ 29</p>
                    <p className="font-custom">Gold Type: Silver</p>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;//1 poh kong stock ui