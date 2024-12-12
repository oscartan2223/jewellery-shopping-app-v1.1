import React, { useState, useEffect, useRef } from "react";
import '../assets/css/PromotionPage.css';
import { useCart } from "../cartContext";
import { useWish } from "../wishContext";

const PromotionPage = ({ showAlert }) => {
    const { addCart, getCart } = useCart();
    const { addWish } = useWish();
    const [promotionStock, setPromotionStock] = useState();
    const [showDetails, setShowDetails] = useState({});
    const [showSelectDialog, setShowSelectDialog] = useState(false);
    const selectedItem = useRef();

    useEffect(() => {
        setPromotionStock([
            {
                heading: "Item AAa",
                stock_id: 2,
                stockCode: "XCX2847X",
                isCert: true,
                isBox: false,
                branchName: "Branch BCD",
                branchCode: "VVV15673D",
                imageUrl: [
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    }
                ],
                weight: 3,
                measurement: 50,
                type: "gold",
                actual_price: 190,
                promotion_price: 120,
                size: 15
            },
            {
                heading: "Item AAb",
                stock_id: 3,
                stockCode: "XCX2848X",
                isCert: true,
                isBox: false,
                branchName: "Branch BCD",
                branchCode: "VVV15673D",
                imageUrl: [
                    {
                      original: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                      thumbnail: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    }
                ],
                weight: 26,
                measurement: 12,
                type: "gold",
                actual_price: 924,
                promotion_price: 620,
                size: 13
            },
            {
                heading: "Modern Gold Bar",
                stock_id: 1,
                stockCode: "SRZ2846Z",
                isCert: false,
                isBox: true,
                branchName: "Branch BCD",
                branchCode: "VVV15673D",
                imageUrl: [
                    {
                      original: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                      thumbnail: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    }
                ],
                weight: 5,
                measurement: 11,
                type: "gold",
                actual_price: 220,
                promotion_price: 20,
                size: 17
            },
            {
                heading: "Silver Bar Full Moon",
                stock_id: 1,
                stockCode: "XCX2846X",
                isCert: true,
                isBox: true,
                branchName: "Branch BCD",
                branchCode: "VVV15673D",
                imageUrl: [
                    {
                      original: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                      thumbnail: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    },
                    {
                      original: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                      thumbnail: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    },
                    {
                      original: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                      thumbnail: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200822_133822.jpg",
                    },
                    {
                      original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                      thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                    }
                ],
                weight: 17,
                measurement: 11,
                type: "silver",
                actual_price: 209,
                promotion_price: 120,
                size: 17
            },
        ])

    }, []);

    const toggleDetails = (stockCode) => {
        setShowDetails(prev => ({
            ...prev,
            [stockCode]: !prev[stockCode]
        }));
    };

    const handleAddToCart = async () => {
        const status = await addCart(selectedItem.current);
        if (status === "success") {
            showAlert('success', 'Item has added into cart!');
            setShowSelectDialog(!showSelectDialog);
        } else if (status === "item exist") {
            showAlert('error', 'Item already existed in cart!');
        } else if (status === "length exceed") {
            showAlert('warning', 'Cart item cannot more than 5!');
        }
    };

    const handleAddToWish = async () => {
        if (getCart(selectedItem.current)){
            const status = await addWish(selectedItem.current);
            if (status === "success") {
                showAlert('success', 'Item has added into wishlist!');
                setShowSelectDialog(!showSelectDialog);
            } else if (status === "item exist") {
                showAlert('error', 'Item already existed in wishlist!');
            }
        } else {
            showAlert('warning', 'Wishlist can only add item that are not already in the Cart!');
        }
    };

    const handleAddItem = (item) => {
        selectedItem.current = item;
        setShowSelectDialog(!showSelectDialog);
    }

    return (
        <div className="py-5 promotion-content-container">
            {showSelectDialog &&
                <div className="promotion-select-dialog-overlay" onClick={() => {setShowSelectDialog(false);}}>
                    <div className="promotion-select-dialog" onClick={(e) => {e.stopPropagation();}}>
                        <h4 className="w-100 text-center fw-bold mb-3">Where to add?</h4>
                        <button className="stock-item-cart-btn" onClick={() => handleAddToCart()}>
                            Add to Cart
                        </button>
                        <button className="stock-item-wish-btn" onClick={() => handleAddToWish()}>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            }
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {promotionStock && promotionStock.map((item, index) => (
                        <div className="col mb-5 promotion-container" key={`${item.stock_id}-${index}`}>
                            {showDetails[item.stockCode] && (
                                <div className="promotion-info-container">
                                    <div className="promotion-info">
                                        <div className="promotion-info-heading">
                                            <h2 className="text-center font-custom-2">{`${item.heading} [${item.stockCode}]`}</h2>
                                        </div>
                                        <div className="promotion-info-type">
                                            <h3 className="font-custom-2">Type: {/^[a-zA-Z]/.test(item.type) ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : item.type}</h3>
                                        </div>
                                        <div className="promotion-info-content">
                                            <p className="font-custom-2">Measurement: {item.measurement}</p>
                                            <p className="font-custom-2">Weight: {item.weight}</p>
                                            <p className="font-custom-2">Size: {item.size}</p>
                                        </div>
                                        <div className="promotion-details" style={{ width: '80%' }}>
                                            <span onClick={() => toggleDetails(item.stockCode)}>Collapse Details</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="card h-100">
                                <img className="card-img-top" src={item.imageUrl[0].original} alt={item.heading} />
                                <div className="card-body p-4">
                                    <div className={`text-center auto-promotion-align`}>
                                        <h5 className="fw-bolder">{item.heading}</h5>
                                        <span className="text-muted text-decoration-line-through blinking-text">RM{item.actual_price.toFixed(2)}&nbsp;</span>
                                        <span className="size-changing">RM{item.promotion_price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="card-footer p-5 pt-0 pr-0 pl-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <button className="btn btn-outline-dark mt-auto fw-bolder" onClick={() => handleAddItem(item)}>Add Item</button>
                                    </div>
                                </div>
                                <div className="promotion-details">
                                    <span onClick={() => toggleDetails(item.stockCode)}>View Details</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotionPage;