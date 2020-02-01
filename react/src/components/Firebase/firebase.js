import app from 'firebase/app';


var config = {
  apiKey: "AIzaSyCri31YveE6WMCjfA9UMJH7-NdVU1ZJbu8",
  authDomain: "payjunction-4be6a.firebaseapp.com",
  databaseURL: "https://payjunction-4be6a.firebaseio.com",
  projectId: "payjunction-4be6a",
  storageBucket: "payjunction-4be6a.appspot.com",
  messagingSenderId: "199914665361",
  appId: "1:199914665361:web:1879621121a23682711630",
  measurementId: "G-L3XRQM049H"
};
class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}
export default Firebase;