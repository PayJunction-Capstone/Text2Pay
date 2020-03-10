import React from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';


const TablePanel = (props) => {

  return(
    
    
        <MDBTable btn fixed style={{marginTop:"5px"}} >
        <MDBTableHead>
          <tr>
            <th>Time</th>
            <th>Payment Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </MDBTableHead>
          <MDBTableBody rows={props.completedList} />
        </MDBTable>
  );
};

export default TablePanel;