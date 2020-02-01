import React from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';

const TablePanel = (props) => {
  const data_panel = {
    rows: [
      {
        1: "Chipotle charged $8.99",
        2 : "Burritos"
      },
      {
        "1": "Unibowl charged $16.37",
        "2": "Hot Pot and Boba"
      },
      {
        "1": "Hana Kitchen charged $6.20",
        "2": "BEEEF BOOWL BOIII"
      },
      {
        "1": "Albertsons charged $21.39",
        "2": "Ciroc"
      },
      {
        "1": "Albertsons charged $21.39",
        "2": "Another Ciroc"
      },
      {
        "1": "Albertsons charged $21.39",
        "2": "Another one..."
      },
      {
        "1": "Albertsons charged $21.39",
        "2": "Oh boy"
      }
    ]
  };

  return(
    
    <MDBCard narrow style={{marginTop:"25px",width: "40%",display:"inline-block"}}>
      <MDBCardHeader className="info-color">
        <div style={{color: "white"}}>Transaction History</div>
      </MDBCardHeader>
      <MDBCardBody cascade>
        <MDBTable btn fixed style={{marginTop:"-21px"}} >
          <MDBTableBody rows={data_panel.rows} />
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default TablePanel;