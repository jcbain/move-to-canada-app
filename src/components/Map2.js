import React from 'react';
import { geoPath, geoAlbers } from 'd3-geo';

import canadianProvinces from '../data/canada';

const createProjection = (width, height, scale, centerLong, centerLat) => {
    return geoAlbers().scale([width * scale])
        .rotate([centerLong, 0])
        .center([0, centerLat])
        .translate([width/2, height/2])
}


const MapShape = (props) => {
    const path = props.path;
    const features = props.data.features;

    const shapes = features.map((d, i) => (
        <path key={i}
            d={path(d)}
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            fill={props.fill}
            >
        </path>
    ))

    return shapes;

}


export default function Map(props){

    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);

    return (
        <svg className={props.className}
            viewBox={[0, 0, props.width, props.height]}
            >
                <MapShape data={canadianProvinces}
                    path={path}
                    stroke={'#000'}
                    strokeWidth={'0.25px'}
                    fill={'#fff'}>
                </MapShape>
            

        </svg>
    )

}

