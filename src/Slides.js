import Carousel from 'react-bootstrap/Carousel';
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";
// import dummySlide from '../image/dummySlide.png';

function Slides() {
  const [DataResponse, setDataResponses] = useState(0);
  const axios = require("axios");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=5")
      .then(function (response) {
        setDataResponses(response.data.data.data);
        dispatch(increment());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  

  
  return (
  <Fragment>
            <Carousel className='style-galery'>
              { DataResponse && DataResponse.map((item,index) => {
                return item.image_gallery_item.map((itm,idx) => {
                  return (
                    <Carousel.Item key={idx}>
                    <img
                      className='d-block w-100 size-img'
                      width={900} height={500}
                      src={itm.image_file_data}
                      alt='First slide'
                    />
                  </Carousel.Item>
                  )
                }

                )
              }

              )
              }
           
          </Carousel>
          </Fragment>

);
}

export default Slides;
