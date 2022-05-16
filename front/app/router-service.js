import React, { useState } from 'react';

const { createContext, useContext } = React;

const RouterContext = createContext({ route: null, setRoute: () => {} });

export const VIEWS = {
    index: 'index'
};

export const RouterProvider = ({ defaultRoute, children }) => {
    const [route, setRoute] = useState(defaultRoute ?? VIEWS.index);

    return (
        <RouterContext.Provider value={{ routerContext: { route, setRoute } }}>
            { children }
        </RouterContext.Provider>
    );
};

export const useRouter = () => {
    return useContext(RouterContext);
};

export const withRouter = ReactElement => props => {
    const routerContext = useRouter();
    return <ReactElement {...props} {...routerContext} />;
};
