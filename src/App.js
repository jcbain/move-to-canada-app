import React, { useState } from 'react';
import './App.css';

// import Map from './components/Map';
import Map from './components/Map2'
import Button from '@material-ui/core/Button';
import Route from './components/Route';
import ProgressDirections from './components/ProgressDirections';


function App(props) {
  const [scale, setScale] = useState(1);
  const updateScale = () => {
    setScale(scale + 1);
  }

  return(
    <div>
      <div className="update-buttons">
        <Button onClick={updateScale}>
          update
        </Button>
           <p>Scale {scale}</p>
      </div>
      <Map className="map"
          width={500}
          height={500}
          scale={scale}
          centerLong={97}
          centerLat={45}>
      </Map>
    </div>
  )
}
// class App extends Component {
//   constructor(props){
//     super(props);
//     this.width = 500;
//     this.height = 500;
//     this.centerLong = 97;
//     this.centerLat = 45;
//     this.mapScale = 1.75;
//     this.state = {
//         step: 0,
//     }
//   }



//   render(){
//     return (
//       <div>
//         <Map width={500}
//           height={500}
//           scale={1.75}
//           centerLong={97}
//           centerLat={45}>

//         </Map>
//         {/* <div className="map">
//           <Map width={500}
//               height={500}
//               mapScale={1.75}
//               centerLong={97}
//               centerLat={45}>
//         </Map>

//         </div>
   
//         <ProgressDirections></ProgressDirections> */}
        
//       </div>
//     );
//   }

// }

export default App;
