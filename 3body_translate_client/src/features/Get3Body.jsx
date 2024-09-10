import "../App.css"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { get3Body } from "./apiCalls"

const Get3Body = () => {
    useEffect(() => {
        const getAll = async() => {
            try {
                const res = await axios.get("http://localhost:8080/");
                console.log(res.data);
            } catch(error){
                processErr(error);
            }                
        };
        getAll();
    }, []);
    return (
        <div className="Page">
            <h1>Translated</h1>
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

export default Get3Body;