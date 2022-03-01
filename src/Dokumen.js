import React, { Fragment, useState, useEffect, Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Pnews.css";
import { Container, ListGroup, Badg, Pagination, Badge, Accordion } from "react-bootstrap";
import { useCallback } from 'react';
import { Link } from "react-router-dom";
// import PDFViewer from 'pdf-viewer-reactjs';

export const Dokumen = (params) =>{
    const [DataResponse, setDataResponses] = useState(0);
    const axios = require("axios");
    const [IPages, setIPages] = useState([]);
    let iPages = [];
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);


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
        .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=2&per_page=5&page=" + page)
        .then(function (response) {
          setDataResponses(response.data.data.data);
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

    return(
        <Fragment>
            <Row>
                <Container>
                    <h3>Dokumen</h3>
                </Container>
                {
                    DataResponse && DataResponse.map((item, index) => {
                        return item.dokumen_item.map((itm,idx)=> {
                            return(
                                <Container>
                                  <ListGroup>
                                  <ListGroup.Item>
                                    <Link to={itm.dokumen_file_data} target="_blank" download>
                                    {itm.dokumen_file_name}
                                    </Link>
                                  </ListGroup.Item>
                                  </ListGroup>
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