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

const App = () => {
  return (
    <StockProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </CartProvider>
    </StockProvider>
  );
};

const AppContent = () => {
  const { userInformation } = useAuth();
  const location = useLocation();

  const noHeaderSidebarFooterPaths = ['/payment'];
  const shouldRenderHeaderSidebarFooter = !noHeaderSidebarFooterPaths.includes(location.pathname);

  const [handleOpen, setHandleOpen] = useState('');

  // State to manage alert message
  const [alert, setAlert] = useState({ type: '', content: '', duration: 2 });
  const [isVisible, setIsVisible] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [openChat, setOpenChat] = useState(false);

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

  return (
    <div className="hide-scroll-container">
      {isVisible && (
        <AlertMessage
          alert={alert.type}
          content={alert.content}
          duration={alert.duration}
          onClose={handleCloseAlert}
        />
      )}
      {shouldRenderHeaderSidebarFooter &&
        <div className='hide-scroll-container'>
          <Header action={handleAction} />
          {handleOpen !== '' &&
            <SideBar value={handleOpen} onClose={closeSideBar} SearchInput={handleSearchInput} searchInputValue={searchInput}  showAlert={showAlert} />
          }
        </div>
      }
      <main className="hide-scroll-container" style={shouldRenderHeaderSidebarFooter ? containerStyle : {}}>
        <div className="hide-scroll-container content-container" style={shouldRenderHeaderSidebarFooter ? contentStyle : {}}>
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
            <Route path="/cart" element={<CartPage showAlert={showAlert} openCart={() => {setHandleOpen('cart')}} />} />
            <Route path="/promotion" element={<PromotionPage showAlert={showAlert} />} />
            {/* <Route path="/" element={<LoginPage showAlert={showAlert} />} />
            <Route path="/home" element={<HomePage showAlert={showAlert} setSidebarData={setSidebarData} />} />
            

            
            <Route path="/installment" element={<InstallmentPage/>} /> 
            <Route path="/order" element={<OrderPage/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/password" element={<ResetPasswordPage />} />
            
            
             */}
          </Routes>
        </div>
        {/* <button className="comment-button" title="Live Chat" onClick={() => setOpenChat(true)}>
          <i class='bx bx-chat' />
        </button> */}
        {openChat &&
          <LiveChat onClose={() => setOpenChat(false)} />
        }
        {shouldRenderHeaderSidebarFooter && <Footer id="footer" />}
      </main>
    </div>
  );
};

export default App;