import React, { Component } from 'react';
import { select } from 'd3-selection';
import { geoAlbers, geoPath } from 'd3-geo';

import canprovinces from '../data/canada';
import usstates from '../data/us-states';
import mexstates from '../data/mexico';
import countries from '../data/countryoutlines';
import lakes from '../data/greatlakes';

class Map extends Component {
    constructor(props){
        super(props);
        this.canprovinces = canprovinces.features;
        this.usstates = usstates.features;
        this.mexstates = mexstates.features;
        this.countries = countries.features;
        this.lakes = lakes.features;
        this.projection = geoAlbers().scale([this.props.width * this.props.mapScale])
                                     .rotate([this.props.centerLong, 0])
                                     .center([0, this.props.centerLat])
                                     .translate([this.props.width/2, this.props.height/2])
        this.path = geoPath().projection(this.projection)
    }

    mapRef = React.createRef();

    render(){
        function renderShapes(data, path, prefix, strokeWidth, stroke, fill){
            const borders = data.map((d,i) => (
                <path key={`${prefix}-${i}`}
                      d={path(d)}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      fill={fill}
                      >
                </path>
            ))

            return borders
        }
        const countries = renderShapes(this.countries, this.path, 'country', '15px', `url(#radial-gradient)`, 'none')
        const glakes = renderShapes(this.lakes, this.path, 'lake', '10px', `url(#radial-gradient)`, 'white')
        const canada = renderShapes(this.canprovinces, this.path, 'can',  '0.25px', '#000', '#ffffff')
        const us = renderShapes(this.usstates, this.path, 'us', '0.25px', '#000', '#ffffff')
        const mexico = renderShapes(this.mexstates, this.path, 'mex', '0.25px', '#000', '#ffffff')

        return(
            <svg ref={this.mapRef}
                 className={`map-svg`}
                 viewBox={[0, 0, this.props.width, this.props.height]}
                 preserveAspectRatio="xMidYMid meet">
                     <defs>
                        <linearGradient id="gradient" x1={0} x2={0} y1={0} y2={1}>
                            <stop offset="0" stopColor="gray" />
                            <stop offset="0.25" stopColor="white"></stop>
                            <stop offset="0.75" stopColor="white"></stop>
                            <stop offset="1" stopColor="gray" />
                        </linearGradient>
                        <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0" stopColor="#daedf2" />
                            <stop offset="1" stopColor="#e8f8fc" />
                        </radialGradient>
                     </defs>
                     {countries}
                     {glakes}
                     {canada}
                     {us}
                     {mexico}
            </svg>
        )
    }
}

export default Map;
