import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/auth-context';
import axios from 'axios';

const AuthInterceptor = ({ children }) => {
    const { authContext } = useAuth();

    const [requestInterceptor, setRequestInterceptor] = useState(-1);
    const [responseInterceptor, setResponseInterceptor] = useState(-1);

    useEffect(() => {
        if (requestInterceptor > -1) {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
            };
        }
    }, [requestInterceptor]);

    useEffect(() => {
        if (responseInterceptor > -1) {
            return () => {
                axios.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [responseInterceptor]);

    useMemo(() => {
        setRequestInterceptor(
            axios.interceptors.request.use(function (req) {
                if (authContext.isAuth()) {
                    req.headers = {
                        ...req.headers,
                        Authorization: authContext.token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    };
                }
                return req;
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authContext.token, authContext.isAuth]);

    useMemo(() => {
        setResponseInterceptor(
            axios.interceptors.response.use(
                function (res) {
                    const { headers, data } = res;
                    if (headers?.authorization) {
                        authContext.setToken(headers?.authorization);
                    }
                    if (data?.response) {
                        Toast.show({
                            type: 'success',
                            text1: data.response,
                            position: 'bottom'
                        });
                    }
                    return res;
                },
                function (err) {
                    const { response } = err;
                    if (response.headers?.authorization) {
                        authContext.setToken(response.headers?.authorization);
                    }
                    if (response.data?.response) {
                        Toast.show({
                            type: 'error',
                            text1: response.data.response,
                            position: 'bottom'
                        });
                    }
                    return err;
                }
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authContext.setToken]);

    return children;
};

export default AuthInterceptor;
