import React,{Component} from 'react'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loginModal: false,
      signUpModal: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleLoginModal = () => {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal,
      signUpModal: false
    }));
  }

  toggleSignUpModal = () => {
    this.setState(prevState => ({
      signUpModal: !prevState.signUpModal,
      loginModal: false
    }));
  }
  

  render() {
    const {loginModal,signUpModal} = this.state
    const {toggleLoginModal,toggleSignUpModal} = this

    return (
      <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Nextagram</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {
              sessionStorage.getItem('jwt')
              ? <NavItem>
                  <Link to={`/users/${JSON.parse(sessionStorage.getItem('current_user')).id}`} className="nav-link">Profile</Link>
                </NavItem>
              : <NavItem>
                  <Button color="success" onClick={this.toggleLoginModal}>Login</Button>
                </NavItem>
            }
              
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <LoginModal loginModal={loginModal} toggleLoginModal={toggleLoginModal} toggleSignUpModal={toggleSignUpModal} />
        <SignUpModal signUpModal={signUpModal}  toggleSignUpModal={toggleSignUpModal} toggleLoginModal={toggleLoginModal} />
      </>
    );
  }
}