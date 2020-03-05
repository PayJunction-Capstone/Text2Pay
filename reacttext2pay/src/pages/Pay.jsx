import React, {Component} from 'react';
import firebase from "firebase";
import "../index.css";
import "../App.css";

import PayCard from '../components/PayCard'
import NavbarPage from '../components/NavBarPage'
import PayHeader from '../components/PayHeader'
import SplitCard from '../components/SplitCard'

//const functions = require("firebase-functions");
//const admin = require("firebase-admin");
var QRCode = require('qrcode.react');


//admin.initializeApp(functions.config().firebase);

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      status: "empty",
      uuid:"",
      url: "",
      amount: "00.00",
      amountList: [],
      phoneNumber: "123456789",
      description: "null" ,
      email: "null",
      user: "null",
      requesterNumber: "123456789",
      onPhone: "false"
    }
  }
  getPaymentRequest(paymentRequestID,replaceState){
    let currentComp = this;
    var db = firebase.firestore();
    db.collection("paymentRequests").where("PaymentRequestID", "==", paymentRequestID)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var requestData = doc.data();
              var tempAmount = requestData.PaymentAmount;
              var tempAmountList = requestData.AmountList;
              var tempPhoneNumber = requestData.PhoneNumber;
              var tempDescription = requestData.RequestDescription;
              var tempRequestedByEmail = requestData.EmailRequestedFrom;
              currentComp.tempID = doc.id
              console.log(currentComp.tempID);
              currentComp.setState({
                status: "loading",
                amount: tempAmount,
                amountList: tempAmountList,
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
  getUserInfo(tempEmail){
    let currentComp = this;
    var db2 = firebase.firestore();
    db2.collection("users").where("Email", "==", tempEmail)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
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


  getRealTimeUpdates = function() {
    let currentComp = this;
    console.log("inhere")
    this.docRef.onSnapshot(function(doc){
      if(doc && doc.exists){
        const myData = doc.data();
        console.log(doc);
        var tempAmountList = myData.AmountList;
        currentComp.setState({amountList: tempAmountList});
      }
    });
  }
  componentWillMount(){
    let thisComp= this;
    var currentUUID = window.location.href.substring    (window.location.href.lastIndexOf('/') + 1);
    this.setState({
      uuid: currentUUID,
      url: "https://www.thegrandpotato.com/pay/"+currentUUID
    });
    this.getPaymentRequest(currentUUID,this.replaceState);
    setTimeout(() => {
      var tempDocID = "paymentRequests/"+this.tempID;
      console.log(tempDocID);
      this.docRef = firebase.firestore().doc(tempDocID);
      this.getRealTimeUpdates();
    }, 1200);
    
  }

  render(){
    return (
      <div style={{textAlign: "center"}}>  
        <PayHeader/> 
        <div style={{display:"inline-block"}}>
          {this.state.amountList.map((eachSplitCard, index) =>
            <SplitCard payComp={this} cardIndex={index} amount={this.state.amountList[index]["amount"]} completed={this.state.amountList[index]["complete"]}/> 
          )}
          <QRCode style={{width: "250px", height: "250px", marginTop: "40px"}} value={this.state.url}/>
        </div>
      </div>
    );
  }
}

// exports.foo = functions.database.ref('/paymentRequests/VkzrpEURLIAajjpBJjgl')
// .onUpdate((change) => {
//     const before = change.before  // DataSnapshot before the change
//     const after = change.after  // DataSnapshot after the change
//     console.log("AFTERPING")
//     console.log(after)
    
// })

export default Home;


//<PayCard style={{topMargin:"10px",display:"inline-block"}}/>