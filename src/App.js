import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import {Helmet} from "react-helmet";


// import Map from './components/Map';
import Map from './components/Map2'
import Button from '@material-ui/core/Button';


function App(props) {
  const [scale, setScale] = useState(4);

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
          <link href="https://fonts.googleapis.com/css2?family=Crete+Round&display=swap" rel="stylesheet" />  
      </Helmet>
      {/* <div className="update-buttons">
        <Button variant="outlined" onClick={zoomInScale}>Zoom In</Button>
        <Button variant="outlined" onClick={zoomOutScale}>Zoom Out</Button>
           <p>Scale {scale}</p>
      </div> */}
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
