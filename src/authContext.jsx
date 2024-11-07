import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { UserService } from './service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const onLoad = useRef(false);

    useEffect(() => {
        if (onLoad.current) return;
        onLoad.current = true;
        const userInfoLocal = localStorage.getItem('userInfo');

        const userInfo = userInfoLocal ? JSON.parse(userInfoLocal) : null;

        if (userInfo) {
            autoLogin(userInfo);
        } else {
            setLoading(false);
        }
    }, []);

    const autoLogin = async (userInfo) => {
        try {
            const response = await UserService.loginAccount(userInfo.email, userInfo.password);
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
                localStorage.removeItem('userInfo');
                setUserInfo(null);
                setIsLoggedIn(false);
            }

        } catch (error) {
            localStorage.removeItem('userInfo');
            console.error('error', 'Failed to login!');
            alert('Session expired, please login again!');
        } finally {
            setLoading(false);
        }
    };

    const login = async (userInfo) => {
        try {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setUserInfo(userInfo);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userInfo');
        setUserInfo(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInformation, login, logout, loading }}>
            {loading ?
                <>
                    <style>{`
                        .display-dot {
                        display: inline-block;
                        position: relative;
                        }
                        .display-dot::after {
                        content: '.';
                        position: absolute;
                        animation: dot-anim 1.5s steps(3) infinite;
                        }

                        @keyframes dot-anim {
                        0% {
                            content: '.';
                        }
                        33% {
                            content: '..';
                        }
                        66% {
                            content: '...';
                        }
                        100% {
                            content: '.';
                        }
                        }
                    `}</style>
                    <div className="z-first position-fixed top-0 end-0 bottom-0 start-0 bg-dark opacity-75 all-center flex-column">
                        <div className="spinner-border text-primary" role="status" />
                        <span className="mt-2 text-white display-dot">Authenticating...</span>
                    </div>
                    {children}
                </>
                :
                children
            }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
