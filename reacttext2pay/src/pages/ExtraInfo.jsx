import React, {Component} from 'react';
import NavbarPage from '../components/NavBarPage'
import AddInfo from '../components/AddInfo'

class ExtraInfo extends Component{
  render(){
    return (
      <div >
        <NavbarPage />
        <AddInfo/>
      </div>  
    );
  }
}
export default ExtraInfo;