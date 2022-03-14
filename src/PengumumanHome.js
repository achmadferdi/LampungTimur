import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Pnews.css";
import { ListGroup, Pagination, Badge } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";

export const PengumumanHome = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [Instansi, setInstansi] = useState(0);
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [Kategori, setKategori] = useState(0);
    const dispatch = useDispatch();
    const [ArtikelByKategori, setArtikelByKategori] = useState("");
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

    var url = ''
    if (ArtikelByKategori == '') {
      url = "http://adminmesuji.embuncode.com/api/news?instansi_id=2&sort_by=created_at&sort_type=desc&per_page=4&page=" + page
    }
    else {
      url = "http://adminmesuji.embuncode.com/api/news?instansi_id=2&slug=" + ArtikelByKategori + "&sort_by=created_at&sort_type=desc&per_page=4&page=" + page
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
          .get("http://adminmesuji.embuncode.com/api/instansi/detail/5")
          .then(function (response) {
            setInstansi(response.data.data);
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
  
  
      return (
        <Fragment>
            {console.log(Instansi)}
            <Row className="seluruh-pengumuman">
            
            <Col md={9} sm={12} xs={12} >
                <Col>
              <h3 className="Pengtext">Berita Terbaru</h3>
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

                        <Link to={`/berita/DetailBerita/${item.id}`}> Baca Selengkapnya....</Link>
                        </Row>
                      </Card.Body>
                    </Card>
                      
                      
                    )
                  }
                  ) : <span className='text-black'>Loading....</span>
                }
                <Col>
                <Button variant="outline-primary" href="/berita">Seluruh Berita</Button>{' '}
                </Col>
            </Col>
            
            <Col md={3} sm={12} xs={12}>
              <Col className="Kategori">
              <h3>Kategori</h3>
              </Col>
              {
                Kategori && Kategori.map  ((item, index) => {
                  return(
                    
                    <ListGroup className = "kategori" onClick={() => handleArticleChange(item.slug)} as="ol" >
                <ListGroup.Item  as="li" className="d-flex justify-content-between align-items-start">
                  <div  >
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