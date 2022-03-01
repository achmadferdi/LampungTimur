import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";


export const Navigation = (params) => {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");

  
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/menus?instansi_id=5")
      .then(function (response) {
        setDataResponses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <Fragment>
      
      {console.log(DataResponse)}
      <div className="margin">
        <Row>
          <Col>
          <img id="center" className="logo-kabupaten" src="Dinkes.svg" />
          </Col>
        </Row>
      </div>
          {/* <Menu DataResponse={DataResponse}/> */}
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        {
          DataResponse && DataResponse.map((m,i) => {
            console.log('DataResponse22', DataResponse);
            return(
              <>
              {
                m.children.length > 0 ? <> 
                <NavDropdown title = {m.name}>
                
                {
                  m.children && m.children.map((h,k) => {
                    {console.log("Nama Children "+h.name)}
                    return <NavDropdown.Item eventKey="4.1" href={h.url}>{h.name}</NavDropdown.Item>
                    
                  })
                }
                  </NavDropdown>
                  </> :   <Nav.Link href={m.url}>{m.name}</Nav.Link>
              
              }
              </>
              )
          })
      
      }
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    </Fragment>
  );
};