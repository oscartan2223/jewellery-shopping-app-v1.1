import React, { createContext, useContext, useState, useEffect } from "react";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
    const initialWishList = JSON.parse(sessionStorage.getItem("wishList")) || [];

    const [wishDisplayList, setWishDisplayList] = useState(initialWishList);

    useEffect(() => {
        sessionStorage.setItem("wishList", JSON.stringify(wishDisplayList));
    }, [wishDisplayList]);

    const addWish = (wishItem) => {
        if (!wishDisplayList.some(item => item.stockCode === wishItem.stockCode)) {
            const updatedWishList = [...wishDisplayList, wishItem];
            setWishDisplayList(updatedWishList);
        } else {
            return "item exist";
        }

        console.log("After add:", wishDisplayList);
        return "success";
    };

    const removeWish = async (wishItem) => {
        const wishListFromStorage = JSON.parse(sessionStorage.getItem("wishList"));

        if (wishListFromStorage) {
            const updatedWishList = wishListFromStorage.filter(item => item.stockCode !== wishItem.stockCode);
            if (updatedWishList.length !== wishListFromStorage.length) {
                setWishDisplayList(updatedWishList);
                sessionStorage.setItem("wishList", JSON.stringify(updatedWishList));
                console.log("After delete:", updatedWishList);
                return true;
            }
        }

        return false;
    };

    const wishList = JSON.parse(sessionStorage.getItem("wishList")) || [];

    return (
        <WishContext.Provider value={{ wishList, wishDisplayList, addWish, removeWish }}>
            {children}
        </WishContext.Provider>
    );
};

export const useWish = () => {
    return useContext(WishContext);
};