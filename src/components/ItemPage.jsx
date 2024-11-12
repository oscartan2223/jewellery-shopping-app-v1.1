import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ItemPage = ({ }) => {
    const location = useLocation();
    const data = location.state;
    
    useEffect(() => {
        if (data) {
            console.log(data);  // Log the data if it's passed via navigate
        } else {
            console.log('No data passed.');
        }
    }, [])

    return (
        <div>1 item</div>
    );
};

export default ItemPage;//1 poh kong stock ui