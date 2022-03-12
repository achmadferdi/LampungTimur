import React, { Fragment, useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Routes, Route, Link } from "react-router-dom";

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
              <div className="sosmed">
                <p>
                  Ikuti sosial media kami :
                </p>
              </div>
              <div >
                <a href={Instansi.instagram}><h1  class="fa-brands fa-instagram"></h1></a>
              <a href={Instansi.facebook}><h1 class="fab fa-facebook-f"></h1></a>
              <a href={Instansi.youtube}><h1 class="fa-brands fa-youtube"></h1></a>
              </div>
              
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Alamat Lengkap :</h3>
              </div>
              {Instansi.alamat}
              {/* <Form>
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
              </Form> */}
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Maps</h3>
              </div>
              <iframe src={Instansi.google_map} 
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
