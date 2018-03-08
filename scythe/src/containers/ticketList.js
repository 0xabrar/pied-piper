import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Table } from 'semantic-ui-react'

// TODO: this is replaced by code in another branch
class TicketListContainer extends Component {

    render () {

        return (
            <div>
            </div>
        );
    }
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
    redirectLogin: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TicketListContainer)