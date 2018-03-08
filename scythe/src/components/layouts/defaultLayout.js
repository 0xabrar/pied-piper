import React from 'react';
import { Route } from 'react-router';
import Header from '../header';


const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="default-layout">
                <Header />
                <Component {...matchProps} />
            </div>
        )} />
    )
};

export default DefaultLayout;