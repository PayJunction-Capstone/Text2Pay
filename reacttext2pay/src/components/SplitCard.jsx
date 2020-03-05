import React, {Component} from 'react';
import firebase from "firebase";
import ToggleButtons from "./ToggleButtons"
import backImage from "../images/backImage.png"
import { MDBInput } from "mdbreact";

class SplitCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: "payment",
      splitMethod: "Quantity",
      value: ""
    }
  }

  onBuyClicked() {
    let currentComp = this;
    var currentUUID = window.location.href.substring
    if (!window.PaymentRequest) {
      // PaymentRequest API is not available. Forwarding to
      // legacy form based experience.
      //location.href = '/checkout';
      //return;
    }

   var val = currentComp.props.payComp.state.amountList[currentComp.props.cardIndex]["amount"];//REPLACE WITH AMOUNT FROM GETPAYMENT REQ
  
    const creditCardPaymentMethod = {
      supportedMethods: 'basic-card',
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        supportedTypes: ['credit', 'debit'],
      },
    };


    const applePayMethod = {
      supportedMethods: "https://apple.com/apple-pay",
      data: {
          version: 3,
          merchantIdentifier: "merchant.com.example",
          merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
          supportedNetworks: ["amex", "discover", "masterCard", "visa"],
          countryCode: "US",
      },
    };
    
    const paymentDetails = {
      total: {
        label: 'Total due',
        amount: { currency: 'USD', value : val }
      }
    };

    const supportedPaymentMethods = [
      creditCardPaymentMethod,
      applePayMethod
    ];
   
    // 1. Create a `PaymentRequest` instance
    var request = new PaymentRequest(supportedPaymentMethods,paymentDetails);
  
    // 2. Show the native UI with `.show()`
    request.show()
    // 3. Process the payment
    .then(result => {
      // POST the payment information to the server
      return fetch('/pay/'+currentUUID, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...result.toJSON(),...{amountBase:val}})
      }).then(response => {
        currentComp.updateFieldComplete();
        // 4. Display payment results
        if (response.status === 200) {
          // Payment successful
          return result.complete('success');
        } else {
          // Payment failure
          return result.complete('fail');
        }
      }).catch(() => {
        return result.complete('fail');
      });
    });
    //MOVE THIS INTO RESPONSE STATUS SUCCESSFUL
  }

  split(){
    var newValue = document.getElementById("splitInput"+this.props.cardIndex).value
    let currentComp = this;
    var db = firebase.firestore()
    var tempArray = this.props.payComp.state.amountList

    if(this.state.splitMethod=="Quantity"){
      var dividedAmount = parseFloat(tempArray[this.props.cardIndex]["amount"])/newValue;
      dividedAmount= (Math.floor(dividedAmount*100))/100;
      var i;
      for (i = 0; i < newValue-1; i++) {
        tempArray[this.props.cardIndex]["amount"] = (parseFloat(tempArray[this.props.cardIndex]["amount"])- dividedAmount).toFixed(2);
        tempArray.push({complete:false,amount:dividedAmount});
      }
    }else if(this.state.splitMethod=="Amount"){
      var tempValue = parseFloat(tempArray[this.props.cardIndex]["amount"])- parseFloat(newValue)
      tempArray[this.props.cardIndex]["amount"] = tempValue.toFixed(2)
      tempArray.push({complete:false,amount:newValue})
    }
    db.collection("paymentRequests").where("PaymentRequestID", "==", currentComp.props.payComp.state.uuid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            db.collection("paymentRequests").doc(doc.id).update({
              AmountList:tempArray
            });
            currentComp.props.payComp.getPaymentRequest(currentComp.props.payComp.state.uuid,currentComp.props.payComp.replaceState);
            currentComp.setState({
              status: "payment",
              value: ""
          });
        });
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
  }

  updateFieldComplete(){
    let currentComp = this;
    var tempArray = this.props.payComp.state.amountList
    tempArray[this.props.cardIndex]["complete"]= true;

    var db = firebase.firestore();
    db.collection("paymentRequests").where("PaymentRequestID", "==", currentComp.props.payComp.state.uuid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            db.collection("paymentRequests").doc(doc.id).update({
              AmountList:tempArray
            });
            currentComp.props.payComp.getPaymentRequest(currentComp.props.payComp.state.uuid,currentComp.props.payComp.replaceState);
            currentComp.setState({
              status: "complete",
              value: ""
          });
        });
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }

  changeStatus(newStatus){
    this.setState({
      status: newStatus
    })
  }

  render(){   
    if(this.state.status=="loading"){
      this.getUserInfo(this.state.email)
    }
    return(
      <div>
        <div className="card" 
        style={{width: "350px",height:"170px", marginTop:"20px", borderRadius: "20px"}}>
          <h1 className="card-title" style = {{fontSize:"45px",textAlign: "center",marginTop: "25px"}}>${this.props.amount}</h1>
          <div style={{display:"inline-block"}}>
            <a id="split" href="#" className="btn btn-light" style = {{ width:"125px",height:"50px",fontSize: "16px", paddingTop: "13px",marginTop: "0px",borderRadius: "10px"}} onClick={()=>this.changeStatus("SplitEnabled")}> Split </a>
            <a id="pay" href="#" className="btn btn-info" style = {{ width:"125px",height:"50px",fontSize: "16px", paddingTop: "13px",marginTop: "0px",borderRadius: "10px"}} onClick={()=>this.onBuyClicked()} > Pay </a>
          </div>
        </div>

        <div id="splitSection" className="card"
        style={{width: "350px",height:"170px", marginTop:"-170px", borderRadius: "20px",visibility: this.state.status=="SplitEnabled"? "visible": "hidden"}}>
          
          <div style={{display:"inline-block"}}>
            <img style={{width:"14px",height:"20px",float:"left",textAlign:"left",marginTop:"25px",marginLeft:"20px"}} src={backImage} onClick={()=>this.setState({status:"payment",value:""})} />
            <h1 className="card-title" style = {{fontSize:"15px", marginTop: "20px", marginLeft:"40px", textAlign:"left",float:"left"}}>Total Amount:</h1>
            <h1 className="card-title" style = {{fontSize:"15px", marginTop: "20px", marginRight:"40px",textAlign:"right",float:"right"}} >Split {this.state.splitMethod}:</h1>
          </div>
          <div style={{display:"inline-block"}}>
            <h1 className="card-title" style = {{fontSize:"30px", marginLeft:"74px", textAlign:"left",float:"left"}}>${this.props.amount}</h1>
            <MDBInput id={"splitInput"+this.props.cardIndex} style = {{fontSize:"28px", width:"100px", height:"30px", marginTop:"-30px", marginRight:"40px",textAlign:"right",float:"right",display:"inline-block"}}></MDBInput>
          </div>
          <ToggleButtons  style={{marginTop:"-30px"}} cardState={this}/>
        </div>
        <div className="card" 
        style={{width: "350px",height:"170px", marginTop:"-170px", borderRadius: "20px", visibility: this.props.completed==true? "visible":"hidden"}}>
          <h1 className="card-title" style = {{fontSize:"45px",textAlign: "center",marginTop: "25px"}}>${this.props.amount}</h1>
          <div style={{display:"inline-block"}}>
            <a id="pay" href="#" className="btn btn-success" style = {{ width:"200px",height:"75px",fontSize: "16px", paddingTop: "13px",marginTop: "-7.5px",borderRadius: "10px"}} > Payment Complete </a>
          </div>
        </div>
      </div>
    );
  }
  
}

export default SplitCard;