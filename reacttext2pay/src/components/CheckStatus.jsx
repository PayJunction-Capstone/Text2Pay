import React, {Component} from 'react';
import firebase from "firebase";
// import { Router, Route, Link } from 'react-router-dom'

class CheckStatus extends Component {

checkIfLoggedIn() {
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user == null) {
            // return <Redirect to='/'/>
            // window.location = "/"
            window.location.replace("/");
        } else {
        }
    });
    console.log("check status is called")
    console.log(user)
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