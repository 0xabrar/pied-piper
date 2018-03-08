import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route} from 'react-router';
import { Grid, Menu,  Icon, Table } from 'semantic-ui-react'
import Header from '../components/header';

const DashboardContainer = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={matchProps => (
            <div>
                <Header />
                <Component {...matchProps} />
            </div>
        )} />
    );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
   redirectLogin: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer)