import React, { Fragment, useState, useEffect, Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Pnews.css";
import { Container, ListGroup, Badg, Pagination, Badge, Accordion } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
// import PDFViewer from 'pdf-viewer-reactjs';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
import Loading from 'react-fullscreen-loading';

export const Dokumen = (params) =>{
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)
    const [LoaderComplete, setLoaderComplete] = useState(true);


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
        .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=8&per_page=5&page=" + page)
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
        <Fragment>
          <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
            <Row>
                <Container>
                    <h3>Dokumen</h3>
                </Container>
                {
                    DataResponse && DataResponse.map((item, index) => {
                        return item.dokumen_item.map((itm,idx)=> {
                            return(
                                <Container>
                                  <div className='row offerList'>
                                  <div className='col-md-12'>
                                  <div className='media p-2'>
                                  <img
                                  className='d-flex mr-3 image-dok'
                                  src='/dokumen.png'
                                  alt='Generic placeholder image'
                                  />
                                  <div className='media-body'>
                                   <h5 className='mt-0'>
                                    <a href={"/pdf/" + item.slug + "/" + itm.dokumen_file_name.replace(/\s/g, "")}>
                                    {itm.dokumen_file_name}
                                    </a>
                                    </h5>
                                  <p className='text_grey mb-0 '>
                                 <span className='text_blue'>Created on: </span>

                                 {moment(itm.created_at).format("L")}
                                 {/* {itm.created_at} | */}
                                <span className='text_blue'> Created by: </span>
                                {itm.created_by}
                                </p>
                                  <span className='badge badge-pill badge-primary'>
                                  {" "}
                                  Update By: {itm.updated_by}
                                  </span>
                                   </div>
                                  </div>
                                  </div>
                                  </div>
                                </Container>
                            )
                        }

                        )
                    }

                    )
                }
            </Row>
        </Fragment>
    )
}