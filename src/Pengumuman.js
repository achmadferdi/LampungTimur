import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Pnews.css";
import { Container, ListGroup, Pagination, Badge } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./Counter";
import Loading from 'react-fullscreen-loading'

export const Pengumuman = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [Instansi, setInstansi] = useState(0);
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
    const [Adaisi, setAdaisi] = useState(0);
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
      function gettingData(page, slug, title) {
        let urlTitle = "";
    if (title != null) {
      urlTitle = "&title=" + title;
    } else {
      urlTitle = "";
    }
        setDataResponses(null);
        
        var url = ''
    if (ArtikelByKategori == '') {
      url = "http://adminmesuji.embuncode.com/api/news?instansi_id=2" + urlTitle + "&sort_by=created_at&sort_type=desc&per_page=6&page=" + page
    }
    else {
      url = "http://adminmesuji.embuncode.com/api/news?instansi_id=2" + urlTitle + "&slug=" + ArtikelByKategori + "&sort_by=created_at&sort_type=desc&per_page=6&page=" + page
    }
    axios
        .get(url)
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
          setAdaisi(response.data.data.total);
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
          dispatch(increment());
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/news?instansi_id=2&sort_by=total_hit&per_page=2")
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

    function handleSearchChange(value) {
      console.log("value", value.target.value);
      if (value.key === "Enter") {
        if (value.target.value != "") {
          gettingData(1, null, value.target.value);
        } else {
          gettingData(null, null);
        }
      }
    }
  
      return (
        <Fragment>
           <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
            <Container>
            <Row className="seluruh-pengumuman">
            
            <Col md={9} sm={12} xs={12} >
                <Col>
              <h3 className="Pengtext">Berita Terbaru</h3>
              </Col>
                {
                  DataResponse != null ?(
                  Adaisi != 0 ? (
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

                            <Link to={`/berita/DetailBerita/${item.id}`}> Baca Selengkapnya....</Link>
                            </Row>
                          </Card.Body>
                        </Card>
                      
                      
                    )
                  }
                  )
                  ) : <div className='search-error-bg d-flex justify-content-center align-items-center'>
                  <div className='col-11 col-sm-8 col-md-6 col-lg-5 search-error d-flex flex-column justify-content-center align-items-center'>
                    <img src='data-not-found.png' alt='searc img' className='img-fluid search-error-img' />
                    <p className='search-error-heading text-center'>Maaf berita yang anda cari tidak ditemukan</p>
                    <p className='search-error-text text-center'>Silahkan dicari kembali</p>
                  </div>
                  </div>
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
              <div className='pembungkus-search'>
            <div className='main'>
              <div className='form-group has-search'>
                <span className='fa fa-search form-control-feedback' />
                <input onKeyDown={handleSearchChange} type='text' className='form-control' placeholder='Cari Berita' />
              </div>
            </div>
          </div>
              </Container>
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
                  <Badge variant="primary" pill>{item.news_count}</Badge>
                </ListGroup.Item>
              </ListGroup>
                  
                  )
                }

                )
              }
                </Container>
                <Container className="artikelumum">
                <Col>
                <h3>Berita Populer</h3>
                </Col>
                </Container>
                {
                  Umum != null ?
                  Umum && Umum.map ((item, index) => {
                    return(
                        <Container>
                        <Card className="artikel">
                            <Card.Body>
                            <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                            <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                            <Card.Text>{handleLength(item.intro, 120)} ... </Card.Text>
                                    <Button href={`/berita/DetailBerita/${item.id}`} variant="primary">Selengkapnya</Button>
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
  
  export default Pengumuman;