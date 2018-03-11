import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

const piedPiperLogo = `https://png.icons8.com/color/1600/pied-piper.png`;


class Login extends Component{
    constructor(props) {
        super(props);  
        this.state = {email: '', password: ''};
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    onFormSubmit(event) {
        console.log('submit')
        event.preventDefault();
    }

    render() {
        return (
        <div className='login-form'  >
             <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                height: 100%;
                }
            `}</style>
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='green' textAlign='center' >
                    <Image src={piedPiperLogo} />
                    {' '}Log-in to your account
                    </Header>
                    <Form size='large' onSubmit = {this.onFormSubmit}>
                        <Segment stacked>
                            <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange = {(event, newValue) =>{ 
                                this.setState({email: newValue})
                                console.log(newValue);}
                            }/>
                            <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange = {(event, newValue) => {
                                this.setState({password: newValue})
                                console.log(newValue)} 
                            }/>
                            <Button color='green' fluid size='large' type = 'submit'>Login</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/home')
  }, dispatch)


  export default connect(
    null, 
    mapDispatchToProps
  )(Login)
