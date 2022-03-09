import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import News from './News';
import Slides from './Slides';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DokumenHome } from './DokumenHome';
import { Container } from 'react-bootstrap';
import { GalleryHome } from './GalleryHome';
import PengumumanHome from './PengumumanHome';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'react-fullscreen-loading';

export const Home = (params) => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [LoaderComplete, setLoaderComplete] = useState(true);
  console.log('count di Main js', count)

  useEffect(() => {
    console.log('LoaderComplete', LoaderComplete)
    if (count == 7) {
      setLoaderComplete(false)
    }
  }, [count, LoaderComplete]);


    return (
      
      <div className="App">
        <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
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