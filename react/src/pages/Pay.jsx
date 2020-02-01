import React, {Component} from 'react';
import PayCard from '../components/PayCard'
import NavbarPage from '../components/NavBarPage'

class Home extends Component{
  render(){
    return (
      <div>
        <NavbarPage/>
        <PayCard style={{topMargin:"10px",display:"inline-block"}}/> 
      </div>  
    );
  }
}

export default Home;

//this.setState({show: false})