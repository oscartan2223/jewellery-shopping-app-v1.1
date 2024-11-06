import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/SideBar.css';
import { FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import { useAuth } from '../authContext';
import { useStock } from '../stockContext'
import { useNavigate } from 'react-router-dom';

const SideBar = ({ value = "", onClose, SearchInput, searchInputValue='' }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { stocks, loading, error } = useStock();
    const [closeAmination, setCloseAnimation] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [popularCategories, setPopularCategories] = useState([])

    useEffect(() => {
        // api (fetch to get popular catagories)
        const fetchedData = ['Pendants & Charms', 'Rings', 'Couple Rings', 'Bar & Notes', 'Earrings', 'Bracelet', 'Bangle', 'Necklace']
        setSearchInput(searchInputValue);
        setPopularCategories(fetchedData);
        console.log(stocks);
    }, []);

    const handleClose = () => {
        setCloseAnimation(!closeAmination);
        setTimeout(() => {
            onClose();
        }, 500)
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            handleClose();
        }
    };

    return (
        <div className="sidebar-overlay">
            <div className="sidebar-content" onClick={handleClose}>
                {value === "menu" &&
                    <div className={`sidebar-menu-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>
                        <div className="sidebar-menu-list-content">
                            <button className="sidebar-menu-close-btn" onClick={handleClose}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                }

                {value === "search" &&
                    <div className={`sidebar-search-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>
                        <div className="sidebar-search-list-content">
                            <div className="sidebar-search-input-container">
                                <input className="sidebar-search-input" placeholder="Search" value={searchInput} onKeyDown={handleSearch} onChange={(event) => {setSearchInput(event.target.value.trim()); SearchInput(event.target.value.trim())}} />
                                <FaSearch className="sidebar-search-icon-btn" />
                                <button className="sidebar-search-clear-btn" onClick={() => { setSearchInput('') }}><FaTrash className="sidebar-search-clear-icon" title="Clear All" /></button>
                                <FaTimes className="sidebar-search-close-btn" onClick={handleClose} />
                            </div>
                            {searchInput === '' && popularCategories.length > 0 && (
                                <div className="sidebar-search-result-container">
                                    <div className="sidebar-search-title">
                                        <strong>Popular Searchs</strong>
                                    </div>
                                    {popularCategories.map((item, index) => (
                                        <div className="sidebar-search-result" key={index}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                }

                {value === "cart" &&
                    <div className={`sidebar-cart-list ${closeAmination ? "close" : ""}`} onClick={(event) => event.stopPropagation()}>
                        <div className="sidebar-cart-list-content">
                            <button className="sidebar-cart-close-btn" onClick={handleClose}>
                                <FaTimes className="sidebar-close-icon" />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SideBar;