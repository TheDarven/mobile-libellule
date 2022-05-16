import React from 'react';
import { withRouter } from '../../router-service';
import IndexPage from '../../pages/index/IndexPage';

const Router = ({ routerContext }) => {
    const getPage = () => {
        switch (routerContext.route) {
            default:
                return <IndexPage />;
        }
    };

    return <React.Fragment>{getPage()}</React.Fragment>;
};

export default withRouter(Router);
