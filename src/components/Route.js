import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';

import route from '../data/to_calgary';

class Route extends Component{
    constructor(props){
        super(props);
        this.route = route.features;
    }

    componentDidMount(){
        select('.map-svg')
            .selectAll('.routes')
            .data(this.route)
            .enter()
            .append('path')
            .attr('class', 'routes')
            .attr('id', (d, i) => `route-${i}`)
            .attr('d', this.props.path)
            .style('fill', 'none')
            .attr('stroke-width', 10)
            .attr('stroke', 'red')
    }

    render(){       
        return <p></p>;
    }
}

export default Route;