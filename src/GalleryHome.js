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


export const GalleryHome = (params) =>{
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [BoxAlbum, setBoxAlbum] = useState([]);
    const dispatch = useDispatch();
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };

    useEffect(() => {
        axios
          .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=2")
          .then(function (response) {
            rebuildAlbum(response.data.data.data);
            dispatch(increment());
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);

      function rebuildAlbum(response) {
        let album = [];
        let counterAlbum = 0;
        for (let i = 0; i < response.length; i++) {
          for (let k = 0; k < response[i].image_gallery_item.length; k++) {
            if (counterAlbum < 6) {
              counterAlbum++;
              album.push(response[i].image_gallery_item[k]);
            }
          }
        }
        setBoxAlbum(album);
      }

      return(
          
        <div className="Bangsats">
            {
              BoxAlbum && BoxAlbum.map((item,index) => {
                return(
                  <div className="Gal">
                  <LightGallery elementClassNames="custom-wrapper-class" onBeforeSlide={onBeforeSlide}  > 
                          <a className="a" href={item.image_file_data}> 
                          <img className="c" alt={item.description} src={item.image_file_data} /> 
                          </a>
                          </LightGallery>
                          </div>
                )
              }

              )
            }
            <Row className="khusus-gambar">
              <div className="gamteks">
            <a href={"/gallerys"}>
              <p className='tag-p'>Gambar Lainnya{"..."}</p>
            </a>
            </div>
          </Row>
            </div>
      )
}

