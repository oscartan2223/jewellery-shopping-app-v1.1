import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Footer.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import InstallmentPage from './InstallmentPage';

const Footer = ({ setOpenInstallment }) => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const openFacebookPage = () => {
        const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61558712566100';
        window.open(facebookPageUrl, '_blank');
    };

    const openInstagramPage = () => {
        const instagramPageUrl = 'https://www.instagram.com/kedai.emasion/';
        window.open(instagramPageUrl, '_blank');
    }

    const openTiktokPage = () => {
        const tiktokPageUrl = 'https://www.tiktok.com/@kedaiemasion11';
        window.open(tiktokPageUrl, '_blank');
    }

    const openYoutubePage = () => {
        const youtubePageUrl = 'https://www.youtube.com/@kedaiemasion5979';
        window.open(youtubePageUrl, '_blank');
    }

    const handleNavigate = (target) => {
        if (!isLoggedIn && target === 'profile') { target = "login"; };
        setTimeout(() => {
            navigate(target);
        }, 200)
        window.scrollTo(0, 0);
    };

    return (
        <div className="footer-container">
            <div className="footer-menu-list">
                <div className="footer-menu">
                    <div className="footer-icon">
                        <img src="https://kedaiemasion.my/assets/png-ion.png" alt="logo" width="200px" height="100px" onClick={() => { window.scrollTo({ top: 0 }); }} />
                    </div>
                </div>
                <div className="footer-menu">
                    <h2 className="font-custom select-none">Our Service</h2>
                    <p className="font-custom select-none" onClick={() => { handleNavigate('contact') }}>Contact</p>
                    <p className="font-custom select-none" onClick={() => { handleNavigate('tac') }}>Term & Conditions</p>
                    <p className="font-custom select-none" onClick={() => { handleNavigate('faq') }}>FAQ</p>
                    <p className="font-custom select-none" onClick={() => { handleNavigate('location') }}>Find Us</p>
                </div>

                <div className="footer-menu">
                    <h2 className="font-custom select-none">My Account</h2>
                    <p className="font-custom select-none" onClick={() => { handleNavigate('profile') }}>{isLoggedIn ? 'Profile' : 'Login'}</p>
                    {isLoggedIn && <p className="font-custom select-none" onClick={() => { logout(); navigate('/'); }}>Logout</p>}
                    {isLoggedIn && <p className="font-custom select-none" onClick={() => { handleNavigate('order') }}>My Order</p>}
                    {isLoggedIn && <p className="font-custom select-none" onClick={() =>  setOpenInstallment(true) }>Installment</p>}
                </div>
            </div>
            <div className="footer-social-container">
                <div className="footer-block icons">
                    <div className="block-icon">
                        <img
                            src="/facebook.svg"
                            alt="Facebook"
                            className="media-icon"
                            onClick={openFacebookPage}
                        />
                    </div>
                    <div className="block-icon">
                        <img
                            src="/instagram.svg"
                            alt="Instagram"
                            className="media-icon"
                            onClick={openInstagramPage}
                        />
                    </div>
                    <div className="block-icon">
                        <img
                            src="/tiktok.svg"
                            alt="Tiktok"
                            className="media-icon"
                            onClick={openTiktokPage}
                        />
                    </div>
                    <div className="block-icon">
                        <img
                            src="/youtube.svg"
                            alt="Youtube"
                            className="media-icon"
                            onClick={openYoutubePage}
                        />
                    </div>
                </div>

                <label className="company-no fw-bold select-none">Copyright ©️ 2008-2024 & Kedai Emas Ion (586139-K) </label>
            </div>
        </div>
    );
};

export default Footer;