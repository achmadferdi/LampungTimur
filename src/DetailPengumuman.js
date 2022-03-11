import React from "react";
// import "./DetailArtikel.css";
import { Card, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";

const DetailArtikel = () => {
  const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/news/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailArtikel(response.data.data);
        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  return (
    <div>
        <Container>
      <Row>
        <Col>
          <Container>
            <Card>
              <Card.Img variant='top' src={dataDetailArtikel.image_file_data} />
              <Card.Body>
                <Card.Title>{dataDetailArtikel.title}</Card.Title>
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
    </div>
  );
};

export default DetailArtikel;