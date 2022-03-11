// import PdfViewerComponent from './PdfViewerComponent';
import React, { Fragment, useEffect, useState } from 'react';
import  { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./Counter";

export const DocumentViewerComponent = (params) =>{
    let { slug } = useParams();
    let { filename } = useParams();
    const [DataDokumen, setDataDokumen] = useState();
    const axios = require("axios");
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://adminmesuji.embuncode.com/api/dokumen/" + slug)
        .then(function (response) {
            setDataDokumen(response.data.data)
            dispatch(increment());
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    return(
        <div>
            {
                DataDokumen && DataDokumen.map((item, index) => {
                    console.log('item.dokumen_file_data', item.dokumen_file_data)
                    // if (item.dokumen_file_name.replace(/\s/g, '') == filename.replace(/\s/g, '')) {
                        return(
                            // <div className="PDF-viewer">
			                //   <PdfViewerComponent
				            //     document={`data:application/pdf;base64,${item.dokumen_file_data}`}
			                //   />
		                    // </div>
                            <Fragment>
                                <iframe className='iframe-pdf' style={{ width: '100%', height: '500px' }} src={`data:application/pdf;base64,${item.dokumen_file_data}`} title="title">
                                            Presss me: <a href={`data:application/pdf;base64,${item.dokumen_file_data}`}>Download PDF</a>
                                        </iframe>
                            </Fragment>
                        )
                    // }
                }

                )
            }
        </div>
    )
}