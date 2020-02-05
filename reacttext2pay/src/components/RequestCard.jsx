import React, {Component} from 'react';
import firebase from "firebase";

class RequestCard extends Component{
  uuidv4() {
    var uuidTemp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    console.log("uuidTemp: " + uuidTemp);
    return uuidTemp;
  }
  createRequest(){


    var db = firebase.firestore()

    var paymentAmount = document.getElementById("paymentAmount").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var requestDescription = document.getElementById("requestDescription").value;
    var paymentRequestID = this.uuidv4();
    var obj = {body: "thegrandpotato.com/"+paymentRequestID};
    if(paymentAmount != "" && phoneNumber != "" && paymentRequestID != "" )
    {
      db.collection("paymentRequests").add({
        PaymentAmount: paymentAmount,
        PhoneNumber: phoneNumber,
        PaymentRequestID: paymentRequestID,
        RequestDescription: requestDescription
      }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
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
  render(){
      return (
      <div className="card" style={{width: "500px",height: "500px", left: "50%",marginLeft: "-250px",marginTop:"50px",display: "inline-block"}}>


        <div className="card-body" style={{width: "500px",height: "250px"}} >

          <h1 className="card-title" style = {{fontSize:"21px",textAlign: "center",marginTop: "30px"}}>Create Request Link</h1>
          <p className="card-text" style ={{fontSize:"16px",textAlign: "center",marginTop: "25px"}}>Please enter an amount you wish to request.</p>
          <input id="paymentAmount" type="text" placeholder="Request Amount" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "8px 0", marginTop: "8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box"}}/>
          <input id="phoneNumber" type="text" placeholder="Phone Number" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "12px 0", marginTop: "8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box"}}/>
          <input id="requestDescription" type="text" placeholder="Description" name="uname" required style= {{borderRadius: "5px",width: "80%", padding: "12px 20px", margin: "12px 0", marginTop:"8px", display: "inline-block", border: "1px solid #ccc", boxSizing: "border-box"}}/>
          <br />
          <a  id="pay"  className="btn btn-info" style = {{ width: "350px",height: "65px",fontSize: "16px",paddingTop: "22px",marginTop:"20px"}} onClick={()=> this.createRequest()} >Send Request</a>
          <a id="return" href="home" className="btn btn-light" style = {{width:"350px",height:"65px",fontSize:"16px",paddingTop: "22px",marginTop: "-99px",visibility: "hidden"}}> Return to Home</a>
        </div>
    </div>
    );
  }

}

export default RequestCard;
