import React, { useState, useEffect, useRef, forwardRef, createRef} from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';

import{ MapShape, AnimatedRoute } from './MapShapes';
import { MileageTracker } from './MileageTracker';
import { CarOccupant } from './CarOccupant';
import { MapMarker } from './MapMarker';
import {Carousel} from './Carousel';
import MapContainer from './MapContainer';
import {createProjection} from '../helpers/mapperHelpers'

import canadianProvinces from '../data/canada';
import usStates from '../data/us-states';
import route from '../data/to_calgary';
import prairie from '../img/prairie.png';
import pippa from '../img/pippa.png';
import prairiemountain from '../img/prairie_mountains.jpeg'
import pippamountain from '../img/pippa_mountains.jpeg'


const legCoords = route.features.map(d => d.geometry.coordinates[0].pop())

const MapItemsDiv = styled.div`
    display: flex;
    width: 100vw;
`

const MapDiv = styled.div`
    top: 0;
    position: sticky;
    width: ${props => props.viewwidth}vw;
    height: 100vh;
    margin: 0vw;
    z-index: -1;
`


const ScrollSectionDiv = styled.div`
    position: ${props => props.issticky ? 'sticky' : 'static'};
    top: ${props => props.issticky ? 0 : ''};
    width: ${props => props.viewwidth - (props.xmargin * 2) || props.viewwidth - 10 - 6}vw;
    background: ${props => props.issticky ? 'linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0))' : ''};
    height: ${props => props.viewheight || ''};
    margin-left: ${props => props.xmargin || 5}vw;
    margin-right: ${props => props.xmargin || 5}vw;
    margin-bottom: ${props => props.marginbottom || 120}vh;
    font-family: 'Roboto Slab', serif;
    font-size: 1.2rem;
    color: #5c5c5c;
    background-color: ${props => props.backgroundcolor || '#fff'};
    border-radius: ${props => props.issticky ? '0px' : '4px'};
    padding-left: ${props => props.paddingleft || 2}vw;
    padding-right: 4vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin-top: 2vh;
`



const ImgWrapper = styled.img`
    // box-shadow: 0 4px 4px rgba(0,0,0,0.1);

`

const Headline = styled.h1`
    font-size: 3rem;
    font-family: 'Abril Fatface', cursive;
    color: ${props => props.fontcolor ||'#fcba03'};
`

const SubTitle = styled.h2`
    font-size: 2rem;
    font-family: 'Abril Fatface', cursive;
    color: ${props => props.fontcolor || '#6e6e6e'};
`

const StyledHr = styled.hr`
    border: 1px solid #fff;
    height: 1vh;
    background-color: #fff;
`

const TrackerDiv = styled.div`
    position: absolute;
    left: ${props => props.leftposition - props.viewwidth}vw;
    top: 85vh;
    width: ${props => props.viewwidth}vw;
    padding-left: 1vw;
    height: 15vh;
    z-index: 1000;
    background-image: linear-gradient(rgba(255,255,255,0), 10%, rgba(255,255,255,1))
`

const CarOccupantDiv = styled.div`
    position: absolute;
    width: ${props => props.viewwidth}vw;
    padding-left: 1vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    height: 15vh;
    z-index: 1000;
    background-image: linear-gradient(rgba(255,255,255,1), 90%, rgba(255,255,255,0))
`

const StyledCarousel = styled(Carousel)`
    width: 100%;
`

const ScrollItemsDiv = styled.div`
    width: ${props => props.viewwidth}vw;
    position: relative;
    background-color: #fff;
`



