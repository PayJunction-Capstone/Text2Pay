import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'firebase/auth';

import NavbarPage from './components/NavBarPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/Home';
import RequestPage from './pages/Request';
import IncompletePage from './pages/Incomplete';
import PayPage from "./pages/Pay"
import AddInfo from "./pages/ExtraInfo"
import CheckStatus from './components/CheckStatus'


class App extends Component{
  render(){
    return (
      <div className="App">
        <CheckStatus/>
        {/* <NavbarPage /> */}
        <Router>
          <Switch>
            {/*<Route path="/" component={MainPage} />*/}
            <Route path="/home" component ={HomePage}/>
            <Route path="/request" component={RequestPage} />
            <Route path="/incomplete" component={IncompletePage}/>
            <Route path="/login" component={MainPage}/>
            <Route path="/pay" component={PayPage}/>
            <Route path="/pay/:uuid" component={PayPage}/>
            <Route path="/addinfo" component={AddInfo}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
