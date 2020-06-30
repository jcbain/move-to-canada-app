import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import {Helmet} from "react-helmet";


// import Map from './components/Map';
import Map from './components/Map2'
import Button from '@material-ui/core/Button';


function App(props) {
  const [scale, setScale] = useState(2);

  // const zoomInScale = () => {
  //   setScale(scale + 1);
  // }
  // const zoomOutScale = () => {
  //   if(scale > 1){
  //     setScale(scale - 1)
  //   }
  // }


  return(
    <div className="application">
      <Helmet>               
        <meta charSet="utf-8" />
          <title>Journey to Canada</title>
          <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />         
        </Helmet>
      <Map className="map"
          width={500}
          height={500}
          scale={scale}
          centerLong={92.35361}
          centerLat={38.95133}>
      </Map>
    </div>
  )
}

export default App;
