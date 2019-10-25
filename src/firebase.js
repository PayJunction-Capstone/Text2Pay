import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCri31YveE6WMCjfA9UMJH7-NdVU1ZJbu8",
    authDomain: "payjunction-4be6a.firebaseapp.com",
    databaseURL: "https://payjunction-4be6a.firebaseio.com",
    projectId: "payjunction-4be6a",
    storageBucket: "payjunction-4be6a.appspot.com",
    messagingSenderId: "199914665361",
    appId: "1:199914665361:web:1879621121a23682711630",
    measurementId: "G-L3XRQM049H"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase
