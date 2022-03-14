import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container, ListGroup, Badg, Pagination, Badge } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
import Loading from 'react-fullscreen-loading';

export const GalVid = (params) => {
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const [Video, setVideo] = useState(0);
    const forceUpdate = useCallback(() => updateState({}), []);
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)
    const [LoaderComplete, setLoaderComplete] = useState(true);
    const onBeforeSlide = (detail) => {
      const { index, prevIndex } = detail;
      console.log(index, prevIndex);
  };

  useEffect(() => {
        gettingData(1);
    }, []);

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
    axios
        .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=5&per_page=2&page=" + page)
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
        console.log('LoaderComplete', LoaderComplete)
        if (count == 1) {
          setLoaderComplete(false)
        }
      }, [count, LoaderComplete]);

    return(
        <div>
            <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
            <h3 className="GalVideo">Galeri video</h3>
            <div className="Bangsat">
            {
              
              DataResponse != null ?
              DataResponse && DataResponse.map((item, index) =>{
                return item.image_gallery_item.map((itm, idx) => {
                  return(
      
                    <div className="Vido" key={idx}>
                    <div className="tile-videos">
                      <iframe id="player" type="text/html" src={`https://www.youtube.com/embed/${itm.video_url}?`} className="player-wrapper" ></iframe>
                      {/* <ReactPlayer url="https://www.youtube.com/watch?v=ZuxG5HjqyNg" className="player-wrapper" width="100%" height="100%" controls={true} /> */}
                      <div className="text-videos">
                        <h5 style={{ marginTop: '4rem', marginBottom: '0rem', fontSize: '20px' }}>{itm.description}</h5>
                        {/* <h2 className="animate-text-videos">More lorem ipsum bacon ipsum.</h2> */}
                      </div>
                    </div>
                  </div>
                  )
                }

                )
              }

              ) : <span className='text-black'>Loading....</span>

            }
            <Container>
                <Col>
                <Pagination>{IPages}</Pagination>
                </Col>
            </Container>
            </div>

            

            
        </div>
    )


}