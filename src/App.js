import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import Route from './components/Route';
import ProgressDirections from './components/ProgressDirections';

class App extends Component {
  constructor(props){
    super(props);
    this.width = 500;
    this.height = 500;
    this.centerLong = 97;
    this.centerLat = 45;
    this.mapScale = 1.75;
    this.state = {
        step: 0,
    }
  }



  render(){
    return (
      <div>
        <div className="map">
          <Map width={500}
              height={500}
              mapScale={1.75}
              centerLong={97}
              centerLat={45}>
        </Map>

        </div>
   
        <ProgressDirections></ProgressDirections>
        
      </div>
    );
  }

}

export default App;
