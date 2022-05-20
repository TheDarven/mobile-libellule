import React, { useState } from 'react';

const { createContext, useContext } = React;

const AuthContext = createContext({
    token: null,
    setToken: () => {},
    isAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const isAuth = () => {
        return token != null;
    };

    return (
        <AuthContext.Provider
            value={{ authContext: { token, setToken, isAuth } }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const withAuth = ReactElement => props => {
    const authContext = useAuth();
    return <ReactElement {...props} {...authContext} />;
};
