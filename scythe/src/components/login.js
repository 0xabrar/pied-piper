import React, { Component } from "react";
import PropType from "prop-types";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { piedPiperLogo } from "../constants/components";

LoginForm.propTypes = {
  submitForm: PropType.func,
  changeEmail: PropType.func,
  changePassword: PropType.func
};

class LoginForm extends Component {
  render() {
    return (
      <div className="login-form">
        <style>
          {`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                height: 100%;
                }
            `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              <Image src={piedPiperLogo} /> Log-in to your account
            </Header>
            <Form onSubmit={this.props.submitForm} size="large" color="gray">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={event => this.props.changeEmail(event.target.value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={event =>
                    this.props.changePassword(event.target.value)
                  }
                />
                <Button color="green" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
