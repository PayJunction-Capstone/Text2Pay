import React, { Component } from "react";
import Dentist from "../images/dentist.png";
import Blaze from "../images/blaze.png";
import Edison from "../images/edison.png";
import firebase from "firebase";

var QRCode = require("qrcode.react");

class PayHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "empty",
      url: "",
      amount: "00.00",
      phoneNumber: "123456789",
      description: "null",
      email: "null",
      user: "null",
      requesterNumber: "123456789",
      onPhone: "false"
    };
  }
  getPaymentRequest(paymentRequestID, replaceState) {
    let currentComp = this;
    var db = firebase.firestore();
    db.collection("paymentRequests")
      .where("PaymentRequestID", "==", paymentRequestID)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var requestData = doc.data();
          var tempAmount = requestData.PaymentAmount;
          var tempPhoneNumber = requestData.PhoneNumber;
          var tempDescription = requestData.RequestDescription;
          var tempRequestedByEmail = requestData.EmailRequestedFrom;
          currentComp.setState({
            status: "loading",
            amount: tempAmount,
            phoneNumber: tempPhoneNumber,
            description: tempDescription,
            email: tempRequestedByEmail
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  componentWillMount() {
    //get UUID from current web URL

    var currentUUID = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    this.setState({
      url: "https://www.thegrandpotato.com/pay/" + currentUUID
    });
    //gets request information using UUID
    this.getPaymentRequest(currentUUID, this.replaceState);
    //this.getUserEmail();
  }

  getUserInfo(tempEmail) {
    let currentComp = this;
    var db2 = firebase.firestore();
    db2
      .collection("users")
      .where("Email", "==", tempEmail)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var requestData = doc.data();
          var tempUsername = requestData.Username;
          var tempUserPhoneNumber = requestData.PhoneNumber;
          currentComp.setState({
            status: "updated",
            user: tempUsername,
            requesterNumber: tempUserPhoneNumber
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    var image;
    if (this.state.status == "loading") {
      this.getUserInfo(this.state.email);
      // if (this.state.email == "julialiu@ucsb.edu") image = Blaze;
      // if (this.state.email == "julia.zihan.liu@gmail.com") image = Dentist;
      // if (this.state.email == "eighteightpianokeys@gmail.com") image = Edison;
    }
    if (this.state.email == "julialiu@ucsb.edu") image = Blaze;
    if (this.state.email == "julia.zihan.liu@gmail.com") image = Dentist;
    if (this.state.email == "eighteightpianokeys@gmail.com") image = Edison;
    console.log(this.state.email);
    return (
      <div>
        <img
          class="card-img-top"
          src={image}
          alt="Card image cap"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            marginTop: "40px"
          }}
        ></img>
        <h1
          className="card-title"
          style={{ fontSize: "25px", marginTop: "5px" }}
        >
          {this.state.user}
        </h1>
        <p
          id="description"
          className="card-text"
          style={{ fontSize: "16px", textAlign: "center", marginTop: "20px" }}
        >
          {" "}
          {this.state.email} requests ${this.state.amount} for{" "}
          {this.state.description}.
        </p>
      </div>
    );
  }
}

export default PayHeader;
