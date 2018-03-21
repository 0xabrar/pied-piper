import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import LoginForm from "../components/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onFormSubmit = event => {
    event.preventDefault();
  };

  changeEmail = new_email => {
    this.setState({ email: new_email });
  };

  changePassword = new_password => {
    this.setState({ password: new_password });
  };

  render() {
    // TODO: the functions to login form are invalid because nothing is passed to dispatch
    return (
      <LoginForm
        changeEmail={this.changeEmail}
        changePassword={this.changePassword}
        submitForm={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  state: state // TODO: should map to something after
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
