import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Pnews.css";
import { Container, ListGroup, Badg, Pagination, Badge } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import moment from "moment/min/moment-with-locales";

export const Pnews = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [Kategori, setKategori] = useState(0);
    const [Umum, setUmum] = useState(0);
  
    useEffect(() => {
        gettingData(1);
    }, []);

    function handleLength(value, lengths) {
        if (value.length < lengths) {
          return value;
        } else {
          return value.substring(0, lengths);
        }
      }
      let tooglePaginate = true;
      function gettingData(page) {
        setDataResponses(null);
    axios
        .get("http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=4&page=" + page)
        .then(function (response) {
          setDataResponses(response.data.data.data);
          iPages = [];
        //   if (tooglePaginate) {
            for (let number = 1; number <= response.data.data.last_page; number++) {
              iPages.push(
                <Pagination.Item onClick={() => gettingData(number)} key={number} active={number === response.data.data.current_page}>
                  {number}
                </Pagination.Item>
              );
              setIPages(iPages);
            //   tooglePaginate = false;
            }
          
          forceUpdate();
        })
        .catch(function (error) {
          console.log(error);
        });

    }
    useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/article/categories/2")
        .then(function (response) {
          setKategori(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=2")
        .then(function (response) {
          setUmum(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
  

    
  
      return (
        <Fragment>
            <Row>
            
            <Col md={8} sm={12} xs={12} className='seluruh-berita'>
                <Container>
                <Col>
              <h3>  Berita Terbaru</h3>
              </Col>
              </Container>
                {
                  DataResponse != null ?
                  DataResponse && DataResponse.map ((item, index) => {
                    return(
                        <Container>
                        <Card>
                          <Card.Img variant = 'top' width={100} height={100} src = {item.image_file_data} />
                          <Card.Body>
                            <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                            <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                            <Card.Text>{handleLength(item.content, 120)} ... </Card.Text>

                            <Link to={`/news/DetailArtikel/${item.id}`}>Selengkapnya....</Link>
                          </Card.Body>
                        </Card>
                        </Container>
                      
                      
                    )
                  }
                  ) : <span className='text-black'>Loading....</span>
                }
                <Container>
                <Col>
                <Pagination>{IPages}</Pagination>
                </Col>
                </Container>
            </Col>
            
            <Col md={4} sm={12} xs={12}>
                <Container>
                <Col>
                <h3>Berita Umum</h3>
                </Col>
                </Container>
                {
                  Umum != null ?
                  Umum && Umum.map ((item, index) => {
                    return(
                        <Container>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                                <Card.Text>
                                {handleLength(item.content, 120)} ...
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                    </Card>
                                    </Container>
                      
                      
                    )
                  }
                  ) : <span className='text-black'>Loading....</span>
                }
                <Container>
              <Col className="Kategori">
              <h3>Kategori</h3>
              </Col>
              </Container>
              <Container>
              <Col md={8} sm={12} xs={12}>
              {
                Kategori && Kategori.map  ((item, index) => {
                  return(
                    
                    <ListGroup as="ol" >
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div >
                    <a>
                  {item.nama_kategori}
                  </a>
                  </div>
                  <Badge variant="primary" pill>{item.artikel_count}</Badge>
                </ListGroup.Item>
              </ListGroup>
                  
                  )
                }

                )
              }
                </Col>
                </Container>

            </Col>
            
            </Row>
          </Fragment>
      );
    
    
  };
  
  export default Pnews;