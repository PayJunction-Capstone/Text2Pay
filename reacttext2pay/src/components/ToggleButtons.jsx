import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBBtn, MDBBtnGroup, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const ToggleButtons = (props) => {
  return (
    <MDBBtnGroup style={{display:"inline-block"}}>
      <MDBBtnGroup>
        <MDBBtn color="light" size="sm" style={{width:"80px",height:"45px"}} onClick={()=> props.cardState.setState({splitMethod: "Quantity"})}>Qty</MDBBtn>
        <MDBBtn color="light" size="sm" style={{width:"80px",height:"45px"}} onClick={()=> props.cardState.setState({splitMethod: "Amount"})}>Amt</MDBBtn>
      </MDBBtnGroup>
      <MDBBtnGroup>
        <MDBBtn color="success" style={{width:"120px",height:"45px",borderRadius: "8px"}} onClick={()=> props.cardState.split()}>
          Split
        </MDBBtn>
      </MDBBtnGroup>
    </MDBBtnGroup>
  );
}

export default ToggleButtons;