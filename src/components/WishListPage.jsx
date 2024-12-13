import React, { useEffect } from "react";
import { useWish } from "../wishContext";
import { useCart } from "../cartContext";
import { FaTrash } from "react-icons/fa";
import '../assets/css/WishListPage.css';
import { useNavigate } from "react-router-dom";

const WishListPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const { wishDisplayList, wishList, removeWish } = useWish();
    const { addCart } = useCart();

    const naviCart = (data) => {
        setTimeout(() => {
            navigate('/cart', { state: data });
        }, 200)
        window.scrollTo(0, 0);
    };

    const handleAddToCart = async (stockItem) => {
        const status = await addCart(stockItem);
        if (status === "success") {
            showAlert('success', 'Item has added into cart!');
            removeWish(stockItem);
        } else if (status === "item exist") {
            showAlert('error', 'Item already existed in cart!');
        } else if (status === "length exceed") {
            showAlert('warning', 'Cart item cannot more than 5!');
        }
    };

    const deleteWishItem = async (stockItem) => {
        const status = await removeWish(stockItem);
        if (status) {
            showAlert('success', 'Item has removed from wishlist!');
        } else {
            showAlert('error', 'An unexpected error occurred while deleting. If the issue persists, please contact the admin.');
        }
    }

    return (
        <div className="w-100 d-flex flex-column">
            <h2 className="w-100 text-center fs-1 fw-bold font-custom mt-4 mb-4">My Wishlist</h2>
            {wishDisplayList &&
                wishDisplayList.length > 0 ? (
                    <div className="wishlist-boxes-container d-flex flex-wrap">
                        {wishDisplayList.map((eachWishItem, index) => (
                            <div key={index} className="wishlist-box-container col-xs-12 col-sm-6 col-md-3-replace col-xl-3 col-xxl-2-4"
                                onClick={() => { naviCart([eachWishItem.heading, eachWishItem.type, eachWishItem]); }}>

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
                                    <button className="wishlist-item-cart-btn" onClick={(e) => { e.stopPropagation(); handleAddToCart(eachWishItem); }}>
                                        Add To Cart
                                    </button>
                                    <button className="wishlist-item-remove-btn" onClick={(e) => { e.stopPropagation(); deleteWishItem(eachWishItem); }}>
                                        <FaTrash className="wishlist-item-remove-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-100 all-center mt-4 mb-4 fw-bold">
                        No item added into wishlist yet.
                    </div>
                )
            }
        </div>
    );
};

export default WishListPage;