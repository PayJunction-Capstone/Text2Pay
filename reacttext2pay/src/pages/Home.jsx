import React, {Component} from 'react';
import TablePanel from '../components/TablePanel'
import NavbarPage from '../components/NavBarPage'
import CheckStatus from '../components/CheckStatus'
// import { Redirect } from 'react-router-dom'



class Home extends Component{
  render(){
    return (
      <div >
        <NavbarPage />
        <TablePanel style={{display:"inline-block"}}/>
        <TablePanel style={{display:"inline-block"}}/>
      </div>  
    );
  }
}

export default Home;