export default function Map(props){
    const mapDivWidth = 60;
    const scrollyDivWidth = 100 - mapDivWidth;
    let mainDistanceRef = useRef(null);
    let columbiaDivRef = useRef(null);
    let secondaryDistanceRef = useRef(null)
    let prairieRef = useRef(null);
    let pippaRef = useRef(null);
    let jenRef = useRef(null);
    let jamesRef = useRef(null);
    let circleRef = useRef(null)
    let mapRef = useRef(null)
    const routeRefs = route.features.map(() => createRef(null));
    const divRefs = route.features.map(() => createRef(null));

    const distances = [
        218.7226151394528,
        260.74039076795617,
        1008.7054404073135,
        1243.0652973628398,
        1296.5743594869143,
        1309.1323913810381,
        1315.8176824353268,
        1334.4021779804882,
        1447.3140645644319,
        1655.853245650237,
        2083.16171177172,
        2303.2549984271054,
        2628.794201250399,
        2945.533219336934
      ]
    const [targetRef, updateRef] = useState(0);




    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);

    const tripLegCoords = [...legCoords]

    const animatedRoutes = route.features.map((d,i) => {
        return (
            <AnimatedRoute 
            key={`route-${i}`}
            ref={routeRefs[i]}
            triggerRef={divRefs[i]}
            useFeatures={false}
            className={'route'}
            data={[d]}
            path={path}
            stroke={'#ff774a'}
            strokeWidth={'2px'}
            fill={'none'}
            usePathMeasure={true}>
        </AnimatedRoute>

        )
    })

    return (
        <MapItemsDiv>
            <MapDiv viewwidth={mapDivWidth}>
                <CarOccupantDiv viewwidth={mapDivWidth}>
                    <CarOccupant ref={jenRef} triggerRef={divRefs[0]} imgpath={prairie}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                    <CarOccupant ref={jamesRef} triggerRef={divRefs[1]} imgpath={pippa}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                    <CarOccupant ref={prairieRef} triggerRef={divRefs[13]} imgpath={prairie}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                    <CarOccupant ref={pippaRef} triggerRef={divRefs[13]} imgpath={pippa}
                        imgwidth={10}
                        imgheight={12}
                    ></CarOccupant>
                </CarOccupantDiv>
                <TrackerDiv viewwidth={20} leftposition={mapDivWidth}>
                    <MileageTracker ref={mainDistanceRef} 
                        triggerRef={divRefs[targetRef]} 
                        updatedDistance={distances[targetRef]} 
                        switchRef={updateRef} 
                        targetRefIndex={targetRef} 
                        maxIndex={divRefs.length}
                        useKM={true}
                        fontsizes={[`2.5rem`,`1.5rem`]}
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
                        fontsizes={[`1.5rem`,`1.3rem`]}
                        fontcolors={['#fcba03', '#5c5c5c']}
                        fontjustify={['end', 'start']}
                        >0</MileageTracker>
                </TrackerDiv>
      
                <MapContainer ref={mapRef}
                    projection={projection}
                    moveCoords={tripLegCoords[targetRef]}
                    triggerRef={divRefs[targetRef]}
                    zoomRef={columbiaDivRef}
                    width={props.width}
                    height={props.height}
                    viewWidth={60}
                    viewHeight={100}>
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

                        {animatedRoutes}
    
                        <MapMarker ref={circleRef}
                            pathRef={routeRefs[targetRef]}
                            triggerRef={divRefs[targetRef]}
                            projection={projection}
                            lat={props.centerLat}
                            lon={-props.centerLong}>    
                        </MapMarker>
                </MapContainer>

            </MapDiv>
            <ScrollItemsDiv viewwidth={scrollyDivWidth}>
                <ScrollSectionDiv issticky={true} viewwidth={scrollyDivWidth} viewheight={'15vh'} xmargin={'0'} marginbottom={5} backgroundcolor={' '}></ScrollSectionDiv>
                <ScrollSectionDiv paddingleft={1} marginbottom={20} viewwidth={scrollyDivWidth}>
                    ...had we ever been to Calgary? No. Had Jennifer ever been to Canada? No. But these were mere baby concerns, nay!, adventure opportunities, particularly when faced with the state of the US in 2019. Woof, are we glad we made abroad before 2020!
                </ScrollSectionDiv>
                <ScrollSectionDiv ref={columbiaDivRef}
                     marginbottom={10} 
                     viewwidth={scrollyDivWidth} 
                     backgroundcolor={'#2a00a6'}>
                    <Headline fontcolor={"#fff"}>Columbia, Missouri</Headline>
                    <StyledHr></StyledHr>
                    <SubTitle fontcolor={"#fff"}>It all started here...</SubTitle>
                </ScrollSectionDiv>
                <ScrollSectionDiv paddingleft={1} marginbottom={20} viewwidth={scrollyDivWidth}>
                    This was our home for pretty much all of our adult life.
                </ScrollSectionDiv>

                <ScrollSectionDiv viewwidth={scrollyDivWidth} xmargin={4}>
                    <StyledCarousel className="firstcarousel" slides={[<ImgWrapper width={'100%'} src={prairiemountain}></ImgWrapper>,<ImgWrapper width={'100%'} src={pippamountain}></ImgWrapper>]}></StyledCarousel>
                </ScrollSectionDiv>
                <ScrollSectionDiv ref={divRefs[0]} viewwidth={scrollyDivWidth}>
            

                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.

                </ScrollSectionDiv>
    

                <ScrollSectionDiv>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>
                <ScrollSectionDiv ref={divRefs[1]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[2]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[3]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[4]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[5]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[6]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[7]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[8]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[9]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>
                <ScrollSectionDiv ref={divRefs[10]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[11]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[12]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[13]}>
                    ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                    nearly half of the states in the US and a handful of provinces yet ahead.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                    Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                </ScrollSectionDiv>
            </ScrollItemsDiv>

        </MapItemsDiv>

    )

}

