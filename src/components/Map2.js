import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';

import{ MapShape, AnimatedRoute } from './MapShapes';
import { MileageTracker } from './MileageTracker';
import {createProjection} from '../helpers/mapperHelpers'

import canadianProvinces from '../data/canada';
import usStates from '../data/us-states';
import route from '../data/to_calgary';



const MapDiv = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    z-index: -1;
`

const MapSvg = styled.svg`
    width: ${props => props.width}vw;
    height: ${props => props.height}vh;
`;

const TmpDiv = styled.div`
    width: 20vw;
`



export default function Map(props){

    let tmpRef = useRef(null)
    let firstLegDivRef = useRef(null);
    let firstLegRef = useRef(null);
    let secondLegDivRef = useRef(null);
    let secondLegRef = useRef(null);
    let thirdLegDivRef = useRef(null);
    let thirdLegRef = useRef(null);

    const divRefs = [firstLegDivRef, secondLegDivRef, thirdLegDivRef]
    const distances = [183, 200, 1000]
    const [targetRef, updateRef] = useState(0);



    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);

    return (
        <div>
        
            <MapDiv>
                {/* <AnotherTmpDiv className='.tmp' ref={element => {tmpRef = element;}}>{distance}</AnotherTmpDiv> */}
                <MileageTracker ref={tmpRef} triggerRef={divRefs[targetRef]} updatedDistance={distances[targetRef]} switchRef={updateRef} targetRefIndex={targetRef} maxIndex={divRefs.length}>0</MileageTracker>
                <MapSvg
                    className={props.className}
                    viewBox={[0, 0, props.width, props.height]}
                    width={100}
                    height={100}
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

                </MapSvg>

            </MapDiv>
            <TmpDiv>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum. Sit amet cursus sit amet. Urna et pharetra pharetra massa massa. Mattis molestie a iaculis at erat pellentesque. A pellentesque sit amet porttitor eget. Proin sagittis nisl rhoncus mattis rhoncus. Quam quisque id diam vel quam. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Erat pellentesque adipiscing commodo elit at. Elementum tempus egestas sed sed risus pretium quam vulputate. Nunc sed velit dignissim sodales.
                Ut eu sem integer vitae justo eget. Natoque penatibus et magnis dis. Felis bibendum ut tristique et. Gravida neque convallis a cras semper. Porttitor massa id neque aliquam. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Orci porta non pulvinar neque. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Est placerat in egestas erat. Iaculis nunc sed augue lacus viverra vitae. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Ornare arcu dui vivamus arcu felis bibendum ut. Vulputate ut pharetra sit amet. Diam maecenas sed enim ut. A diam sollicitudin tempor id eu. Malesuada nunc vel risus commodo viverra maecenas accumsan.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TmpDiv>
            <TmpDiv ref={firstLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.

            </TmpDiv>
            <TmpDiv ref={secondLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TmpDiv>

            <TmpDiv ref={thirdLegDivRef}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TmpDiv>

        </div>

    )

}

