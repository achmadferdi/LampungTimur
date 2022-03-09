import React, { Fragment, useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const Footer = (params) => {
  const [DataResponse, setDataResponses] = useState(0);
  const [Instansi, setInstansi] = useState(0);
  const axios = require("axios")

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/instansi/detail/5")
      .then(function (response) {
        setInstansi(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <footer className="site-footer">
      <div className="main-footer text-white background-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Tentang Kami</h3>
              </div>
              <p>
              {Instansi.tentang}
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Buku Tamu</h3>
              </div>
              <Form>
              <Form.Group  controlId="formBasicName">
                <Form.Label className="mb" >Nama :</Form.Label>
                <Form.Control className="placehold" type="name" placeholder="masukan nama" />
              </Form.Group>
              <Form.Group  controlId="formBasicEmail">
              <Form.Label className="mb">Email :</Form.Label>
              <Form.Control className="placehold" type="email" placeholder="masukan email" />
            </Form.Group>
            <Form.Group  controlId="exampleForm.ControlTextarea1">
            <Form.Label className="mb">Isi :</Form.Label>
            <Form.Control className="placehold" as="textarea" rows={5} />
          </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
              </Form>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Maps</h3>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.360895135779!2d105.52151881476374!3d-5.045102096338032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4090a28340483d%3A0xf5c610a7e2377d15!2sDinas%20Kesehatan%20Kab.%20Lampung%20Timur!5e0!3m2!1sid!2sid!4v1645085786397!5m2!1sid!2sid" 
              width="100%" height="300" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <p>&copy; Copyright 2022. Website Resmi Dinas Kesehatan Kabupaten Lampung Timur | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
