import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


class Card extends Component {
    render(){
        return ( 
            <MDBCol>
                <MDBCard className = "homecard">
                <div>
                    <img className="card-img-top" src={this.props.image} style= {{width:"100%",height:"130px"}} />
                </div>
                    <MDBCardBody >
                        <MDBCardTitle > 
                            {this.props.title} 
                        </MDBCardTitle> 
                        <MDBCardText >
                            {this.props.desc}
                        </MDBCardText> 
                        <MDBBtn href = "#" color="info" > 
                            Pay ${this.props.cost} 
                        </MDBBtn> 
                    </MDBCardBody> 
                </MDBCard> 
            </MDBCol>
        );
    }
    
}

export default Card;