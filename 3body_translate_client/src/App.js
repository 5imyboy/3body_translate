import './App.css';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

//import { highlightPlugin } from '@react-pdf-viewer/highlight';
//import { RenderCurrentPageLabelProps } from '@react-pdf-viewer/page-navigation';
//import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Button } from "./components/ui/button"
import Get3Body from './features/Get3Body';
import GetPage from './features/GetPage';

//import file from '../public/pdf/test.pdf';

// Import styles
// import '@react-pdf-viewer/highlight/lib/styles/index.css';

const BASE_API_URL = "http://localhost:8081";

//const highlightPluginInstance = highlightPlugin({
//  renderHighlightTarget,
//});

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


//react-pdf pdfjs-dist
//react-pdf pdfjs-eist: 'react-pdf/node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs'
//pdf-dist: 'pdfjs-dist/legacy/build/pdf.worker.min.js'


let page_number=1;

function App() {
  const [pageNumber, setPageNumber] = useState(page_number);
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
      <OriginalBook pageNumber={pageNumber} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetPage pageNumber={pageNumber} />} />
        </Routes>
      </BrowserRouter>
      <Button variant="outline" onClick = {onPageDownClick}>&larr;</Button>
      <Button variant="outline" onClick = {onPageUpClick}>&rarr;</Button>
    </div>
  );
}
/*
const pageNavigationPluginInstance = pageNavigationPlugin();
const { CurrentPageLabel } = pageNavigationPluginInstance;
*/

function OriginalBook(props) {
  //console.log(document.getElementsByClassName("Book"));
  //console.log(document.getElementById("pdf"));
  //console.log(document.querySelector(".pdf"));
  /*
  const pdfScroll = document.getElementById("pdf");
  if (pdfScroll) {
    pdfScroll.scrollTop = 80000;
    console.log(pdfScroll.scrollTop)
  }
    */
  //document.getElementsByClassName("Book")[0].scrollTop = 10000;
  //const [pageNumber, setPageNumber] = useState(pageNumber); 

  //let { pageNumber } = useParams();
  //console.log(pageNumber);

  return (
    <div id="Book" className="Book">
      <Document file="/pdf/threeBodyChinese.pdf">
        <Page pageNumber={props.pageNumber} />
      </Document>
    </div>
  )
}
/*
    <div id="Book" className="Book">
      <iframe id="pdf" src="pdf/(中国科幻基石丛书) 刘慈欣 - 三体. 3-重庆出版社 (2008).pdf" style={{height:"80vh",width:"100%"}} />
    </div>
*/
/*
function TranslatedBook() {
  var contents = mysql.createConnection.connect("Could not load");
  return (
    <div className="Book">
      <p>
        {contents}
      </p>
    </div>
  )
}
*/
/*
const renderHighlightTarget = (props) => (
  <div
  style={{
    background: '#eee',
    display: 'flex',
    position: 'absolute',
    left: `${props.selectionRegion.left}%`,
    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
    transform: 'translate(0, 8px)',
  }}
  >
  </div>
);
*/


// TODO
/*
Use tailwind css?
Import react router
next.js?

*/


export default App;
