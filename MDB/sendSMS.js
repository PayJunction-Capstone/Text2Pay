const accountSid = 'AC0be21a36ad616556b63e4fb2de58b74f';
const authToken = '7aed3e119c852ce96f3276611ea3bcbf';
const client = require('twilio')(accountSid, authToken);

function validatePhone(phone){
    var re = /[0-9]{10}/;
    return re.test(String(phone));
}

function uuidv4() {
uuidTemp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
console.log("uuidTemp: " + uuidTemp);
return uuidTemp;
}

function createRequest(){
var db = firebase.firestore()

var paymentAmount = document.getElementById("paymentAmount").value;
var phoneNumber = document.getElementById("phoneNumber").value;
var requestDescription = document.getElementById("requestDescription").value;
var paymentRequestID = uuidv4();
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

    client.messages
    .create({
        body: 'Payment request',
        from: '+13213237705',
        to: '+19498702089'
    })
    .then(message => console.log(message.sid));
}
else{
    console.log("invalid input");
}

document.getElementById("paymentAmount").value = '';
document.getElementById("phoneNumber").value = '';
document.getElementById("requestDescription").value = '';

}