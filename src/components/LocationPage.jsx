import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../assets/css/LocationPage.css';

const LocationPage = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress]  = useState('');

    useEffect(() => {
        setShopName('Kedai Emas Ion')
    }, []);

    const openMaps = () => {
        window.open('https://maps.app.goo.gl/WjWq67GtCi214uqG7');
    };

    const openWaze = () => {
        const wazeUrl = 'waze://?ll=1.558621781185727,103.75850915908813'; // Waze app URL
        const webUrl = 'https://www.waze.com/en/live-map/directions?latlng=1.558621781185727,103.75850915908813'; // Web URL

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = wazeUrl;

        document.body.appendChild(iframe);
        setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(webUrl, '_blank');
        }, 2000);
    };

    return (
        <div className='location-container'>
            <div className="location-content">
                <div className="shop-details-container">
                    <div className="shop-title">
                    <FaMapMarkerAlt  className="adress-icon"/>
                    <div className="shop-name font-custom">
                        {shopName}
                    </div>
                    </div>
                    <div className="shop-detail">
                        <p className="shop-content font-custom-2">28-01, Jalan Pinang 42, Taman Daya, 81100 Johor Bahru, Johor, Malaysia</p>
                        <p className="shop-content font-custom-2">Phone: 019-6691017</p>
                        <p className="shop-content font-custom-2">Email: <a className="shop-content" href="mailto:info@kedaiemasion.my">info@kedaiemasion.my</a></p>
                        <p className="shop-content font-custom-2">Operating Hours: 10:30a.m. - 09:00p.m. (Monday to Sunday)</p>
                    </div>
                </div>

                <hr className="featurette-divider" />
                <h1 className="font-custom">Maps Directions</h1>
                <div className="iframe-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.342043381188!2d103.75591867382977!3d1.5586850984267484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6fe9a3e44043%3A0x95e80d8f93642389!2sKEDAI%20EMAS%20ION%20-%20Tingkat%201%20Taman%20Daya%2C%20JB!5e0!3m2!1sen!2smy!4v1728267699143!5m2!1sen!2smy"
                        title="Maps Directions"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen>
                    </iframe>
                    <div className="iframe-overlay" onClick={openMaps}></div>
                </div>
                <hr className="featurette-divider" />

                <h1 className="font-custom">Waze Directions</h1>
                <div className="iframe-container">
                    <iframe
                        src="https://embed.waze.com/iframe?zoom=16&lat=1.558685&lon=103.758494&ct=livemap&pin=1"
                        title="Waze Directions"
                        width="100%"
                        height="100%"
                        allowFullScreen>
                    </iframe>
                    <div className="iframe-overlay" onClick={openWaze}></div>
                </div>

                <hr className="featurette-divider" />
            </div>
        </div>
    );
};

export default LocationPage;