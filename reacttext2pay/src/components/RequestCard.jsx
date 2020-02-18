import React, {Component} from 'react';
import firebase from "firebase";
var QRCode = require('qrcode.react');

class RequestCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: "empty",
      email: "null",
      requestLink:"null",
    }
  }

  uuidv4() {
    var uuidTemp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    //console.log("uuidTemp: " + uuidTemp);
    return uuidTemp;
  }
  createRequest(){

    let currentComp = this;
    var db = firebase.firestore()

    var paymentAmount = document.getElementById("paymentAmount").value;
    var amountList = [{complete:false, amount:paymentAmount}];
    var phoneNumber = document.getElementById("phoneNumber").value;
    var requestDescription = document.getElementById("requestDescription").value;
    var paymentRequestID = this.uuidv4();
    var obj = {body: "https://www.thegrandpotato.com/pay/"+paymentRequestID};
    if(paymentAmount != "" && phoneNumber != "" && paymentRequestID != "" )
    {
      db.collection("paymentRequests").add({
        PaymentAmount: paymentAmount,
        AmountList: amountList,
        PhoneNumber: phoneNumber,
        PaymentRequestID: paymentRequestID,
        RequestDescription: requestDescription,
        EmailRequestedFrom: currentComp.state.email

      }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          currentComp.setState({status:"requested",requestLink:"https://www.thegrandpotato.com/pay/"+paymentRequestID})
          console.log(currentComp.state.requestLink)
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }
    else{
      console.log("invalid input");
    }
    fetch('request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  getUserEmail() {
    let currentComp = this;
    var email;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            email = firebase.auth().currentUser.email;
            // console.log("seeing if email works")
            // console.log(email)
            currentComp.setState({ status: "updated",
                                   email: email});
        }
    });
  }

  resetState(){
    this.setState({
      status: "updated",
      requestLink:"null",
    });
    document.getElementById("paymentAmount").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("requestDescription").value = "";
  }
  componentWillMount(){
    //gets user information
    this.getUserEmail();
  }

  render(){
    var titleText = "null"
    var instructionText = "null"
    if(this.state.status == "updated"){
      this.titleText = "Create Request"
      this.instructionText = "Please enter an amount you wish to request.";
    }else{
      this.titleText = "Request Created"
      this.instructionText = "Please scan or check text to complete the request.";
    }
      return (
      <div className="card" style={{width: "500px",height: "500px", left: "50%",marginLeft: "-250px",marginTop:"50px",display: "inline-block",visibility: this.state.status == "empty" ? "hidden": "visible"}}>
        <div className="card-body" style={{width: "500px",height: "250px"}} >

          <h1 className="card-title" style = {{fontSize:"21px",textAlign: "center",marginTop: "30px"}}>{this.titleText}</h1>
          <p className="card-text" style ={{fontSize:"16px",textAlign: "center",marginTop: "25px"}}>{this.instructionText}</p>
          <input id="paymentAmount" type="text" placeholder="Request Amount" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "8px 0", marginTop: "8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box", visibility: this.state.status == "requested" ? "hidden": "visible"}}/>
          <input id="phoneNumber" type="text" placeholder="Phone Number" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "12px 0", marginTop: "8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box", visibility: this.state.status == "requested" ? "hidden": "visible"}}/>
          <input id="requestDescription" type="text" placeholder="Description" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "12px 0", marginTop:"8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box", visibility: this.state.status == "requested" ? "hidden": "visible"}}/>
          <QRCode value={this.state.requestLink} style = {{width:"225px",height:"225px",marginTop: "-320px", visibility: this.state.status == "requested" ? "visible": "hidden"}} />
          <br />
          <a  id="pay"  className="btn btn-info" style = {{ width: "350px",height: "65px",fontSize: "16px",paddingTop: "22px",marginTop:"0px", visibility: this.state.status == "requested" ? "hidden": "visible"}} onClick={()=> this.createRequest()} >Send Request</a>
          <a id="return" className="btn btn-light" style = {{color: "black",width:"350px",height:"65px",fontSize:"16px",paddingTop: "22px",marginTop: "-79px", visibility: this.state.status == "requested" ? "visible": "hidden"}} onClick={()=> this.resetState()}>Create New Request</a>
          
        </div>
    </div>
    );
  }

}

export default RequestCard;
