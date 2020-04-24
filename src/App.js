import React, { Component } from 'react';
import './App.css';

import Map from './components/Map'
import ProgressButton from './components/ProgressionButton';

class App extends Component {
  constructor(props){
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleForwardButton = this.handleForwardButton.bind(this);
    this.state = {
        step: 0,
    }
  }

  handleBackButton(){
    this.setState({step: this.state.step > 0 ? this.state.step - 1 : 0})  
  }

  handleForwardButton(){
    this.setState({step: this.state.step + 1})  
  }


  render(){
    const step = this.state.step;
    return (
      <div>
        <div className="map">
          <Map width={500}
              height={500}
              mapScale={1.75}
              centerLong={97}
              centerLat={45}
              step={this.state.step}>
        </Map>
        </div>
        <div>
          <p>Step: {this.state.step}</p>
          <ProgressButton key={'button-1'} direction='Forward' step={step} onStepChange={this.handleForwardButton}></ProgressButton>
          <ProgressButton key={'button-2'} direction='Backward' step={step} onStepChange={this.handleBackButton}></ProgressButton>
        </div>
        
      </div>
    );
  }

}

export default App;
