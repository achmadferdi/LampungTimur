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

export const PengumumanHome = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [Instansi, setInstansi] = useState(0);
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
        .get("http://adminmesuji.embuncode.com/api/news?instansi_id=2&per_page=3")
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
        .get("http://adminmesuji.embuncode.com/api/news/categories/2")
        .then(function (response) {
          setKategori(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    useEffect(() => {
        axios
          .get("http://adminmesuji.embuncode.com/api/instansi/detail/2")
          .then(function (response) {
            setInstansi(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);
  
  
      return (
        <Fragment>
            {console.log(Instansi)}
            <Row className="seluruh-pengumuman">
            
            <Col md={9} sm={12} xs={12} >
                <Col>
              <h3 className="Pengtext">Pengumuman</h3>
              </Col>
                {
                  DataResponse != null ?
                  DataResponse && DataResponse.map ((item, index) => {
                    return(
                        <Card>
                          <Card.Body>
                            <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                            <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                            <Card.Text>{handleLength(item.intro, 120)} ... </Card.Text>

                            <Link to={`/pengumuman/DetailPengumuman/${item.id}`}> Baca Selengkapnya....</Link>
                          </Card.Body>
                        </Card>
                      
                      
                    )
                  }
                  ) : <span className='text-black'>Loading....</span>
                }
                <Col>
                <Button variant="outline-primary" href="/pengumuman">Seluruh Berita</Button>{' '}
                </Col>
            </Col>
            
            <Col md={3} sm={12} xs={12}>
              <Col className="Kategori">
              <h3>Kategori</h3>
              </Col>
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
                  <Badge variant="primary" pill>{item.news_count}</Badge>
                </ListGroup.Item>
              </ListGroup>
                  
                  )
                }

                )
              }
              <Col className="KepalaDinas">
            
                          <div>
                              <h3>Kepala Dinas</h3>
                              <img width="300px" src={Instansi.foto_kepala} alt="Foto Kepala" />
                              <h2 className="namakepala">{Instansi.nama_kepala}</h2>
                          </div>
      
              </Col>
            </Col>
            
            </Row>
          </Fragment>
      );
    
    
  };
  
  export default PengumumanHome;