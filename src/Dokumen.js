import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Pnews.css";
import { Container, Pagination, } from "react-bootstrap";
import { useCallback } from 'react';
import moment from "moment/min/moment-with-locales";
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
    const [Adaisi, setAdaisi] = useState(0);


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
      function gettingData(page, slug, title) {
        let urlTitle = "";
    if (title != null) {
      urlTitle = "&title=" + title;
    } else {
      urlTitle = "";
    }
        setDataResponses(null);
    axios
        .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=8" + urlTitle + "&per_page=6&page=" + page)
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
          setAdaisi(response.data.data.total);
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

     function handleSearchChange(value) {
      console.log("value", value.target.value);
      if (value.key === "Enter") {
        if (value.target.value != "") {
          gettingData(1, null, value.target.value);
        } else {
          gettingData(null, null);
        }
      }
    }

    return(
        <Fragment>
          <Loading loading={LoaderComplete} background="#FFFFFF" loaderColor="#3498db" />
            <Container>
            <Row className="seluruh-pengumuman">
            <Col>
                <Container>
                    <h3 className="Pengtext">Dokumen</h3>
                </Container>

                {
                  
                    DataResponse && DataResponse.map((item, index) => {
                      return item.dokumen_item.map((itm,idx)=> {
                        return (
                          <Card className="doc">
                             <Card.Body>
                             <Card.Img className="imgnews" variant = 'left' width={125} height={125} src = '/dokumen.png'/>
                             <Row className="cardart">
                             <Card.Title> {itm.dokumen_file_name} </Card.Title>
                             <a href="#" className="text-muted">
                            {moment(item.created_at).format('dddd, Do MMMM YYYY  ')}
                              </a>
                              <Card.Text>{(moment.locale('id-ID'), moment(item.created_at).fromNow())}</Card.Text>
                              <a href={"/pdf/" + item.slug + "/" + itm.dokumen_file_name.replace(/\s/g, "")}> Baca Selengkapnya....</a>
                             </Row>
                             </Card.Body>
                          </Card>
                            
                        )
                    }

                    )
                      
                        
                    }

                    )
                }
                < Container>
                <Col>
                <Pagination>{IPages}</Pagination>
                </Col>
                </Container>
                </Col>
            </Row>
            </Container>
        </Fragment>
    )
}