import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import News from './News';
import Slides from './Slides';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DokumenHome } from './DokumenHome';
import { Container } from 'react-bootstrap';
import { GalleryHome } from './GalleryHome';
import PengumumanHome from './PengumumanHome';

export const Home = (params) => {
    return (
      
      <div className="App">
        <Slides />
        <Container>
          <section>
        <Row>
          <Col md={9} sm={12} xs={12}>
        <News />
        </Col>
        <Col md={3} sm={12} xs={12}>
          <DokumenHome />
        </Col>
        </Row>
        </section>
          <PengumumanHome />
        <h3 className='Galtext'>Galeri</h3>
        <GalleryHome />
        </Container>
      </div>
    );
  }