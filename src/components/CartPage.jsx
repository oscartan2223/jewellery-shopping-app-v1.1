import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/css/CartPage.css';
import { useStock } from '../stockContext';
import ThumbnailSlider from './thumbnailSlider/thumbnailSlider.jsx';
import { FaShoppingCart } from 'react-icons/fa';

const CartPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const populateData = useLocation().state;
    const { stocks } = useStock();

    useEffect(() => {
        if (populateData) {
            console.log(populateData);
        }
    })

    const data = {
        category: "New Items",
        items: [
            {
                id: 1,
                heading: "Gold Beans",
                imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240501copy1.png?v=1729152828&width=180",

                item: [
                    {
                        id: "A1",
                        heading: "POH KONG 916/22K Yellow Gold Butterfly Minimalist Mini Ring",//Patterns
                        type: "gold",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240501copy1.png?v=1729152828&width=180",
                        price: 190,// Means that RM670/g0
                        branchName: "Branch XYZ",
                        branchCode: "HFR15672D",
                        stock: [
                            {
                                stock_id: 1,
                                stockCode: "XCX2846X",
                                isCert: true,
                                isBox: false,
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
                                weight: 1,
                                measurement: 1,
                                actual_price: 1,
                                size: 17
                            },
                            {
                                stock_id: 2,
                                stockCode: "XCX2847X",
                                isCert: true,
                                isBox: false,
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
                                actual_price: 190,
                                size: 15
                            },
                            {
                                stock_id: 3,
                                stockCode: "XCX2848X",
                                isCert: true,
                                isBox: false,
                                imageUrl: [
                                    {
                                        original: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                                        thumbnail: "https://admin.kianleepd.com/assets/public/img/slide/IMG_20200821_093357.jpg",
                                    }
                                ],
                                weight: 26,
                                measurement: 12,
                                actual_price: 924,
                                size: 13
                            },
                            {
                                stock_id: 4,
                                stockCode: "XCX2849X",
                                isCert: true,
                                isBox: false,
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
                                weight: 32,
                                measurement: 38,
                                actual_price: 790,
                                size: 19
                            },
                            {
                                stock_id: 1,
                                stockCode: "XCX28410X",
                                isCert: true,
                                isBox: false,
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
                                weight: 31,
                                measurement: 45,
                                actual_price: 79,
                                size: 29
                            },
                            {
                                stock_id: 1,
                                stockCode: "XCX28411X",
                                isCert: true,
                                isBox: false,
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
                                weight: 11,
                                measurement: 44,
                                actual_price: 281,
                                size: 19
                            },
                        ]
                    },
                    {
                        id: "A2",
                        heading: "MODERN WARFARE 5G GOLD BAR",
                        type: "silver",
                        imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180",
                        price: 200,
                        branchName: "Branch ABC",
                        branchCode: "HFR15673D",
                        stock: [
                            {
                                stock_id: 1,
                                stockCode: "SRZ2846Z",
                                isCert: false,
                                isBox: true,
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
                                actual_price: 220,
                                size: 17
                            },
                            {
                                stock_id: 2,
                                stockCode: "SRZ2847Z",
                                isCert: false,
                                isBox: true,
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
                                weight: 7,
                                measurement: 13,
                                actual_price: 200,
                                size: 15
                            },
                        ]
                    },
                ]
            },
            {
                id: 2,
                heading: "Gold Bracelets",
                imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180",

                item: [
                    {
                        id: "B1",
                        heading: "Item ABa",//Patterns
                        type: "bronze",
                        imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
                        price: 670,// Means that RM670/g
                        branchName: "Branch ABC",
                        branchCode: "HFR15673D",
                        stock: [
                            {
                                stock_id: 1,
                                stockCode: "SRZ2846X",
                                isCert: true,
                                isBox: true,
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
                                weight: 9,
                                measurement: 11,
                                actual_price: 737,
                                size: 17
                            },
                            {
                                stock_id: 2,
                                stockCode: "SRZ2847X",
                                isCert: true,
                                isBox: true,
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
                                weight: 11,
                                measurement: 13,
                                actual_price: 670,
                                size: 15
                            },
                        ]
                    },
                    {
                        id: "B2",
                        heading: "Item ABb",
                        type: "gold",
                        imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
                        price: 200,
                        branchName: "Branch ABC",
                        branchCode: "HFR15673D",
                        stock: [
                            {
                                stock_id: 1,
                                stockCode: "SRZ2846Z",
                                isCert: true,
                                isBox: true,
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
                                weight: 13,
                                measurement: 11,
                                actual_price: 220,
                                size: 17
                            },
                            {
                                stock_id: 2,
                                stockCode: "SRZ2847Z",
                                isCert: true,
                                isBox: true,
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
                                weight: 15,
                                measurement: 13,
                                actual_price: 200,
                                size: 15
                            },
                        ]
                    },
                ]
            }
        ]
    };

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
                    {/* <pre>{JSON.stringify(populateData, null, 2)}</pre> */}
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
                                <button className="stock-item-cart-btn" onClick={() => handleAddToCart(populateData[0].heading, populateData[1])}>
                                    <i className="stock-item-cart-icon"><FaShoppingCart /></i>Add to Cart
                                </button>
                                <button className="stock-item-back-btn" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    No Cart Item.
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CartPage;