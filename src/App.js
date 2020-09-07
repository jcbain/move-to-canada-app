import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import {flattenDepth} from 'lodash';



// import Map from './components/Map';
import Map from './components/Map';
import BottomMap from './components/BottomMap';

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


function App() {
  const [scale, setScale] = useState(2);


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
      <BottomMap className="bottomMap"
          width={500}
          height={500}
          scale={scale-0.5}
          centerLong={92.35361}
          centerLat={48.95133}
          canadianProvinces={canadianProvinces}
          usStates={usStates}
          routes={[route, route2, route3, route4]}
        >
      </BottomMap>

    </div>
  )
}

export default App;
