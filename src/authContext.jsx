import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserService } from './service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); // To manage loading state

    useEffect(() => {
        const userInfoLocal = localStorage.getItem('userInfo');
        const userInfoSession = sessionStorage.getItem('userInfo');

        const userInfo = userInfoLocal ? JSON.parse(userInfoLocal) : userInfoSession ? JSON.parse(userInfoSession) : null;

        if (userInfo) {
            autoLogin(userInfo); // Call autoLogin if user info exists
        } else {
            setLoading(false); // Set loading to false if no user info
        }
    }, []); // Empty dependency array ensures this runs once on mount

    const autoLogin = async (userInfo) => {
        try {
            // Assuming you have a login function that takes user info and performs the login API call
            const response = await UserService.loginAccount(userInfo.email, userInfo.password); // Call your login service
            if (response.status) {
                const lastestUserInfo = {
                    email: response.data.email,
                    username: response.data.username,
                    userId: response.data.userId,
                    password: response.data.password,
                    role: response.data.role,
                    business: response.data.role.business
                };
                setUserInfo(lastestUserInfo);
                setIsLoggedIn(true);
            } else {
                // Clear outdated user info from localStorage and sessionStorage
                localStorage.removeItem('userInfo');
                sessionStorage.removeItem('userInfo');
                setUserInfo(null);
                setIsLoggedIn(false);
            }

        } catch (error) {
            console.error("Auto-login failed:", error);
            // Handle any errors if the auto-login fails (e.g., show a notification)
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const login = async (userInfo) => {
        try {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUserInfo(userInfo);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed:", error);
            // Handle any login errors
        }
    };

    const loginSession = (userInfo) => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); // Store for non-remembered session
        setUserInfo(userInfo); // Set user info in state
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userInfo'); // Clear session storage on logout
        setUserInfo(null); // Clear user info in state
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInformation, login, loginSession, logout, loading }}>
            {loading ? <div>Loading...</div> : children} {/* Show loading state while checking auth */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
