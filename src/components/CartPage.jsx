import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();
    const { populateData } = useLocation();

    const handleAddCart = () => {
        // call the cartContext to add the item into cart list(temporary)
        // do showAlert to prompt status
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
                </div>
            )}
        </div>
    );
};

export default CartPage;