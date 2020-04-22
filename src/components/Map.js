import React, { Component } from 'react';
import { select } from 'd3-selection';
import { geoAlbers, geoPath } from 'd3-geo';

import canprovinces from '../data/canada';
import usstates from '../data/us-states';
import mexstates from '../data/mexico';

class Map extends Component {
    constructor(props){
        super(props);
        this.canprovinces = canprovinces.features;
        this.usstates = usstates.features;
        this.mexstates = mexstates.features;
        this.projection = geoAlbers().scale([this.props.width * this.props.mapScale])
                                     .rotate([this.props.centerLong, 0])
                                     .center([0, this.props.centerLat])
                                     .translate([this.props.width/2, this.props.height/2])
        this.path = geoPath().projection(this.projection)
    }

    mapRef = React.createRef();

    render(){
        function renderBorders(data, prefix, path){
            const borders = data.map((d,i) => (
                <path key={`${prefix}-${i}`}
                      d={path(d)}
                      stroke={'#000'}
                      strokeWidth={'0.25px'}
                      fill={'#ffffff'}>
                </path>
            ))

            return borders
        }
 
        const canada = renderBorders(this.canprovinces, 'can', this.path)
        const us = renderBorders(this.usstates, 'us', this.path)
        const mexico = renderBorders(this.mexstates, 'mex', this.path)

        return(
            <svg ref={this.mapRef}
                 className={`map-svg`}
                 viewBox={[0, 0, this.props.width, this.props.height]}
                 preserveAspectRatio="xMidYMid meet">
                     {canada}
                     {us}
                     {mexico}
            </svg>
        )
    }
}

export default Map;
