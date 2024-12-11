import React, { useEffect } from "react";
import { useWish } from "../wishContext";
import { useCart } from "../cartContext";
import { FaTrash } from "react-icons/fa";
import '../assets/css/WishListPage.css';

const WishListPage = () => {
    const { wishDisplayList, wishList, removeWish } = useWish();
    const { addCart } = useCart();

    // useEffect(() => {
    //     if(wishList && wishList.length > 0) {
    //         removeWish(wishList[0]);
    //     }
    // })
    return (
        <div className="w-100">
            <h2 className="w-100 text-center fs-1 fw-bold font-custom mt-4 mb-4">My Wishlist</h2>
            {!wishDisplayList &&
                <div className="wishlist-boxes-container d-flex flex-wrap">
                    {wishDisplayList &&
                        wishDisplayList.map((eachWishItem, index) => (
                            <div key={index} className="wishlist-box-container col-xs-12 col-sm-6 col-md-3-replace col-xl-3 col-xxl-2-4">

                                <div className="wishlist-image-container">
                                    <img className="wishlist-image" src={eachWishItem.imageUrl[0].original} alt="image" />
                                </div>

                                <div className="wishlist-item-content-container">
                                    <h4 className="wishlist-item-heading font-custom">{eachWishItem.heading}</h4>
                                    <div className="wishlist-item-price-container">
                                        <h3 className={`wishlist-item-current-price font-custom-2 ${eachWishItem.promotion_price ? 'text-danger' : ''}`}>RM {eachWishItem.promotion_price ? eachWishItem.promotion_price : eachWishItem.actual_price}</h3>
                                        {eachWishItem.promotion_price &&
                                            <h3 className="wishlist-item-before-price font-custom-2 text-decoration-line-through blinking-text">RM {eachWishItem.actual_price}</h3>
                                        }
                                    </div>
                                </div>

                                <div className="wishlist-item-btn-container mb-3">
                                    <button className="wishlist-item-cart-btn">
                                        Add To Cart
                                    </button>
                                    <button className="wishlist-item-remove-btn">
                                        <FaTrash className="wishlist-item-remove-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            }
        </div>
    );
};

export default WishListPage;