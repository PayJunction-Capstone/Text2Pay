import React, {Component} from 'react';
import NavbarPage from '../components/NavBarPage'
import AddInfo from '../components/AddInfo'
import CheckStatus from '../components/CheckStatus'


class ExtraInfo extends Component{
  render(){
    return (
      <div >
        <CheckStatus/>
        <NavbarPage />
        <AddInfo/>
      </div>  
    );
  }
}
export default ExtraInfo;