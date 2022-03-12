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
  const [Instansi, setInstansi] = useState(0);
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
  
  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/5")
      .then(function (response) {
        setInstansi(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <Fragment>
      
      {console.log(DataResponse)}
      <div className="margin">
      
      <Container>
             <Row>
              <Col>
              <img id="center" className="logokabupaten" src={Instansi.logo_instansi}></img>
              <h3 className="Logtext">{Instansi.nama_instansi}</h3>
              </Col>
              <Col md={3} className="logmail">
              <img id="center" className="email" src="/email.png" width="50px" height="50px"></img>
              <div>
                <p className="mail">Email : <h2 className="surel">{Instansi.email}</h2> </p>
              </div>
              </Col>
              <Col md={3} className="logphone">
              <img id="center" className="email" src="/phone.png" width="50px" height="50px"></img>
              <div>
                <p className="mail">Hubungi Kami : <h2 className="surel">{Instansi.nomor_telepon}</h2> </p>
              </div>
              </Col>
              </Row>
              </Container>
      </div>
          {/* <Menu DataResponse={DataResponse}/> */}
          <Navbar sticky="top" collapseOnSelect expand="lg" className="Navigasi" >
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
                <NavDropdown title = {m.name} >
                
                {
                  m.children && m.children.map((h,k) => {
                    {console.log("Nama Children "+h.name)}
                    return(
                      <>
                      {
                        h.children.length > 0 ? <> 
                        <NavDropdown title = {h.name}>
                          {
                            
                            h.children && h.children.map((j,o) =>  {
                              return( 
                                <>
                                
                      {
                        j.children.length > 0 ? <> 
                        <NavDropdown title = {j.name}>
                          {
                            j.children && j.children.map((k,l) => {
                              return <NavDropdown.Item eventKey="4.1" href={k.url} >{k.name}</NavDropdown.Item>
                            }

                            )
                          }
                        </NavDropdown>
                        
                  </> : j.static_page != null ? (
                    <Nav.Link href={j.static_page}>{j.name}</Nav.Link>
                  ) : (
                    <Nav.Link href={j.url}>{j.name}</Nav.Link>
                  )
              
                      }
                      </>
                              )
                            }

                            )
                          }
                        </NavDropdown>
                  </> : h.static_page != null ? (
                    <Nav.Link href={h.static_page}>{h.name}</Nav.Link>
                  ) : (
                    <Nav.Link href={h.url}>{h.name}</Nav.Link>
                  )
              
                      }
                      </>
                    )
                    
                  })
                }
                
                  </NavDropdown>

                  </> : m.static_page != null ? (
                    <Nav.Link href={m.static_page}>{m.name}</Nav.Link>
                  ) : (
                    <Nav.Link href={m.url}>{m.name}</Nav.Link>
                  )
                  
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