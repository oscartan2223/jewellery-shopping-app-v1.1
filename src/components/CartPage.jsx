import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const { populateData } = useLocation(); // get the data and direct populate out here

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

    const handleAddCart = () => {
        // call the cartContext to add the item into cart list(temporary)
        // do showAlert to prompt status
        // 
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
                <div className="">

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