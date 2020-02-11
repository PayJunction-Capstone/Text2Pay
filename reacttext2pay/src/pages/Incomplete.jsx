import React, {Component} from 'react';
import firebase from "firebase";
import Card from '../components/Card';
import NavbarPage from '../components/NavBarPage'


class Incomplete extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: "empty",
      email: "null",
      incompleteList: []
    }
  }
  getUserEmail() {
    let currentComp = this;
    var email;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            email = firebase.auth().currentUser.email;
            currentComp.setState({ status: "loading",
                                   email: email});
        }
    });
  }
  getIncompleteRequests(){
    let currentComp = this;
    var db = firebase.firestore();

    var incompleteListTemp = []
    console.log(this.state.email)
    db.collection("paymentRequests").where("EmailRequestedFrom", "==", currentComp.state.email)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var requestData = doc.data();
              var tempAmount = requestData.PaymentAmount;
              var tempPhoneNumber = requestData.PhoneNumber;
              var tempDescription = requestData.RequestDescription;
              console.log(tempAmount)
              incompleteListTemp.push(
                {title: tempPhoneNumber,
                cost: tempAmount,
                description: tempDescription
                });
              console.log(incompleteListTemp)
          });
          currentComp.setState({
            status: "updated",
            incompleteList: incompleteListTemp,
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      }); 
      
      //console.log(this.state.incompleteList);

  }

  componentWillMount(){
    this.getUserEmail()
  }

  render(){
    if(this.state.status=="loading"){
      this.getIncompleteRequests()
    }
    return (
      <div>
        <NavbarPage/>
        <div style={{display:"inline-block"}}>
          {this.state.incompleteList.map((incCard, index) =>
            <Card title={incCard.title} cost={incCard.cost} 
            desc={incCard.description} image={incCard.imgUrl}/> 
          )}
        </div>  
      </div>
    );
  }
}

export default Incomplete;