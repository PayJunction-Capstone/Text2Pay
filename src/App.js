import React from 'react';
import './App.css';
import firebase from './firebase'

firebase.firestore().collection('CreditCardNumber').add({
  title: "4111111111111111",
  cvv: '123'
})
function App() {
  return (
    <div className="App">
      <h1>Dank</h1>
      </div>
  );
}

export default App;
