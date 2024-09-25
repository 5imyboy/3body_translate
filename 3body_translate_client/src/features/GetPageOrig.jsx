import '../App.css'
import React, { useEffect, useState } from 'react'
import axios from "axios";

function GetPageOrig(props) {
    const [Page, setPage] = useState([]);
    const pageNumber = props.pageNumber;
    useEffect(() => {
        const getPage = async() => {
            try {
                const link = "http://localhost:8080/" + pageNumber;
                const res = await axios.get(link)
                setPage(res.data);
            }catch(error) {
                processErr(error);
            }
        };
        getPage();
    }, [pageNumber]);
    console.log(Page);
    let original_data = "";
    if (Page.data && Page.data[0]) {
        original_data = Page.data[0].untranslated_chinese;
    }
    return (
        <div className="Page">
            <h2>Original: page {pageNumber}</h2>
            <pre className="pageWrap">
                {original_data}
            </pre>
        </div>
    );
};

function processErr(error){
    // https://stackoverflow.com/questions/44806333/unable-to-catch-and-log-the-error-response-from-an-axios-request/44806462#44806462
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}

export default GetPageOrig;
