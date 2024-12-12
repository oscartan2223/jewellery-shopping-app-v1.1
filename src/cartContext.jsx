import React, { createContext, useContext, useState, useEffect } from "react";
import { useWish } from "./wishContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cartList from sessionStorage, or an empty array if not available
  const initialCartList = JSON.parse(sessionStorage.getItem("cartList")) || [];
  const { removeWish } = useWish();
  const [cartDisplayList, setCartDisplayList] = useState(initialCartList);

  useEffect(() => {
    sessionStorage.setItem("cartList", JSON.stringify(cartDisplayList));
  }, [cartDisplayList]);

  const addCart = (cartItem) => {
    if (cartDisplayList.length < 5) {
      if (!cartDisplayList.some(item => item.stockCode === cartItem.stockCode)) {
        const updatedCartList = [...cartDisplayList, cartItem];
        setCartDisplayList(updatedCartList);

        const wishListFromStorage = JSON.parse(sessionStorage.getItem("wishList"));
        if (wishListFromStorage && wishListFromStorage.some(item => item.stockCode === cartItem.stockCode)){
          removeWish(cartItem);
        }
      } else {
        return "item exist";
      }
    } else {
      return "length exceed";
    }
    return "success";
  };

  const getCart = (cartItem) => !cartDisplayList.some(item => item.stockCode === cartItem.stockCode); // true is non-exist, false is exist


  const removeCart = async (cartItem) => {
    const cartListFromStorage = JSON.parse(sessionStorage.getItem("cartList"));

    if (cartListFromStorage) {
      const updatedCartList = cartListFromStorage.filter(item => item.stockCode !== cartItem.stockCode);
      if (updatedCartList.length !== cartListFromStorage.length) {
        setCartDisplayList(updatedCartList);
        sessionStorage.setItem("cartList", JSON.stringify(updatedCartList));
        return true;
      }
    }

    return false;
  };

  const addRemark = async (stockCode, remarkType, remarkContent) => {
    const cartListFromStorage = JSON.parse(sessionStorage.getItem("cartList"));

    if (cartListFromStorage) {
      const updatedCartList = cartListFromStorage.map(item => {
        if (item.stockCode === stockCode) {
          item[remarkType] = remarkContent;
        }
        return item;
      });

      setCartDisplayList(updatedCartList);
      sessionStorage.setItem("cartList", JSON.stringify(updatedCartList));
    };
  };

  const cartList = JSON.parse(sessionStorage.getItem("cartList")) || [];

  return (
    <CartContext.Provider value={{ cartList, cartDisplayList, addCart, getCart, removeCart, addRemark }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
