import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';

import{ MapShape, AnimatedRoute } from './MapShapes';
import { MileageTracker } from './MileageTracker';
import { CarOccupant } from './CarOccupant';
import { MapMarker } from './MapMarker';
import {createProjection} from '../helpers/mapperHelpers'


import canadianProvinces from '../data/canada';
import usStates from '../data/us-states';
import route from '../data/to_calgary';
import prairie from '../img/prairie.png';
import pippa from '../img/pippa.png';


const MapDiv = styled.div`
    top: 0;
    position: fixed;
    width: 98vw;
    margin: 1vw;
    z-index: -1;
`

const MapSvg = styled.svg`
    width: ${props => props.width}vw;
    height: ${props => props.height}vh;
`;

const TextDiv = styled.div`
    width: 25vw;
    padding: 2vw;
`

const TrackerDiv = styled.div`
    position: absolute;
    left: 77vw;
    width: 20vw;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding-left: 1vw;
    height: 15vh;
`

const CarOccupantDiv = styled.div`
    position: absolute;
    left: 45vw;
    width: 30vw;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding-left: 1vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    height: 15vh;
`





export default function Map(props){

    let mainDistanceRef = useRef(null);
    let secondaryDistanceRef = useRef(null)
    let firstLegDivRef = useRef(null);
    let firstLegRef = useRef(null);
    let secondLegDivRef = useRef(null);
    let secondLegRef = useRef(null);
    let thirdLegDivRef = useRef(null);
    let thirdLegRef = useRef(null);
    let prairieRef = useRef(null);
    let pippaRef = useRef(null);
    let circleRef = useRef(null)
    const divRefs = [firstLegDivRef, secondLegDivRef, thirdLegDivRef]
    const distances = [183, 200, 1000]
    const [targetRef, updateRef] = useState(0);



    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);
    console.log(projection.invert([250, 250]))


    return (
        <div>
        
            <MapDiv>
                <CarOccupantDiv>
                    <CarOccupant ref={prairieRef} triggerRef={secondLegDivRef} imgpath={prairie}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                    <CarOccupant ref={pippaRef} triggerRef={firstLegDivRef} imgpath={pippa}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                </CarOccupantDiv>
                <TrackerDiv>
                    <MileageTracker ref={mainDistanceRef} 
                        triggerRef={divRefs[targetRef]} 
                        updatedDistance={distances[targetRef]} 
                        switchRef={updateRef} 
                        targetRefIndex={targetRef} 
                        maxIndex={divRefs.length}
                        useKM={true}
                        fontsizes={[`2rem`,`1.2rem`]}
                        fontcolors={['#fcba03', '#5c5c5c']}
                        fontjustify={['right', 'left']}
                        >0</MileageTracker>
                    <MileageTracker ref={secondaryDistanceRef} 
                        triggerRef={divRefs[targetRef]} 
                        updatedDistance={distances[targetRef]} 
                        switchRef={updateRef} 
                        targetRefIndex={targetRef} 
                        maxIndex={divRefs.length}
                        useKM={false}
                        fontsizes={[`1rem`,`1rem`]}
                        fontcolors={['#fcba03', '#5c5c5c']}
                        fontjustify={['end', 'start']}
                        >0</MileageTracker>
                </TrackerDiv>
                <MapSvg
                    className={props.className}
                    viewBox={[0, 0, props.width, props.height]}
                    width={98}
                    height={98}
                    >
                        <MapShape key={'canadaprovinces'}
                            useFeatures={true}
                            className={'canadaprovinces'}
                            data={canadianProvinces}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'0.25px'}
                            fill={'#fff'}>
                        </MapShape>
                        <MapShape key={'usstates'}
                            useFeatures={true}
                            className={'usstates'}
                            data={usStates}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'0.25px'}
                            fill={'#fff'}>
                        </MapShape>
                        <AnimatedRoute 
                            key={'route-1'}
                            ref={firstLegRef}
                            triggerRef={firstLegDivRef}
                            useFeatures={false}
                            className={'route'}
                            data={[route.features[0]]}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'2px'}
                            fill={'none'}
                            usePathMeasure={true}>
                        </AnimatedRoute>
                        <AnimatedRoute 
                            key={'route-2'}
                            ref={secondLegRef}
                            triggerRef={secondLegDivRef}
                            useFeatures={false}
                            className={'route'}
                            data={[route.features[1]]}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'2px'}
                            fill={'none'}
                            usePathMeasure={true}>
                        </AnimatedRoute>
                        <AnimatedRoute 
                            key={'route-3'}
                            ref={thirdLegRef}
                            triggerRef={thirdLegDivRef}
                            useFeatures={false}
                            className={'route'}
                            data={[route.features[2]]}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'2px'}
                            fill={'none'}
                            usePathMeasure={true}>
                        </AnimatedRoute>
                        <MapMarker ref={circleRef}
                            pathRef={firstLegRef}
                            triggerRef={firstLegDivRef}
                            projection={projection}
                            lat={39}
                            lon={-92}>    
                        </MapMarker>

                </MapSvg>

            </MapDiv>
            <TextDiv>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum. Sit amet cursus sit amet. Urna et pharetra pharetra massa massa. Mattis molestie a iaculis at erat pellentesque. A pellentesque sit amet porttitor eget. Proin sagittis nisl rhoncus mattis rhoncus. Quam quisque id diam vel quam. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Erat pellentesque adipiscing commodo elit at. Elementum tempus egestas sed sed risus pretium quam vulputate. Nunc sed velit dignissim sodales.
                Ut eu sem integer vitae justo eget. Natoque penatibus et magnis dis. Felis bibendum ut tristique et. Gravida neque convallis a cras semper. Porttitor massa id neque aliquam. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Orci porta non pulvinar neque. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Est placerat in egestas erat. Iaculis nunc sed augue lacus viverra vitae. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Ornare arcu dui vivamus arcu felis bibendum ut. Vulputate ut pharetra sit amet. Diam maecenas sed enim ut. A diam sollicitudin tempor id eu. Malesuada nunc vel risus commodo viverra maecenas accumsan.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TextDiv>
            <TextDiv ref={firstLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.

            </TextDiv>
            <TextDiv ref={secondLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TextDiv>

            <TextDiv ref={thirdLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TextDiv>

        </div>

    )

}

