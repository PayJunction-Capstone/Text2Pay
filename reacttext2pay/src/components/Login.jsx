import React, {Component} from 'react';
import firebase from "firebase";


class Login extends Component {
  // <!-- after successful login, should take you straight to home.html -->
  callGoogleSignIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token)
      console.log(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = 'home'; //After successful login, user will be redirected to home.html
  }
});
}


// <!-- sign in with google, but takes you to the addinfo page after -->
callGoogleSignUp(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(token)
      console.log(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  firebase.auth().onAuthStateChanged(user => {
  if(user) {
    window.location = "addinfo"; //After successful signup, user will be redirected to /addinfo
  }
});
}

render(){
  return (
    <div >
    <button onClick={()=> this.callGoogleSignIn()} style={{margin:"50px"}} className="btn btn-info" >Sign In With Google</button>
    <button onClick={()=> this.callGoogleSignUp()} style={{margin:"50px"}} className="btn btn-light" >Sign Up With Google</button>
  </div>
  );
  }
}

export default Login;
