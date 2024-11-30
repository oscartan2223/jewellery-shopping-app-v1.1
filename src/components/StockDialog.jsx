import React, { useState } from 'react';
import '../assets/css/StockDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StockDialog = ({ stocks = undefined, onSelect, onClose }) => {
    const navigate = useNavigate();
    const [stockFurther, setStockFurther] = useState(false);
    const [dialogStocks, setDialogStocks] = useState([]);
    const [currentStock, setCurrentStock] = useState(undefined);

    const handleStockClick = (stockId, stockCode = null) => {
        const similarStocks = stocks.stock.filter(item => item.stock_id === stockId);

        if (similarStocks.length > 1) {
            setDialogStocks(similarStocks);
            setStockFurther(true);
        } else {
            const stockToSet = stockCode ? similarStocks.find(item => item.stockCode === stockCode) : similarStocks[0];

            if (stockToSet) {
                naviCart([stocks.heading, stockToSet]);
            }
        }
    };

    const naviCart = (data) => {
        setTimeout(() => {
          navigate('/cart', { state: data });
        }, 200)
        window.scrollTo(0, 0);
      }

    const groupStocksById = (stocks) => {
        return stocks.reduce((acc, stock) => {
            const existing = acc.find(item => item.stock_id === stock.stock_id);

            if (existing) {
                existing.count += 1;
                existing.minWeight = Math.min(existing.minWeight, stock.weight);
                existing.maxWeight = Math.max(existing.maxWeight, stock.weight);
                existing.minMeasurement = Math.min(existing.minMeasurement, stock.measurement);
                existing.maxMeasurement = Math.max(existing.maxMeasurement, stock.measurement);
                existing.minPrice = Math.min(existing.minPrice, stock.actual_price);
                existing.maxPrice = Math.max(existing.maxPrice, stock.actual_price);
                existing.minSize = Math.min(existing.minSize, stock.size);
                existing.maxSize = Math.max(existing.maxSize, stock.size);
            } else {
                acc.push({
                    ...stock,
                    count: 1,
                    minWeight: stock.weight,
                    maxWeight: stock.weight,
                    minMeasurement: stock.measurement,
                    maxMeasurement: stock.measurement,
                    minPrice: stock.actual_price,
                    maxPrice: stock.actual_price,
                    minSize: stock.size,
                    maxSize: stock.size,
                });
            }

            return acc;
        }, []);
    };

    const handleStockSelect = (selectedStock) => {
        naviCart([stocks.heading, selectedStock])
    };

    const groupedStocks = stocks ? groupStocksById(stocks.stock) : [];

    return (
        <div className="stock-select-dialog" onClick={onClose}>
            <div className="stock-select-dialog-content" onClick={(e) => { e.stopPropagation(); }}>

                <div className={stockFurther ? 'hide' : 'stock-select-first'}>
                    <div className="dialog-header list">
                        <div className="dialog-header-content">
                            <div className="selection-item-heading">
                                <h2 className="item-list-heading" title={stocks.heading || undefined}>{stocks.heading ? stocks.heading : ''}</h2>
                            </div>
                            <span className="close-btn" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                    </div>

                    <div className="dialog-body-content hide-scroll-container">
                        {groupedStocks.map((stockItem, index) => (
                            <div className={`dialog-body-container ${index % 2 === 0 ? 'even' : ''}`} key={`${stockItem.stock_id}-${index}`} onClick={() => handleStockClick(stockItem.stock_id, stockItem.count > 1 ? null : stockItem.stockCode)}>
                                <div className="dialog-body-image-container">
                                    <img className="dialog-body-image" src={stockItem.imageUrl[0]?.original} alt={`Stock ${stockItem.stockCode}`} />
                                </div>
                                <div className="dialog-body-description">
                                    <h4 className="dialog-body-heading">{stockItem.stockCode}</h4>
                                    <p className="dialog-body-text">Weight: {stockItem.count > 1 ? `${stockItem.minWeight}g ~ ${stockItem.maxWeight}g` : `${stockItem.weight}g`}</p>
                                    <p className="dialog-body-text">Measurement: {stockItem.count > 1 ? `${stockItem.minMeasurement}cm ~ ${stockItem.maxMeasurement}cm` : `${stockItem.measurement}cm`}</p>
                                    <p className="dialog-body-text">Actual Price: {stockItem.count > 1 ? `RM ${stockItem.minPrice} ~ RM ${stockItem.maxPrice}` : `RM ${stockItem.actual_price}`}</p>
                                    <p className="dialog-body-text">Size: {stockItem.count > 1 ? `${stockItem.minSize}cm ~ ${stockItem.maxSize}cm` : `${stockItem.size}cm`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={!stockFurther ? 'hide' : 'stock-select-second'}>
                    <div className="dialog-header list">
                        <div className="dialog-header-content">
                            <span className="back-btn" onClick={() => {setStockFurther(!stockFurther)}}>
                                <FaArrowLeft />
                            </span>
                            <div className="selection-item-heading">
                                <h2 className="item-list-heading">Item List</h2>
                            </div>
                            <span className="close-btn" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                    </div>
                    <div className="dialog-list-container hide-scroll-container">
                        {dialogStocks.map((stock, index) => (
                            <div className="dialog-list" key={index}>
                                <div onClick={() => handleStockSelect(stock)}>
                                    <div className="list-image-container">
                                        <img className="stock-image item" src={stock.imageUrl[0]?.original} alt={`Stock ${stock.stockCode}`} />
                                    </div>
                                    <div className="list-text-container">
                                        <h4 className="list-item fw-bold">{`${stocks.heading} ${stock.stockCode}`}</h4>
                                        <p className="list-item text-danger fw-bold">RM{stock.actual_price}</p>
                                        <p className="list-item fw-bold">{stock.weight}g</p>
                                        <p className="list-item fw-bold">{stock.measurement}mm</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDialog;
