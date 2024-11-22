import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useStock } from '../stockContext';
import { FaFilter, FaTimes } from 'react-icons/fa';
import '../assets/css/ItemPage.css';
import MultiRangeSlider from './multiRangeSlider/MultiRangeSlider.js';

const ItemPage = () => {
    const location = useLocation();
    const data = location.state;
    const { stocks } = useStock();
    const [stockList, setStockList] = useState();
    const [currentItemList, setCurrentItemList] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    const [filterBox, setFilterBox] = useState(false);
    const [searchList, setSearchList] = useState();
    const [filterSearchList, setFilterSearchList] = useState();
    const [typeList, setTypeList] = useState();
    const [initLoad, setInitLoad] = useState(true);
    const [checkedStates, setCheckedStates] = useState([]);
    const checkedRef = useRef([])

    const [minItemPrice, setMinItemPrice] = useState(0);
    const [maxItemPrice, setMaxItemPrice] = useState(99999);
    const [minItemMeasurement, setMinItemMeasurement] = useState(0);
    const [maxItemMeasurement, setMaxItemMeasurement] = useState(99999);
    const [minItemWeight, setMinItemWeight] = useState(0);
    const [maxItemWeight, setMaxItemWeight] = useState(99999);

    const [currentMinItemPrice, setCurrentMinItemPrice] = useState(0);
    const [currentMaxItemPrice, setCurrentMaxItemPrice] = useState(99999);
    const [currentMinItemMeasurement, setCurrentMinItemMeasurement] = useState(0);
    const [currentMaxItemMeasurement, setCurrentMaxItemMeasurement] = useState(99999);
    const [currentMinItemWeight, setCurrentMinItemWeight] = useState(0);
    const [currentMaxItemWeight, setCurrentMaxItemWeight] = useState(99999);

    const filterItem = useCallback((event, minItemPrice = currentMinItemPrice, maxItemPrice = currentMaxItemPrice,
        minItemWeight = currentMinItemMeasurement, maxItemWeight = currentMaxItemMeasurement,
        minItemMeasurement = currentMinItemMeasurement, maxItemMeasurement = currentMaxItemWeight) => {
        // if (event.key === 'Enter') {
        //     event.target.blur();
        // }

        // const query = event.target.value;
        // setItemQuery(query);

        // const lowerCaseQuery = query.toLowerCase();

        // const filteredSearch = searchList.filter(item =>
        //     item.heading.toLowerCase().includes(lowerCaseQuery) &&
        //     (latestType === "All" || item.type.toLowerCase() === latestType.toLowerCase())
        // );
        // setFilterSearchList(filteredSearch);

        // const filtered = content.item.filter(item =>
        //     item.heading.toLowerCase().includes(lowerCaseQuery) &&
        //     (latestType === "All" || item.type.toLowerCase() === latestType.toLowerCase())
        // );

        const filteredWithStock = currentItemList.item.map(item => {
            let matchedType = checkedRef.current[0] === true || checkedRef.current[typeList.indexOf(item.type)] === true;
            const stock = item.stock.filter(eachStock => {
                const inPriceRange = eachStock.actual_price >= minItemPrice && eachStock.actual_price <= maxItemPrice;
                const inWeightRange = eachStock.weight >= minItemWeight && eachStock.weight <= maxItemWeight;
                const inMeasurementRange = eachStock.measurement >= minItemMeasurement && eachStock.measurement <= maxItemMeasurement;
                const certCheck = document.getElementById('certCheck').checked ? eachStock.isCert === true : true;
                const boxCheck = document.getElementById('boxCheck').checked ? eachStock.isBox === true : true;

                return inPriceRange &&
                    inWeightRange &&
                    inMeasurementRange &&
                    certCheck &&
                    boxCheck &&
                    matchedType;
            });

            return { ...item, stock };
        });
        setFilteredItems({ /*...content, */item: filteredWithStock });
    }, [searchList, minItemPrice, maxItemPrice, minItemWeight, maxItemWeight, minItemMeasurement, maxItemMeasurement]);

    useEffect(() => {
        if (filterBox) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [filterBox]);

    useEffect(() => {
        if (stocks && stocks.current && data && data.categoryId) {
            let items = null;
            for (let eachGroup of stocks.current) {
                items = eachGroup.items.find(eachItem => {
                    return eachItem.id === data.categoryId;
                });
                if (items != null) break;
            };
            setCurrentItemList(items != null ? items : null);
            setFilteredItems(items != null ? items : null);
        }
    }, [stocks, data, setCurrentItemList, setFilteredItems]);

    const handleCheckboxChange = (index) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];

        if (index === 0) {
            const selectAll = newCheckedStates[0];
            newCheckedStates.fill(selectAll);
        } else {
            newCheckedStates[0] = newCheckedStates.slice(1).every(Boolean);
        }

        setCheckedStates(newCheckedStates);
        checkedRef.current = newCheckedStates;
    };

    const GetMinMax = (type, data) => {
        if (data.length === 0) {
            return type === "price" ? "No prices available" : type === "weight" ? "No weights available" :
                type === "measurement" ? "No measurements available" : type === "width" ? "No widths available" :
                    "Invalid type";
        }

        const initialValues = { min: Infinity, max: -Infinity };

        const { min, max } = data.reduce((acc, stock) => {
            const value = type === "price" ? stock.actual_price : type === "weight" ? stock.weight :
                type === "measurement" ? stock.measurement : type === "width" ? stock.size : null;

            if (value !== null) {
                if (value < acc.min) {
                    acc.min = value;
                }
                if (value > acc.max) {
                    acc.max = value;
                }
            }

            return acc;
        }, initialValues);

        if (min === Infinity) {
            return type === "price" ? "No prices available in this filter range." : type === "weight" ? "No weights available in this filter range." :
                type === "measurement" ? "No measurements available in this filter range." : type === "width" ? "No widths available in this filter range."
                    : null;
        }

        return type === "price" ? `RM${min}.00 ~ RM${max}.00` : type === "weight" ? `Weight: ${min}g ~ ${max}g` :
            type === "measurement" ? `Measurement: ${min} ~ ${max}` : type === "width" ? `Width: ${min} ~ ${max}` : null;
    };

    const updateItemMeasurement = (min, max) => {
        setMinItemMeasurement(min);
        setMaxItemMeasurement(max);
    };

    const updateItemPrice = (min, max) => {
        setMinItemPrice(min);
        setMaxItemPrice(max);
    };

    const updateItemWeight = (min, max) => {
        setMinItemWeight(min);
        setMaxItemWeight(max);
    };

    useEffect(() => {
        if (data && data.categoryId && stocks.current) {
            const stock_list = stocks.current.forEach(eachCategoryItem => {
                const stock_item = eachCategoryItem.items.forEach(eachItemStock => {
                    if (eachItemStock.id === data.categoryId) {
                        const search_list = eachItemStock.item.map(item => ({
                            heading: item.heading,
                            type: item.type,
                        }));
                        setSearchList(search_list);
                        setFilterSearchList(search_list);

                        const type_list = [...new Set(eachItemStock.item.map(item => item.type))];
                        setTypeList(["All", ...type_list]);
                        setCheckedStates(Array(["All", ...type_list].length).fill(true));
                        checkedRef.current = Array(["All", ...type_list].length).fill(true);
                    }
                });
            });
        }
    }, []);

    const capitalizeFirstLetter = (str) => {
        if (!str || str.length === 0) return str;
        const firstChar = str.charAt(0);
        if (/[a-zA-Z]/.test(firstChar)) {
            return firstChar.toUpperCase() + str.slice(1);
        }
        return str;
    };

    const handleApplyFilter = () => {
        setCurrentMinItemPrice(minItemPrice);
        setCurrentMaxItemPrice(maxItemPrice);
        setCurrentMinItemMeasurement(minItemMeasurement);
        setCurrentMaxItemMeasurement(maxItemMeasurement);
        setCurrentMinItemWeight(minItemWeight);
        setCurrentMaxItemWeight(maxItemWeight);
        filterItem({ target: { value: 'itemQuery' } }, minItemPrice, maxItemPrice, minItemMeasurement, maxItemMeasurement, minItemWeight, maxItemWeight);
        setFilterBox(!filterBox);
    };

    const toggleCheckbox = (id) => {
        const checkbox = document.getElementById(id);
        checkbox.checked = !checkbox.checked;
    }


    return (
        <div className="item-container">
            <h1 className="w-100 mb-4 text-center font-custom">{currentItemList ? currentItemList.heading : 'Undefined'}</h1>
            <div className="search-pattern">
                <input className="form-control" type="text" placeholder="Search" />
            </div>
            <div className="w-100 item-filter-container">
                <div className="item-filter">
                    <span className="item-filter-button" onClick={() => { if (data) { setFilterBox(!filterBox); setInitLoad(false); } }}>
                        <FaFilter className="item-filter-icon" />
                        <label>Show Filters</label>
                    </span>
                    <div className={`item-filter-box ${filterBox ? 'item-filter-box-show' : !initLoad ? 'item-filter-box-hide' : 'item-filter-box-hidden'}`}>
                        <button className="item-filter-btn" onClick={handleApplyFilter}>Apply</button>
                        <div className="item-filter-content-box">
                            <div className="item-filter-title font-custom fw-bold mb-4">
                                FILTERS
                                <button className="item-filter-close-btn" onClick={() => { setFilterBox(!filterBox) }}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="item-filter-content-container hide-scroll-container">
                                <div className="mb-3">
                                    <button className="w-100 font-custom-2 fw-bold text-start p-0">
                                        Types
                                    </button>
                                    <div className={`d-flex flex-column`}>
                                        {typeList && typeList.length > 0 ? (
                                            typeList.map((type, index) => (
                                                <span className="item-filter-text w-100 font-custom-2" key={index} onClick={() => handleCheckboxChange(index)}>
                                                    <input className="item-filter-checkbox" type="checkbox"
                                                        checked={checkedStates[index]} readOnly />
                                                    {capitalizeFirstLetter(type)}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="w-100 font-custom-2">No type available</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button className="w-100 font-custom-2 fw-bold text-start p-0">
                                        Advanced
                                    </button>
                                    <div className={`d-flex flex-column`}>
                                        <span className="item-filter-text w-100 font-custom-2" onClick={() => { toggleCheckbox('boxCheck') }}>
                                            <input className="item-filter-checkbox" type="checkbox" id="boxCheck" onClick={(e) => e.stopPropagation()} />
                                            With box only
                                        </span>
                                        <span className="item-filter-text w-100 font-custom-2" onClick={() => { toggleCheckbox('certCheck') }}>
                                            <input className="item-filter-checkbox" type="checkbox" id="certCheck" onClick={(e) => e.stopPropagation()} />
                                            Certificate only
                                        </span>
                                    </div>
                                </div>
                                {filterBox &&
                                    <div className="mt-5 d-flex flex-column w-100">
                                        <div className="item-slider-container">
                                            <label className="item-adjust-label font-custom-2">Price</label>
                                            <MultiRangeSlider
                                                min={0}
                                                max={99999}
                                                initialMinValue={currentMinItemPrice}
                                                initialMaxValue={currentMaxItemPrice}
                                                onChange={({ min, max }) => updateItemPrice(min, max)}
                                            />
                                        </div>
                                        <div className="item-slider-container">
                                            <label className="item-adjust-label font-custom-2">Measurement</label>
                                            <MultiRangeSlider
                                                min={0}
                                                max={99999}
                                                initialMinValue={currentMinItemMeasurement}
                                                initialMaxValue={currentMaxItemMeasurement}
                                                onChange={({ min, max }) => updateItemMeasurement(min, max)}
                                            />
                                        </div>
                                        <div className="item-slider-container">
                                            <label className="item-adjust-label font-custom-2">Weight</label>
                                            <MultiRangeSlider
                                                min={0}
                                                max={99999}
                                                initialMinValue={currentMinItemWeight}
                                                initialMaxValue={currentMaxItemWeight}
                                                onChange={({ min, max }) => updateItemWeight(min, max)}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`item-filter-box-overlay ${filterBox ? 'item-filter-box-overlay-show' : ''}`} onClick={() => { setFilterBox(!filterBox) }}>
                    </div>
                </div>
            </div>
            <div className="item-boxes-container d-flex flex-wrap">
                {filteredItems && filteredItems.item && filteredItems.item.length > 0 ? (
                    filteredItems.item.every(item => !item.stock || item.stock.length === 0) ? (
                        <div>No stock available for all items. <u className="fw-bold cursor" onClick={() => { window.location.reload(); }}>Clear Filter</u></div>
                    ) : (
                        filteredItems.item.map((item, index) =>
                            item.stock && item.stock.length > 0 && (
                                <div key={index} className="item-box-container col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-xxxl-2">
                                    <div className="item-box-image">
                                        <img src={item.imageUrl} alt={item.heading} className="item-image mb-4" />
                                    </div>
                                    <h5 className="text-center item-heading">{item.heading}</h5>
                                    <p className="text-center item-content">{GetMinMax("price", item.stock)}</p>
                                    <p className="text-center item-content">{GetMinMax("weight", item.stock)}</p>
                                    <p className="text-center item-content">{GetMinMax("measurement", item.stock)}</p>
                                    <p className="text-center item-content">{GetMinMax("width", item.stock)}</p>
                                    <p className="text-center item-content">Gold Type: {item.type}</p>
                                </div>
                            ))
                    )
                ) : (
                    <div className="fw-bold">No items available.</div>
                )}

            </div>

        </div>
    );
};

export default ItemPage;//1 poh kong stock ui