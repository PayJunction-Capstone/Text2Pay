import React, {Component} from 'react';
import RequestCard from "../components/RequestCard"
import NavbarPage from '../components/NavBarPage'

class Home extends Component{
  render(){
    return (
      <div>
        <NavbarPage/>
        <div className='homeRow'>
          <RequestCard/>
        </div>  
      </div>
    );
  }
}

export default Home;