import { push } from 'react-router-redux';
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    decrementAsync, increment
} from '../actions/actionCreators/counter';
import Home from '../components/login.js';
import {decrement} from "../actions/actionCreators/counter";
import {incrementAsync} from "../actions/actionCreators/counter";
import LoginForm from "../components/login";


class Login extends Component{
    constructor(props) {
        super(props);  
        this.state = {email: '', password: ''};
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }

    onFormSubmit(event) {
        
        event.preventDefault();
        console.log('submit')
    }

    changeEmail = (new_email) => {
        this.setState({email: new_email})

    }

    changePassword = (new_password) => {
        this.setState({password: new_password})
    }

    render() {
        return (
        <LoginForm  functions = {{changeEmail: this.changeEmail,
        changePassword : this.changePassword,
        submitForm :this.onFormSubmit}}
        />
        
        )
    }
}

const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
  }, dispatch);
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
