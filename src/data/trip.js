import React from 'react';
import { select, selectAll } from 'd3-selection';
import {easeSin} from 'd3-ease'
import { interpolate } from 'd3-interpolate';


export const funcs = {
    blank: function() {return;},
    addColumbia: function() {
        let projection = this.projection;
        let city = select('.map-items')
            .selectAll(".city")
            .data(this.coords)
            .enter()
            .append("circle")
            .attr("class", "city")
            .attr("cx", d =>  { return projection(d)[0]; })
            .attr("cy", d => { return projection(d)[1]; })
            .transition()
            .duration(5000)
            .attr("r", 2)
        return city
    },
    addInitialDistance: function(){
        let action;
        let selection = selectAll('.distance-text');
        if(selection.node() === null ){
            action =  select('.text-svg')
                .append('text')
                .text("distance traveled 0")
                .attr('x', 10)
                .attr('y', 15)
                .attr('class', 'distance-text')  
                .transition()
                .duration(5000)
                .attr('font-size', 16)
  
        } 
        return action;

    },
    moveDistance: function(){
        let historyLength = this.props.distanceHistory.length;
        let end = this.props.distanceHistory[historyLength - 1];
        let start = this.props.distanceHistory[historyLength - 2];
        return(
            select('.text-svg')
                .selectAll('.distance-text')
                .transition()
                .duration(3000)
                .tween('.distance-text', function(d) {
                    let i = interpolate(start, end);
                    return function(t){ 
                        select(this).text(`distance traveled ${Math.round(i(t))}`)}
                })
        )
    },
    zoomMap: function() {
  
        // return(        select('.map-svg')
        return(select(this.mapRef.current)
        .transition()
        .duration(3000)
        .attr('transform', `translate(${this.props.moveX} ${this.props.moveY}) scale(${this.props.zoom})`))
    },
    progressRoute: function() {
        let start, end;
        let totalLength = 0;
        if ( select(`#route-part-${this.props.step}`).node() !== null){
            totalLength = select(`#route-part-${this.props.step}`).node().getTotalLength()
        }

        if(this.props.direction === "down"){
            
            end = 0;
            start = totalLength;
        } else {
            end = totalLength;
            start = 0;
        }
        return(
            
            select(`#route-part-${this.props.step}`)
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", start)
            .transition(easeSin).duration(3000)
            .attr("stroke-dashoffset", end)


        )
    },
}

const distances = [135.85255598723776, 26.09799728478469, 464.5745649933896, 145.56512854380514, 33.23544231308974, 7.8000198100148115, 4.152354692104787, 11.543164934882912, 70.13160657387805, 129.52744166820193, 265.4089851686229, 136.70390475489785, 202.19826262316366, 196.7323093705185]


export const trip = [
    {
        step: 0,
        tripLeg: 0,
    },
    {
        part: 0,
        leg: -1,
        text: <p>Up until last year, this was our little slice of the Earth. Columbia, Missouri is a small"ish" college town wedged between the humble metropolises of Kansas City and St. Louis. This is where we called home for nearly a decade, save for that year spent subsisting on baguettes and red wine in the south of France.<br /><br /> 2019 was momentous in many ways. To start, James was knighted by the Queen herself. By knighted we mean earned his PhD and by the Queen we mean some guy whose name was probably Reginald or Steve or something that conveyed professorial stature. This was very likely the catalyst for the next event of note in our 2019. After establishing ourselves in a city that we never thought we would call home and finding friends that others go lifetimes searching for, it was bitter-sweetly time for us to pack-up our lives, pups and all, and make our way up to the land of moose and mounties. <br /><br /> Canada was a natural next step mostly because that is where James landed a job. Yes, we now found ourselves packing up our lives about to embark on our journey up to Calgary, Alberta, home of the Western Hemisphere's largest stampede, Tegan and Sara, and the Flames, not to mention some of the most beautiful mountains on the globe just an hour to the west. <br /><br />...But this isn't the story of our adventures to be held up in our new found home, but instead this is the story of a trip that spanned 3 weeks, 20+ states, 2 provinces, 2 cars, 1 wedding, thousands of miles of driving and countless Econolodge check-ins. This is the story of our move up to the Great White North.</p>,
        city: "Columbia, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -1000,
        moveX: -2000,
        distance: 0,
        funcs: [funcs.zoomMap, funcs.addColumbia, funcs.addInitialDistance],
    }, 
    {
        part: 1,
        leg: 0,
        text: <p>The first leg of the trip was carried solely by Jennifer, who was finishing up some business in Columbia before packing the last few items and making her way to our original home, Kansas City, Missouri. <br /><br />It was here that she picked up James and they started the first part of their journey. Our goods were shipped off on a semitruck just a few days early our goal, at this point, was to meet our good up in Calgary where we'd unload them into our new apartment before making our way back to the States for a wedding, a wedding that was in the complete otherside of the continent. This gave us the opportunity to leave the pups in Kansas City with Jennifer's parents while we moved in our stuff and we would simply pick them up on our way back.<br /><br />So away we went...</p>,
        city: "Kansas City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -1000,
        moveX: -1900,
        distance: distances[0],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 2,
        leg: 1,
        text: <p>...we made it about 35 minutes before our first stop. Jennifer realized that she dressed for Canada, which was still about 21.3 hours of driving away, and that she had to shed a few layers in order to acclimate to the 90˚F Missouri summer.</p>,
        city: "Somewhere out side of Platte City, MO",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -900,
        moveX: -1890,
        distance: distances[1],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 3,
        leg: 2,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 5,
        moveY: -500,
        moveX: -1500,
        distance: distances[2],
        funcs: [funcs.zoomMap, funcs.progressRoute, funcs.moveDistance],
    },
    {
        part: 4,
        leg: 3,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 1,
        moveY: 0,
        moveX: 0,
        distance: distances[2],
        funcs: [funcs.zoomMap],
    },
    {
        part: 5,
        leg: 4,
        text: <p>Then things started moving a long. We made it all the way up to South Dakota where we ran into the biggest thunderstorm of our life.</p>,
        city: "Somewhere in South Dakota",
        date: "July 2nd, 2019",
        zoom: 1,
        moveY: 0,
        moveX: 0,
        distance: distances[2],
        funcs: [funcs.zoomMap],
    }
]


