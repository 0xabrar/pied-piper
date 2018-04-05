import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import LoginForm from "../components/login";
import { getUserState } from '../reducers/index';
import { loginThunk } from '../actions/thunk/user';
import { Label } from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.props.login(this.state)
    
  };

  changeEmail = new_email => {
    this.setState({ email: new_email });
  };

  changePassword = new_password => {
    this.setState({ password: new_password });
  };


  showLabel = () => {
    const message = "Login Failed";
    if (this.props.user.status === false) {
      return <Label>{message}</Label>;
    } else {
      return null;
    }

  };

  render() {
    // TODO: the functions to login form are invalid because nothing is passed to dispatch
    return (
      <LoginForm
        changeEmail={this.changeEmail}
        changePassword={this.changePassword}
        submitForm={this.onFormSubmit}
        showLabel={this.showLabel}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: getUserState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: loginThunk,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
