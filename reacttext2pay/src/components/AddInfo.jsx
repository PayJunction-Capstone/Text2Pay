import React, { Component } from "react";
import firebase, { storage } from "firebase";
import NavbarPage from "../components/NavBarPage";
import { ProgressBar } from "react-bootstrap";

class AddInfo extends Component {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    var re = /[0-9]{10}/;
    return re.test(String(phone));
  }

  uuidv4() {
    var uuidTemp = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    //console.log("uuidTemp: " + uuidTemp);
    return uuidTemp;
  }

  saveInfo() {
    var db = firebase.firestore();
    var username = document.getElementById("username").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var merchant = document.getElementById("merchant").checked;
    var fileButton = document.getElementById("fileButton");
    var qrcode = this.uuidv4();

    var file = fileButton.files[0];
    var fileName = file.name;
    var path = "profile_pics/" + phone + "/" + fileName;
    var storageRef = firebase.storage().ref(path);
    storageRef.put(file);

    if (
      username != "" &&
      firstname != "" &&
      lastname != "" &&
      this.validateEmail(email) == true &&
      this.validatePhone(phone) == true
    ) {
      db.collection("users")
        .add({
          Merchant: merchant,
          Username: username,
          FirstName: firstname,
          LastName: lastname,
          Email: email,
          PhoneNumber: phone,
          ProfilePic: path,
          QRCode: qrcode
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          window.location = "/home";
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    } else {
      console.log("invalid input");
    }
  }

  render() {
    return (
      <div
        className="block-text"
        style={{
          width: "500px",
          height: "500px",
          left: "50%",
          align: "middle",
          marginTop: "50px",
          display: "inline-block"
        }}
      >
        <h1
          className="card-title"
          style={{ fontSize: "21px", textAlign: "center", marginTop: "30px" }}
        >
          Add Information
        </h1>
        Are you a merchant?
        <input
          id="merchant"
          type="checkbox"
          name="merchantCheck"
          required
          style={{ marginLeft: "20px" }}
        />
        <input
          id="username"
          type="text"
          placeholder="User ID/Company Name"
          name="uname"
          required
          style={{
            borderRadius: "5px",
            width: "80%",
            padding: "12px 20px",
            margin: "8px 0",
            marginTop: "8px",
            display: "inline-block",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <input
          id="firstname"
          type="text"
          placeholder="First Name"
          name="fname"
          required
          style={{
            borderRadius: "5px",
            width: "80%",
            padding: "12px 20px",
            margin: "12px 0",
            marginTop: "8px",
            display: "inline-block",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <input
          id="lastname"
          type="text"
          placeholder="Last Name"
          name="lname"
          required
          style={{
            borderRadius: "5px",
            width: "80%",
            padding: "12px 20px",
            margin: "12px 0",
            marginTop: "8px",
            display: "inline-block",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <input
          id="email"
          type="text"
          placeholder="Email Address"
          name="emailaddr"
          required
          style={{
            borderRadius: "5px",
            width: "80%",
            padding: "12px 20px",
            margin: "12px 0",
            marginTop: "8px",
            display: "inline-block",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <input
          id="phone"
          type="text"
          placeholder="Mobile Number"
          name="phonenum"
          required
          style={{
            borderRadius: "5px",
            width: "80%",
            padding: "12px 20px",
            margin: "12px 0",
            marginTop: "8px",
            display: "inline-block",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <input
          id="fileButton"
          type="file"
          name="profilePicButton"
          required
          style={{ borderRadius: "5px", marginTop: "20px" }}
        />
        <br />
        <button
          type="submit"
          id="submit"
          onClick={() => this.saveInfo()}
          style={{ borderRadius: "5px", marginTop: "20px" }}
        >
          Create Profile
        </button>
      </div>
    );
  }
}

export default AddInfo;
