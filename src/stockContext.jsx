import React, { createContext, useEffect, useState, useContext, useRef } from 'react';

// Create the context
const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
    // const [stocks, setStocks] = useState();
    const stocks = useRef();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchStocks = async () => {
        //     try {
        //         const response = await fetch('/api/stocks');
        //         if (!response.ok) {
        //             throw new Error('Failed to fetch stocks');
        //         }
        //         const data = await response.json();
        //         setStocks(data);
        //     } catch (err) {
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        const fetchStocks = () => {
            const boxesData = [
                {
                  category: "New Items",
                  items: [
                    {
                      id: 1,
                      heading: "Gold Beans",
                      imageUrl: "https://admin.kedaiemasion.my/assets/public/img/product_brand_icon/self_icon/thumb/RANTAI%20TANGAN%20EMAS.jpg?1730511340",
            
                      item: [
                        {
                          id: "A1",
                          heading: "POH KONG 916/22K Yellow Gold Butterfly Minimalist Mini Ring",//Patterns
                          type: "gold",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240501copy1.png?v=1729152828&width=180",
                          price: 190,// Means that RM670/g
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
                          type: "gold",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali2401cmyk.png?v=1729153204&width=180",
                          price: 200,
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
                      imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
            
                      item: [
                        {
                          id: "B1",
                          heading: "Item ABa",//Patterns
                          type: "bronze",
                          imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
                          price: 670,// Means that RM670/g
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
                },
                {
                  category: "Preloved Items",
                  items: [
                    {
                      id: 3,
                      heading: "Gold Necklace",
                      imageUrl: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
            
                      item: [
                        {
                          id: "B1",
                          heading: "GOLD BAR FULL MOON",//Patterns
                          type: "silver",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240501copy.png?v=1729152276&width=180",
                          price: 190,// Means that RM670/g
                          stock: [
                            {
                              stock_id: 1,
                              stockCode: "XCX2846X",
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
                              weight: 17,
                              measurement: 11,
                              actual_price: 209,
                              size: 17
                            },
                            {
                              stock_id: 2,
                              stockCode: "XCX2847X",
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
                              weight: 19,
                              measurement: 13,
                              actual_price: 190,
                              size: 15
                            },
                          ]
                        },
                        {
                          id: "B2",
                          heading: "PAMP 45TH ANNIVERSARY 5G",
                          type: "gold",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240201CMYK.png?v=1729153259&width=180",
                          price: 200,
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
                              weight: 21,
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
                              weight: 23,
                              measurement: 13,
                              actual_price: 200,
                              size: 15
                            },
                          ]
                        },
                      ]
                    },
                    {
                      id: 4,
                      heading: "Gold Bars",
                      imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
            
                      item: [
                        {
                          id: "B1",
                          heading: "Item ABa",//Patterns
                          type: "silver",
                          imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
                          price: 670,// Means that RM670/g
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
                              weight: 25,
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
                              weight: 27,
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
                              weight: 29,
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
                              weight: 31,
                              measurement: 13,
                              actual_price: 200,
                              size: 15
                            },
                          ]
                        },
                      ]
                    },
                  ]
                },
                {
                  category: null,
                  items: [
                    {
                      id: 5,
                      heading: "Group Item A",
                      imageUrl: "https://admin.kedaiemasmetroprima.com/assets/public/img/slide/mtxx_pic_1655260524745_mh1655261321603.jpg",
            
                      item: [
                        {
                          id: "C1",
                          heading: "POH KONG 999/24K Yellow Gold Flowery Lucky Cat Charm",//Patterns
                          type: "silver",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240303copy.png?v=1729153314&width=180",
                          price: 190,// Means that RM670/g
                          stock: [
                            {
                              stock_id: 1,
                              stockCode: "XCX2846X",
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
                              weight: 33,
                              measurement: 11,
                              actual_price: 209,
                              size: 17
                            },
                            {
                              stock_id: 2,
                              stockCode: "XCX2847X",
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
                              weight: 35,
                              measurement: 13,
                              actual_price: 190,
                              size: 15
                            },
                          ]
                        },
                        {
                          id: "C2",
                          heading: "POH KONG 999/24K Yellow Gold Miniature Gold Bar Pendant",
                          type: "gold",
                          imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Deepavali240403copy2.png?v=1729153117&width=180",
                          price: 200,
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
                              weight: 37,
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
                              weight: 39,
                              measurement: 13,
                              actual_price: 200,
                              size: 15
                            },
                          ]
                        },
                      ]
                    },
                    {
                      id: 6,
                      heading: "Group Item B",
                      imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
            
                      item: [
                        {
                          id: "B1",
                          heading: "Item ABa",//Patterns
                          type: "silver",
                          imageUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/Untitled-1.jpg",
                          price: 670,// Means that RM670/g
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
                              weight: 41,
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
                              weight: 43,
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
                              weight: 45,
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
                              weight: 47,
                              measurement: 13,
                              actual_price: 200,
                              size: 15
                            },
                          ]
                        },
                      ]
                    },
                  ]
                }
              ];
              stocks.current = boxesData;
        };
        fetchStocks();
    }, []);

    return (
        <StockContext.Provider value={{ stocks, loading, error }}>
            {children}
        </StockContext.Provider>
    );
};

// Custom hook for using the StockContext
export const useStock = () => {
    return useContext(StockContext);
};
