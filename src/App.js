import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';


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
    <div>
      {/* <div className="update-buttons">
        <Button variant="outlined" onClick={zoomInScale}>Zoom In</Button>
        <Button variant="outlined" onClick={zoomOutScale}>Zoom Out</Button>
           <p>Scale {scale}</p>
      </div> */}
      <Map className="map"
          width={500}
          height={500}
          scale={scale}
          centerLong={92}
          centerLat={39}>
      </Map>
    </div>
  )
}

export default App;
