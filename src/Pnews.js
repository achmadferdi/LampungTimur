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
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
import Loading from 'react-fullscreen-loading';

export const Pnews = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [Kategori, setKategori] = useState(0);
    const [Umum, setUmum] = useState(0);
    const dispatch = useDispatch();
    const [ArtikelByKategori, setArtikelByKategori] = useState("");
    const count = useSelector((state) => state.counter.value)
    const [LoaderComplete, setLoaderComplete] = useState(true);
    const [ActiveArtikelClassname, setActiveArtikelClassname] = useState(
      "d-flex justify-content-between align-items-start kategori-list-article"
    );
  
    useEffect(() => {
        gettingData(1);
    }, [ArtikelByKategori]);

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
        .get("http://adminmesuji.embuncode.com/api/article?instansi_id=2&slug=" + ArtikelByKategori + "&sort_by=created_at&per_page=4&page=" + page)
        .then(function (response) {
          setDataResponses(response.data.data.data);
          dispatch(increment());
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
          dispatch(increment());
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
          dispatch(increment());
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    function handleArticleChange(artikelSlug) {
      console.log("artikelSlug", artikelSlug);
      // getData(1, artikelSlug)
      setArtikelByKategori(artikelSlug);
      setActiveArtikelClassname(
        "d-flex justify-content-between align-items-start kategori-list-article kategori-list-article-active"
      );
    }

    useEffect(() => {
      console.log('LoaderComplete', LoaderComplete)
      if (count == 3) {
        setLoaderComplete(false)
      }
    }, [count, LoaderComplete]);
  
      return (
        <Fragment>
           <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
          <Container>
            
            <Row className="seluruh-pengumuman">
            <Col md={9} sm={12} xs={12} >
                <Col>
              <h3 className="Pengtext">Artikel Terbaru</h3>
              </Col>
                {
                  DataResponse != null ?
                  DataResponse && DataResponse.map ((item, index) => {
                    return(
                        <Card className="artikel">
                          <Card.Body>
                          <Card.Img className="imgnews" variant = 'left' width={300} height={200} src = {item.image_file_data} />
                            <Row className="cardart">
                            <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                            <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                            <Card.Text>{handleLength(item.intro, 120)} ... </Card.Text>

                            <Link to={`/artikel/DetailArtikel/${item.id}`}> Baca Selengkapnya....</Link>
                            </Row>
                          </Card.Body>
                        </Card>
                      
                      
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
            
            <Col md={3} sm={12} xs={12}>
            <Container>
              <Col className="Kategori">
              <h3>Kategori</h3>
              </Col>
              </Container>
              <Container>
              {
                Kategori && Kategori.map  ((item, index) => {
                  return(
                    
                    <ListGroup className = "kategori" onClick={() => handleArticleChange(item.slug)} as="ol" >
                <ListGroup.Item  as="li" className="d-flex justify-content-between align-items-start">
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
                </Container>
                <Container className="artikelumum">
                <Col>
                <h3>Artikel Umum</h3>
                </Col>
                </Container>
                {
                  Umum != null ?
                  Umum && Umum.map ((item, index) => {
                    return(
                        <Container>
                        <Card className="artikel" style={{ width: '18rem' }}>
                            <Card.Body>
                            <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                            <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                            <Card.Text>{handleLength(item.intro, 120)} ... </Card.Text>
                                    <Button href={`/artikel/DetailArtikel/${item.id}`} variant="primary">Selengkapnya</Button>
                                    </Card.Body>
                                    </Card>
                                    </Container>
                      
                      
                    )
                  }
                  ) : <span className='text-black'>Loading....</span>
                }
                
            </Col>
            
            </Row>
            </Container>
          </Fragment>
      );
    
    
  };
  
  export default Pnews;