import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBInput, MDBCol} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from "firebase";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location = '/'; 
  }).catch(function(error) {
    // An error happened.
  });
}
componentWillMount(){
  this.getName();
}

getName() {
  let currentComp = this;
  var name;
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          name = firebase.auth().currentUser.displayName;
          currentComp.setState({ name: name});
      }
  });
}

render() {
  return (
      <MDBNavbar color="info-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Text2Pay</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/request">Request</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/incomplete" 
            >Incomplete</MDBNavLink>
            </MDBNavItem>
            <MDBCol md="12">
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </MDBCol>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu right basic className="dropdown-default">
                  <MDBDropdownItem href="#!">{this.state.name}</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Account</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem href="#" onClick={()=> this.signOut()}>Log Out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;