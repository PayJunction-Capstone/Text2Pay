import React, {Component} from 'react';
import firebase from "firebase";
// import { Router, Route, Link } from 'react-router-dom'

class CheckStatus extends Component {

checkIfLoggedIn() {
    var currentuser;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user == null) {
            // return <Redirect to='/'/>
            // window.location = "/"
            window.location.replace("/");
        } else {
            currentuser = firebase.auth().currentUser;
            console.log("seeing if current user works")
            console.log(currentuser)
        }
    });
    // console.log("check status is called")
    // console.log(firebase.auth())
}


render(){
    return (
      <div >
          {this.checkIfLoggedIn()}
    </div>
    );
    }
  }

  export default CheckStatus;