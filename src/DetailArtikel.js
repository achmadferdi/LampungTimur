import React from "react";
// import "./DetailArtikel.css";
import { Card, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import moment from "moment-with-locales-es6";

const DetailArtikel = () => {
  const { id } = useParams();
  console.log("first", id);
  const axios = require("axios");
  const [dataDetailArtikel, setDataDetailArtikel] = useState(0);

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/article/" + id)
      .then(function (response) {
        console.log("console detail: " + response.data.data);
        setDataDetailArtikel(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [axios]);

  return (
    <div>
      <Row>
        <Col md={9}>
          <Container>
            <Card>
              <Card.Img variant='top' src={dataDetailArtikel.image_file_data} />
              <Card.Body>
                <Card.Title>{dataDetailArtikel.title}</Card.Title>
                {/* <span>
                  {
                    (moment.locale("id-ID"),
                    moment(dataDetailArtikel.created_at).fromNow())
                  }
                </span> */}
                &emsp;
                <span>{dataDetailArtikel.news_category_id}</span>
                <Card.Text
                  dangerouslySetInnerHTML={{
                    __html: dataDetailArtikel.content,
                  }}></Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default DetailArtikel;