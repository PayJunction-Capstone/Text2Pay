import React, {Component} from 'react';
import Card from '../components/Card';
import NavbarPage from '../components/NavBarPage'


class Incomplete extends Component{
  

  render(){
    const incompleteList = [
      {
          title: "Dominos",
          cost: "14.38",
          description: "Pasta & Wings",
          imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
      },
      {
        title: "Pizza Hut",
        cost: "15.24",
        description: "Cheese sticks and Pizza",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
      },
      {
        title: "Freebirds",
        cost: "12.99",
        description: "Steak burrito and Hornitos",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
      },
      {
        title: "Hana Kitchen",
        cost: "9.99",
        description: "Large Chicken Bowl & Boba",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg"
      },
    ]
    return (
      <div>
        <NavbarPage/>
        <div className='homeRow'>
          {incompleteList.map((incCard, index) =>
            <Card title={incCard.title} cost={incCard.cost} 
            desc={incCard.description} image={incCard.imgUrl}/> 
          )}
        </div>  
      </div>
    );
  }
}

export default Incomplete;