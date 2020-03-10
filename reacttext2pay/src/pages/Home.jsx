import React, {Component} from 'react';
import TablePanel from '../components/TablePanel'
import NavbarPage from '../components/NavBarPage'
import CheckStatus from '../components/CheckStatus'
import firebase from "firebase";
// import { Redirect } from 'react-router-dom'



class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: "empty",
      email: "null",
      completedList: []
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

  getCompletedRequests(){
    let currentComp = this;
    var db = firebase.firestore();
  
    var completedListTemp = []
    console.log(this.state.email)
    db.collection("paymentRequests").where("EmailRequestedFrom", "==", currentComp.state.email)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var requestData = doc.data();
              var tempCompleted = requestData.Completed;
              if(tempCompleted == true){
                var tempAmount = "+ $"+requestData.PaymentAmount;
                var tempPhoneNumber = requestData.PhoneNumber;
                var tempTime = requestData.CompletedTimeStamp;
                var tempTimeDiff =(Date.now() - tempTime)/3600000;

                var savedTimeDiff = tempTimeDiff;
                
                console.log(tempTimeDiff);
      
                if((tempTimeDiff*60)<2){
                  tempTimeDiff =  Math.floor(tempTimeDiff*60)+" min ago";
                }else if(tempTimeDiff<1){
                  tempTimeDiff =  Math.floor(tempTimeDiff*60)+" mins ago";
                }else if(tempTimeDiff< 2){
                  tempTimeDiff =  Math.floor(tempTimeDiff)+" hr ago";
                }else if(tempTimeDiff< 24){
                  tempTimeDiff =  Math.floor(tempTimeDiff)+" hrs ago";
                }else if(tempTimeDiff<48){
                  tempTimeDiff = Math.floor(tempTimeDiff/24)+" day ago";
                }else if(tempTimeDiff>=48){
                  tempTimeDiff = Math.floor(tempTimeDiff/24)+" day ago";
                }else{
                  tempTimeDiff = "Na";
                }

                if(tempPhoneNumber.length<3){
                  tempPhoneNumber = "QR Code";
                }else{
                  tempPhoneNumber = "Text: "+tempPhoneNumber;
                }

                
                var tempDescription = requestData.RequestDescription;
                completedListTemp.push(
                  {
                    time: savedTimeDiff,
                    timeWord: tempTimeDiff,
                    title: tempPhoneNumber,
                    cost: tempAmount,
                    description: tempDescription
                  });
              }
          });
          currentComp.setState({
            completedList: completedListTemp,
          });
          var tempList = currentComp.state.completedList;
          tempList.sort(currentComp.compare);
          var fixedList = []
          for(var k =0; k<tempList.length;k++){
            fixedList.push({
              timeWord: tempList[k].timeWord,
              title: tempList[k].title,
              cost: tempList[k].cost,
              description: tempList[k].description
            })
          }
          currentComp.setState({
            status: "updated",
            completedList: fixedList,
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      }); 
      
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const A = a.time;
    const B = b.time;
  
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  }

  addAfter(array, index, newItem) {
    return [
        array.slice(0, index),
        newItem,
        array.slice(index)
    ];
}

  componentWillMount(){
    this.getUserEmail()
    console.log(Date.now());
  }

  render(){
    if(this.state.status=="loading"){
      this.getCompletedRequests()
    }
    return (
      <div >
        <CheckStatus />
        <NavbarPage />
        <TablePanel completedList={this.state.completedList} style={{display:"inline-block"}}/>
      </div>  
    );
  }
}

export default Home;