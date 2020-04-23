import React from 'react';
import './App.css';

import Map from './components/Map'
import ProgressDirections from './components/ProgressDirections'

function App() {
  return (
    <div>
      <div className="map">
        <Map width={500}
            height={500}
            mapScale={1.5}
            centerLong={97}
            centerLat={45}></Map>
      </div>
      <ProgressDirections></ProgressDirections>
    </div>
  );
}

export default App;
