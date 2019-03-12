import React,{Component} from 'react';
import * as EmailValidator from 'email-validator'
import axios from 'axios'
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Form, 
  FormGroup, 
  Label, 
  Input } from 'reactstrap'

export default class SignUpModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValue: "",
      passwordValue: "",
      usernameValue: ""
    }
  }

  handleUsernameChange = (e) => {
    this.setState({usernameValue: e.target.value})
  }

  handleEmailChange = (e) => {
    this.setState({emailValue: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({passwordValue: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const validateEmail = EmailValidator.validate(this.state.emailValue)
    if (validateEmail){
        axios.post('https://insta.nextacademy.com/api/v1/users/new', {
            username: this.state.usernameValue,
            email: this.state.emailValue,
            password: this.state.passwordValue
          })
          .then(response => {

            const jwt = response.data.auth_token
            sessionStorage.setItem('jwt', jwt)
            sessionStorage.setItem('current_user', JSON.stringify(response.data.user))

            this.props.toggleSignUpModal()
          })
          .catch(error => {
            if (error) {
                this.setState({
                    isLoading: false
                })
            }
          });
      }
    }

  render() {
    return (
      <>
        <Modal isOpen={this.props.signUpModal} toggle={this.props.toggleSignUpModal}>
          <ModalHeader toggle={this.props.toggleSignUpModal}>Sign Up</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="username" className="mr-sm-2">Username</Label>
              <Input value={this.state.usernameValue} onChange={this.handleUsernameChange} type="text" name="username" placeholder="username" autoComplete='on' />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleEmail" className="mr-sm-2">Email</Label>
              <Input value={this.state.emailValue} onChange={this.handleEmailChange} type="email" name="email" placeholder="email" autoComplete='on' />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="examplePassword" className="mr-sm-2">Password</Label>
              <Input value={this.state.passwordValue} onChange={this.handlePasswordChange} type="password" name="password" placeholder="password" autoComplete='on' />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggleLoginModal}>Login</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleSignUpModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}