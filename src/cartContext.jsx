import React, { createContext, useContext, useRef, useState } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const cartList = useRef([]);
    const [cartDisplayList, setCartDisplayList] = useState([]);

    const addCart = async (cartItem) => {
        if (cartList.current.length < 5) {

            if (!cartList.current.includes(cartItem)) {
                cartList.current.push(cartItem);
                setCartDisplayList([...cartList.current]);
            } else {
                return "item exist";
            }

        } else {
            return "length exceed";
        }
        console.log("After add: ", cartList.current);
        return "success";
    }

    const removeCart = async (cartItem) => {
        const removeIndex = cartList.current.findIndex(item => item === cartItem);
        if (removeIndex !== -1) {
            cartList.current.splice(removeIndex, 1);
            setCartDisplayList([...cartList.current]);
        }
        console.log("After delete: ", cartList.current);
    }

    return (
        <CartContext.Provider value={{ cartList, cartDisplayList, addCart, removeCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};