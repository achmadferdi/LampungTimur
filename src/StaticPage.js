import React from "react";
// import "./DetailArtikel.css";
import { Card, Container, Col, Row, TabContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
import Loading from 'react-fullscreen-loading';

const StaticPage = () => {
    const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [StaticPage, setStaticPage] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value)
  const [LoaderComplete, setLoaderComplete] = useState(true);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/static-page/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setStaticPage(response.data.data);
        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  useEffect(() => {
    console.log('LoaderComplete', LoaderComplete)
    if (count == 1) {
      setLoaderComplete(false)
    }
  }, [count, LoaderComplete]);  

  return (
    <div>
        <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
    <Container>
  <Row>
    <Col>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>{StaticPage.title}</Card.Title>
            <Card.Text> <a>Created by : </a> {StaticPage.created_by}</Card.Text>
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: StaticPage.content,
              }}></Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Col>
  </Row>
  </Container>
</div>
  )
}

export default StaticPage;

