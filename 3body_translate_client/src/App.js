import './App.css';

import { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import throttle from "lodash.throttle";

import { Button } from "./components/ui/button"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import Get3Body from './features/Get3Body';
import GetPage from './features/GetPage';
import GetPageOrig from './features/GetPageOrig'

const BASE_API_URL = "http://localhost:8081";

// CODE FROM https://github.com/wojtekmaj/react-pdf/issues/1811
// @ts-expect-error This does not exist outside of polyfill which this is doing

if (typeof Promise.withResolvers === 'undefined') {
  if (window) {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    }
  } else {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    global.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url
).toString();



let page_number=1;

function App() {
  const [pageNumber, setPageNumber] = useState(page_number);
  //https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayPDF, setDisplayPDF] = useState(1);

  useEffect(() => {
    window.addEventListener("resize", throttle(setPDFSize, 25));
  }, []);

  function setPDFSize() {
    setWindowWidth(window.innerWidth);
  }

  function onDisplayPDFClick() {
    setDisplayPDF(!displayPDF);
  }

  function onPageDownClick() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }
  function onPageUpClick() {
    setPageNumber(pageNumber + 1);
    // TODO: set upper page bound
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Three Body Translate
        </p>
      </header>
      <div className="flex flex-row">
        <div style={{display: displayPDF ? 'block' : 'none'}}>
          <OriginalBook pageNumber={pageNumber} width={windowWidth * .45} />
        </div>
        <div style={{display: !displayPDF ? 'block' : 'none'}}>
          <GetPageOrig pageNumber={pageNumber} />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetPage pageNumber={pageNumber} />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="text-white mb-1 mt-5">
        <Button variant="outline" onClick={onDisplayPDFClick}>Switch Display</Button>
        <Button variant="outline" size="icon" onClick = {onPageDownClick}>&larr;</Button>
        <Button variant="outline" size="icon" onClick = {onPageUpClick}>&rarr;</Button>
      </div>
    </div>
  );
}

function OriginalBook(props) {
  return (
    <div className="w-fit ml-5">
      <Document file="/pdf/threeBodyChinese.pdf">
        <Page pageNumber={props.pageNumber} width={props.width} />
      </Document>
    </div>
  )
}

export default App;
