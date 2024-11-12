import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import AlertMessage from './components/alertMessage/alertMessage';
import { AuthProvider, useAuth } from './authContext';
import { StockProvider } from './stockContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LocationPage from './components/LocationPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProfilePage from './components/ProfilePage';
import ItemPage from './components/ItemPage';
import StockPage from './components/StockPage';

const App = () => {
  return (
    <StockProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </StockProvider>
  );
};

const AppContent = () => {
  const { userInformation } = useAuth();
  const location = useLocation();

  const noHeaderSidebarFooterPaths = ['/cart'];
  const shouldRenderHeaderSidebarFooter = !noHeaderSidebarFooterPaths.includes(location.pathname);

  const [handleOpen, setHandleOpen] = useState('');

  // State to manage alert message
  const [alert, setAlert] = useState({ type: '', content: '', duration: 3 });
  const [isVisible, setIsVisible] = useState(false);

  const [searchInput, setSearchInput] = useState('');

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
    setAlert({ type, content, duration: duration || 3 });
    setIsVisible(true);
  };

  // Function to handle alert close
  const handleCloseAlert = () => {
    setIsVisible(false);
    setAlert({ type: '', content: '', duration: 3 });
  };

  const handleAction = (type) => {
    setHandleOpen(type);
    console.log(type);
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
            <SideBar value={handleOpen} onClose={closeSideBar} SearchInput={handleSearchInput} searchInputValue={searchInput} />
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
            <Route path="/stock" element={<StockPage showAlert={showAlert} />} />
            {/* <Route path="/" element={<LoginPage showAlert={showAlert} />} />
            <Route path="/home" element={<HomePage showAlert={showAlert} setSidebarData={setSidebarData} />} />
            

            <Route path="/stock" element={<StockPage />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/installment" element={<InstallmentPage/>} /> 
            <Route path="/order" element={<OrderPage/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/password" element={<ResetPasswordPage />} />
            <Route path="/cart" element={<CartPage />} />
            
             */}
          </Routes>
        </div>
        {shouldRenderHeaderSidebarFooter && <Footer id="footer"/>}
      </main>
    </div>
  );
};

export default App;