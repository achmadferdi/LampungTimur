import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./News.css";
import { Container } from "react-bootstrap";
import moment from "moment/min/moment-with-locales";

export const News = (params) => {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");
  const content =
    "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.";
  const MAX_LENGTH = 150;

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=2&per_page=2&sort_by=created_at")
      .then(function (response) {
        setDataResponses(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleLength(value, lengths) {
    if (value.length < lengths) {
      return value;
    } else {
      return value.substring(0, lengths);
    }
  }

    return (
      <Fragment>
        <Row>
          <Col className='berita-terbaru'>
            <h3>Berita Terbaru</h3>
            <Row xs={1} md={2} className = 'g-4'>
              {
                DataResponse != null ?
                DataResponse && DataResponse.map ((item, index) => {
                  return(
                    <Col>
                      <Card className= 'stylecard'>
                        <Card.Img variant = 'top' width={400} height={200} src = {item.image_file_data} />
                        <Card.Body>
                          <Card.Title>{handleLength(item.title, 20)}</Card.Title>
                          <a href="#" className="text-muted">
                                {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                            <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                          <Card.Text>{handleLength(item.content, 120)} ... </Card.Text>
                          <Button variant="outline-primary" href={`/news/DetailArtikel/${item.id}`}> Baca Selengkapnya...</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    
                  )
                }
                ) : <span className='text-black'>Loading....</span>
              }

            </Row>
          </Col>
        </Row>
        </Fragment>
    );
  
  
};

export default News;
