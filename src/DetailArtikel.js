import React from "react";
import { Card, Container, Col, Row, TabContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
import Loading from 'react-fullscreen-loading';
import Button from "react-bootstrap/Button";

const DetailArtikel = () => {
  const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value)
  const [LoaderComplete, setLoaderComplete] = useState(true);
  const [Umum, setUmum] = useState(0);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailArtikel(response.data.data);
        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

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

  useEffect(() => {
    console.log('LoaderComplete', LoaderComplete)
    if (count == 1) {
      setLoaderComplete(false)
    }
  }, [count, LoaderComplete]);

  function handleLength(value, lengths) {
    if (value.length < lengths) {
      return value;
    } else {
      return value.substring(0, lengths);
    }
  }
 
  return (
    <div>
        <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
        <Row className="seluruh-pengumuman">
        <Col md={9} sm={12} xs={12}>
        <Container>
      <Row>
        <Col>
          <Container>
            <Card>
            <Card.Body className="cardart"> 
              <Card.Img className="cardimg" height={500} variant='top' src={dataDetailArtikel.image_file_data} />
                <Card.Title>{dataDetailArtikel.title}</Card.Title>
                            <Card.Text>{(moment.locale('id-ID'), moment(dataDetailArtikel.created_at).format('dddd, Do MMMM YYYY  '))}</Card.Text>
                <Card.Text> <a>Tags : </a> {dataDetailArtikel.news_category_id}</Card.Text>
                <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: dataDetailArtikel.content,
                  }}></Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
      </Container>
      </Col>
      <Col className="detmum" md={3} sm={12} xs={12}>
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
    </div>
  );
};

export default DetailArtikel;