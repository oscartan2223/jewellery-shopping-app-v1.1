import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import AlertMessage from './components/alertMessage/alertMessage';
import { AuthProvider, useAuth } from './authContext';
import { StockProvider } from './stockContext';
import { CartProvider } from './cartContext';
import { WishProvider } from './wishContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LocationPage from './components/LocationPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProfilePage from './components/ProfilePage';
import ItemPage from './components/ItemPage';
import CartPage from './components/CartPage';
import PromotionPage from './components/PromotionPage';
import LiveChat from './components/livechat/LiveChat';
import 'boxicons/css/boxicons.min.css';
import WishListPage from './components/WishListPage';
import InstallmentPage from './components/InstallmentPage';
import ChangePasswordPage from './components/ChangePassword';
import DashboardPage from './components/DashboardPage';

const App = () => {
  return (
    <StockProvider>
      <WishProvider>
        <CartProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </CartProvider>
      </WishProvider>
    </StockProvider>
  );
};

const AppContent = () => {
  const { userInformation } = useAuth();
  const location = useLocation();

  const noHeaderSidebarFooterPaths = ['/profile', '/password', '/dashboard'];
  const shouldRenderHeaderSidebarFooter = !noHeaderSidebarFooterPaths.includes(location.pathname);

  const [handleOpen, setHandleOpen] = useState('');

  // State to manage alert message
  const [alert, setAlert] = useState({ type: '', content: '', duration: 2 });
  const [isVisible, setIsVisible] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [onChatSettings, setOnChatSettings] = useState(true); // useeffect fetch from backend where setting is on or off
  const [openChat, setOpenChat] = useState(false);

  const [openInstallment, setOpenInstallment] = useState(false);

  const containerStyle = {
    minWidth: '100vw',
    minHeight: 'calc(100vh - 56px)',
    position: 'relative',
    overflow: handleOpen !== '' ? 'hidden' : 'auto',
  };
  const contentStyle = {
    minWidth: '100%',
    overflow: handleOpen !== '' ? 'hidden' : 'auto',
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  // Function to show the alert message
  const showAlert = (type, content, duration) => {
    setAlert({ type, content, duration: duration || 1.2 });
    setIsVisible(true);
  };

  // Function to handle alert close
  const handleCloseAlert = () => {
    setIsVisible(false);
    setAlert({ type: '', content: '', duration: 1.2 });
  };

  const handleAction = (type) => {
    setHandleOpen(type);
  };

  const closeSideBar = () => {
    setHandleOpen('');
  };

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };

  const detectMobileOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/i.test(userAgent)) {
      return true;
    }

    return false;
  };

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (window.innerWidth <= 800) {
      if (detectMobileOS()) {
        (element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen
          || element.msRequestFullscreen)?.call(element);
      } else {
        console.log('Fullscreen only allowed on Android or iOS with screen width <= 800px');
      }
    } else {
      console.log('Fullscreen not allowed on desktop/laptop');
    }
  };

  return (
    <div className="hide-scroll-container" onClick={enterFullscreen}>
      {isVisible && (
        <AlertMessage
          alert={alert.type}
          content={alert.content}
          duration={alert.duration}
          onClose={handleCloseAlert}
        />
      )}

      {openInstallment &&
        <InstallmentPage onClose={() => { setOpenInstallment(!openInstallment) }} />
      }

      <div className='hide-scroll-container'>
        <Header action={handleAction} />
        {handleOpen !== '' &&
          <SideBar value={handleOpen} onClose={closeSideBar} SearchInput={handleSearchInput} searchInputValue={searchInput} showAlert={showAlert} />
        }
      </div>

      <main className="hide-scroll-container" style={shouldRenderHeaderSidebarFooter ? containerStyle : {}}>
        <div className={`hide-scroll-container ${shouldRenderHeaderSidebarFooter ? "content-container" : "nofooter-content-container"}`} style={shouldRenderHeaderSidebarFooter ? contentStyle : {}}>
          <Routes>
            <Route path="/" element={<HomePage showAlert={showAlert} />} />
            <Route path="/login" element={<LoginPage showAlert={showAlert} />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage showAlert={showAlert} />} />
            <Route path="/register" element={<RegisterPage showAlert={showAlert} />} />
            <Route path="/forgot" element={<ForgotPasswordPage showAlert={showAlert} />} />
            <Route path="/profile" element={<ProfilePage showAlert={showAlert} />} />
            <Route path="/item" element={<ItemPage showAlert={showAlert} />} />
            <Route path="/cart" element={<CartPage showAlert={showAlert} openCart={() => { setHandleOpen('cart') }} />} />
            <Route path="/promotion" element={<PromotionPage showAlert={showAlert} />} />
            <Route path="/wishlist" element={<WishListPage showAlert={showAlert} />} />
            <Route path="/password" element={<ChangePasswordPage showAlert={showAlert} />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/*
            <Route path="/order" element={<OrderPage/>} />
            
             */}
          </Routes>
        </div>
        {!openChat && onChatSettings &&
          <button className="comment-button" title="Live Chat" onClick={() => setOpenChat(true)}>
            <i class='bx bx-chat' />
          </button>
        }
        {openChat &&
          <LiveChat onClose={() => setOpenChat(false)} />
        }
        {shouldRenderHeaderSidebarFooter && <Footer id="footer" setOpenInstallment={setOpenInstallment} />}
      </main>
    </div>
  );
};

export default App;