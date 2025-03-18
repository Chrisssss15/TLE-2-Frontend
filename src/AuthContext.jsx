// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('jwt');
        setJwt(token);
    }, []);

    return (
        <AuthContext.Provider value={{ jwt }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};