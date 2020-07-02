import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import {Helmet} from "react-helmet";
import {flattenDepth} from 'lodash';



// import Map from './components/Map';
import Map from './components/Map'

import canadianProvinces from './data/canada';
import usStates from './data/us-states';
import route from './data/to_calgary';
import route2 from './data/calgary_to_kc';
import route3 from './data/kc_to_kc';
import route4 from './data/kc_back_calgary';


const legCoordsFlat = [route, route2, route3, route4].map(d => {
    return d.features.map(r => {
        return r.geometry.coordinates[0].pop()
    })
})
const legCoords = flattenDepth(legCoordsFlat, 1)


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
          <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet" />  
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap" rel="stylesheet" />       
        </Helmet>
      <Map className="map"
          width={500}
          height={500}
          scale={scale}
          centerLong={92.35361}
          centerLat={38.95133}
          canadianProvinces={canadianProvinces}
          usStates={usStates}
          routes={[route, route2, route3, route4]}
          legCoords={legCoords}>
      </Map>
      <div>
        dalfjdl;aj dajf dklf asdljf alsdjf lasdjf lasdjf l;asdj f;lkasjd fklasdlkfj asdjf asdljf lkasdj f;lajsd flkjasd lfkjas dlkfj asd;lfj as;ldjf;laskdjfl;asdjf ;alsdjfasdjf
        alfakdja;lkjsdf;lajsd fljas dlfj as;dlfj as;ldkjf as;dkljf al;sdjf a;sdlkjf a;dlkjf asd;klfj as;ldkjf asd
      </div>
    </div>
  )
}

export default App;
