import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo.svg';
import './App.css';

<!--og stuff-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Material Design Bootstrap</title>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="css/mdb.min.css" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link href="css/style.css" rel="stylesheet">
</head>

<body>

  <!-- Start your project here-->
      <div style="width:300px;height:400px; position: absolute; left: 50%; margin-left:-225px; top: 10%;  width: 450px; height: 250px;">


  <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
form {border: 3px solid #f1f1f1;}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #55B6D8;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

button:hover {
  opacity: 0.8;
}

.signupbtn {
  width: 100%;
  padding: 10px 18px;
  background-color: #D3D3D3;
  border-radius:5px;


}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {

}

span.psw {
  float: right;
  padding-top: 16px;
}

h3 {
   width: 100%;
   text-align: center;
   color: #696969;
   font-size: 15px;
   border-bottom: 1px solid #D3D3D3;
   line-height: 0.1em;
   margin: 10px 0 20px;
}

h3 span {
    background:#fff;
    padding:0 10px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}

</style>
</head>
<body>

<form action="pages/homepage.html" method="post">
  <div class="imgcontainer">
    <img src="payjunction-ecommerce.png" alt="Logo" class="logo" style="width:230.7px; height: 155.3px;">
  </div>
  <div class="container">
    <!--<label for="uname"><b>Username</b></label>-->
    <input type="text" placeholder="Email or mobile number" name="uname" required style= "border-radius:5px">

    <input type="password" placeholder="Password" name="psw" required style= "border-radius:5px">

    <button type="submit" style= "border-radius:5px">Log In</button >
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
    <h3><span>or</span></h3>
  </div>
  <div class="container" >
    <button type="button" class="signupbtn" >Sign Up</button>

  <div class="container" style="position: absolute; left: 50%; margin-left:-370px;">
    <span class="psw">Forgot <A HREF="html/forgotpw.html">password?</a></span>
  </div>
</form>

</body>
</html>
</div>

  <!-- End your project here-->

  <!-- SCRIPTS -->
  <!-- JQuery -->
  <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="js/mdb.min.js"></script>

</body>

</html>



class App extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
        </header>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
