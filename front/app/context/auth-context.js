import React, { useState } from 'react';
import { nonEmptyOrNull } from '../util/string-helper';

const { createContext, useContext } = React;

const AuthContext = createContext({
    token: null,
    setToken: () => {},
    isAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const isAuth = () => {
        return nonEmptyOrNull(token);
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
