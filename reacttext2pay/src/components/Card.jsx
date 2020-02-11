import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


class Card extends Component {
    render(){
        return ( 
            <MDBCol>
                <MDBCard className = "homecard" style={{width:"500px",height:"125px"}}>
                    <MDBCardBody >
                        <MDBCardText >
                            Requesting ${this.props.cost} to {this.props.title}: {this.props.desc} 
                        </MDBCardText> 
                        <MDBCardTitle > 
                            
                        </MDBCardTitle> 
                        <div style={{display:"inline-block"}}>
                        <MDBBtn color="info" style={{width:"150px",height:"40px"}}> 
                            Remind
                        </MDBBtn> 
                        <MDBBtn color="light" style={{width:"150px",height:"40px"}}> 
                            Cancel
                        </MDBBtn> 
                        </div>
                    </MDBCardBody> 
                </MDBCard> 
            </MDBCol>
        );
    }
    
}

export default Card;