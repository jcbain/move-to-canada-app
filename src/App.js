import React from 'react';
import './App.css';

import Map from './components/Map'

function App() {
  return (
    <div className="map">
      <Map width={500}
           height={500}
           mapScale={2}
           centerLong={100}
           centerLat={45}></Map>
    </div>
  );
}

export default App;
