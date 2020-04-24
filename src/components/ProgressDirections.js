import React, { Component } from 'react';
import { select } from 'd3-selection';
import {easeSin} from 'd3-ease'

import { trip } from '../data/trip';
import ProgressButton from './ProgressionButton';

class ProgressDirections extends Component{
    constructor(props) {
        super(props);
        this.tripList = trip;
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleForwardButton = this.handleForwardButton.bind(this);
        this.state = {
            step: 0,
            tripStep: this.tripList[0],
        }
    }

    componentDidUpdate(){
            const step = this.state.step - 1
            let totalLength = 0;
            if ( select(`#route-${step}`).node() !== null){
                totalLength = select(`#route-${step}`).node().getTotalLength()
            }
            let end = 0;
            let start = totalLength;

            select(`#route-${step}`)
                .attr("stroke-width", 3)
                .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", start)
            .transition(easeSin).duration(3000)
            .attr("stroke-dashoffset", end)

    }

    handleBackButton(){
        this.setState({step: this.state.step > 0 ? this.state.step - 1 : 0})  
    }

    handleForwardButton(){
        this.setState({step: this.state.step + 1})  
    }

    componentDidMount() {
        this.state.tripStep.funcs.map(d => d.call(this));
    }

    render(){
        console.log(this.trip)
        const step = this.state.step;
        return(
            <div>
                <p>Step: {this.state.step}</p>
                <ProgressButton key={'button-1'} direction='Forward' step={step} onStepChange={this.handleForwardButton}></ProgressButton>
                <ProgressButton key={'button-2'} direction='Backward' step={step} onStepChange={this.handleBackButton}></ProgressButton>
            </div>
        )
    }
}

export default ProgressDirections;