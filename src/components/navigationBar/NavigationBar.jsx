import React, { useState } from "react";
import './NavigationBar.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { MdHistory } from 'react-icons/md';
import { FaHome, FaFileAlt, FaTruck, FaKey } from 'react-icons/fa';

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState();

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`navigate-bar-container-overlay ${!isOpen ? 'hide' : ''}`} onClick={() => { handleClick(); }}/>

            <div className={`navigate-bar-container ${isOpen ? 'open' : ''}`}>
                <div className={isOpen ? 'navigate-bar-content-container' : 'hide'}>
                    <label className="fs-7 fw-bold mb-2">General</label>

                    <div className="navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2">
                        <FaHome className="navigate-bar-icon mr-3"/>
                        Home
                        <ExpandMoreIcon />
                        <ExpandLessIcon />
                    </div>

                    <div className="navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2">
                        <MdHistory className="navigate-bar-icon mr-3"/>
                        Order History
                    </div>

                    <div className="navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2">
                        <FaFileAlt className="navigate-bar-icon mr-3"/>
                        Installment History
                    </div>

                    <div className="navigate-bar-content fw-bold fs-6 all-center justify-content-start p-2">
                        <FaTruck className="navigate-bar-icon mr-3"/>
                        Order Tracking
                    </div>
                </div>
                
            </div>
            <button className={`navigate-bar-button ${isOpen ? 'open' : ''}`} onClick={handleClick} title={isOpen ? 'Close Menu' : 'Open Menu'}>
                <ChevronLeftIcon className={isRotated ? 'rotated' : ''} />
            </button>

        </>
    );
};

export default NavigationBar;