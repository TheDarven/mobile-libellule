import React, { useEffect, useState } from 'react';
import { isEmptyOrNull, nonEmptyOrNull } from '../util/string-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { whoAmI } from '../api/users-api';

const { createContext, useContext } = React;

const STORAGE_TOKEN_KEY = 'token';

const AuthContext = createContext({
    token: null,
    setToken: () => {},
    isAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [displayName, setDisplayName] = useState(null);

    const isAuth = () => {
        return nonEmptyOrNull(token);
    };

    useEffect(() => {
        if (isEmptyOrNull(token)) {
            setDisplayName(null);
        } else {
            whoAmI().then(res => {
                if (res.data?.status) {
                    setDisplayName(res.data?.data.displayName);
                }
            });
        }
    }, [token]);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_TOKEN_KEY)
            .then(storageToken => {
                setToken(storageToken);
            })
            .catch(() => setToken(null));
    }, []);

    const setStoredToken = newToken => {
        if (newToken !== token) {
            if (isEmptyOrNull(newToken)) {
                AsyncStorage.removeItem(STORAGE_TOKEN_KEY).then(() =>
                    setToken(newToken)
                );
            } else {
                AsyncStorage.setItem(STORAGE_TOKEN_KEY, newToken).then(() =>
                    setToken(newToken)
                );
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authContext: {
                    token,
                    setToken: setStoredToken,
                    isAuth,
                    displayName
                }
            }}>
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
