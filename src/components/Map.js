import React, { useState, useRef, createRef} from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';
import {flattenDepth} from 'lodash';

import{ MapShape, AnimatedRoute } from './MapShapes';
import { MileageTracker } from './MileageTracker';
import { CarOccupants } from './CarOccupant';
import { MapMarker } from './MapMarker';
import {Carousel} from './Carousel';
import MapContainer from './MapContainer';
import {createProjection} from '../helpers/mapperHelpers'

import prairiemountain from '../img/prairie_mountains.jpeg'
import pippamountain from '../img/pippa_mountains.jpeg'


const MapItemsDiv = styled.div`
    display: flex;
    width: 100vw;
`

const MapDiv = styled.div`
    top: 0;
    position: sticky;
    overflow: hidden;
    width: ${props => props.viewwidth}vw;
    height: 100vh;
    margin: 0vw;
    z-index: -1;
`


const ScrollSectionDiv = styled.div`
    position: ${props => props.issticky ? 'sticky' : 'static'};
    top: ${props => props.issticky ? 0 : ''};
    width: ${props => props.viewwidth - (props.xmargin * 2) || props.viewwidth - 10 - 6}vw;
    background: ${props => props.issticky ? 'linear-gradient(rgba(255,255,255,1), 80%, rgba(255,255,255,0))' : ''};
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
    padding-right: ${props => props.paddingleft || 4}vw;
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
    background-color: ${props => props.backgroundcolor || '#fff'};
`

const TrackerDiv = styled.div`
    z-index: 1000;
`

const StyledCarousel = styled(Carousel)`
    width: 100%;
`

const ScrollItemsDiv = styled.div`
    width: ${props => props.viewwidth}vw;
    position: relative;
    background-color: #fff;
`
const WidgetsDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: .75fr 1fr;
    position: absolute;
    align-items: center;
    top: 0vh;
    z-index: 1000;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-top: 1vh;
    background-image: linear-gradient(rgba(255,255,255,1), 90%, rgba(255,255,255,0))

`;


export default function Map(props){
    const [route, route2, route3, route4] = props.routes;
    const {canadianProvinces, usStates, legCoords} = props;
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
    const maxLength = route.features.length + route2.features.length + route3.features.length + route4.features.length
    const routeRefs = [...Array(maxLength)].map(() => createRef(null));
    const divRefs = [...Array(maxLength)].map(() => createRef(null));
    const opacityRefs = [...Array(4)].map(() => createRef(null));



    const distances = [
        218.7226151394528, 260.74039076795617,1008.7054404073135, 1243.0652973628398, 1296.5743594869143, 1309.1323913810381, 1315.8176824353268, 1334.4021779804882, 1447.3140645644319,
        1655.853245650237, 2083.16171177172, 2303.2549984271054, 2628.794201250399, 2945.533219336934, 3200.396905856729, 3283.32271602244, 3543.5835693393865, 3878.1873067914653, 4003.4709047560063, 4094.2300509358365,
        4209.475897938265, 4252.153416279632, 4612.297061105043, 5027.459739701704, 5036.276318461983, 5082.492822421188, 5279.57781138158, 5421.023742702225, 6207.373075786453, 6650.4010590161,
        7345.7787158131605, 8124.508479849123, 8772.325909470586, 10127.363744576593, 10563.188138459751, 11093.383923592719, 11660.246386956627, 11935.737077500497, 12112.534033632728, 12622.754235322662
      ]
    const [targetRef, setTargetRef] = useState(0);
    const updateIndexRef = (newIndex) => {
        const updatedIndex = newIndex < maxLength -1 ? newIndex : maxLength -1;
        setTargetRef(updatedIndex)
    }

    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);

    const tripLegCoords = [...legCoords]

    const routesLeg1 = route.features.map((d,i) => {
        return (
            <AnimatedRoute 
                key={`route-${i}`}
                ref={routeRefs[i]}
                triggerRef={divRefs[i]}
                opacityTriggerRef={opacityRefs[0]}
                useFeatures={false}
                className={'route'}
                data={[d]}
                path={path}
                stroke={'#ff6b54'}
                strokeWidth={'2px'}
                fill={'none'}
                usePathMeasure={true}
                animateStrokeOffset={true}
                animateStrokeOpacity={true}
            >
        </AnimatedRoute>

        )
    })

    const routesLeg2 = route2.features.map((d,i) => {
        const cumAdd = route.features.length;
        return (
            <AnimatedRoute 
                key={`route-${i+cumAdd}`}
                ref={routeRefs[i+cumAdd]}
                triggerRef={divRefs[i+cumAdd]}
                opacityTriggerRef={opacityRefs[1]}
                useFeatures={false}
                className={'route'}
                data={[d]}
                path={path}
                stroke={'#ff6b54'}
                strokeWidth={'2px'}
                fill={'none'}
                usePathMeasure={true}
                animateStrokeOffset={true}
                animateStrokeOpacity={true}
            >
            </AnimatedRoute>
        )
    })

    const routesLeg3 = route3.features.map((d,i) => {
        const cumAdd = route.features.length + route2.features.length;
        return (
            <AnimatedRoute 
                key={`route-${i + cumAdd}`}
                ref={routeRefs[i+ cumAdd]}
                triggerRef={divRefs[i+cumAdd]}
                opacityTriggerRef={opacityRefs[2]}
                useFeatures={false}
                className={'route'}
                data={[d]}
                path={path}
                stroke={'#ff6b54'}
                strokeWidth={'2px'}
                fill={'none'}
                usePathMeasure={true}
                animateStrokeOffset={true}
                animateStrokeOpacity={true}
            >
            </AnimatedRoute>
        )
    })

    const routesLeg4 = route4.features.map((d,i) => {
        const cumAdd = route.features.length + route2.features.length + route3.features.length;
        return (
            <AnimatedRoute 
                key={`route-${i + cumAdd}`}
                ref={routeRefs[i+cumAdd]}
                triggerRef={divRefs[i+cumAdd]}
                opacityTriggerRef={opacityRefs[3]}
                useFeatures={false}
                className={'route'}
                data={[d]}
                path={path}
                stroke={'#ff6b54'}
                strokeWidth={'2px'}
                fill={'none'}
                usePathMeasure={true}
                animateStrokeOffset={true}
                animateStrokeOpacity={true}
            >
            </AnimatedRoute>
        )
    })

    return (
        <MapItemsDiv>
            <MapDiv viewwidth={mapDivWidth}>
                <WidgetsDiv>
                    <CarOccupants refs={[jenRef, jamesRef, pippaRef, prairieRef]}
                        triggerRefs={[divRefs[0], divRefs[1], divRefs[30], divRefs[30]]}
                        imgwidth={6} 
                        imgheight={6}>
                    </CarOccupants>
                <TrackerDiv viewwidth={20} leftposition={mapDivWidth}>
                    <MileageTracker ref={mainDistanceRef} 
                        triggerRef={divRefs[targetRef]} 
                        updatedDistance={distances[targetRef]} 
                        switchRef={updateIndexRef} 
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
                        switchRef={updateIndexRef} 
                        targetRefIndex={targetRef} 
                        maxIndex={divRefs.length}
                        useKM={false}
                        fontsizes={[`1.5rem`,`1.3rem`]}
                        fontcolors={['#fcba03', '#5c5c5c']}
                        fontjustify={['end', 'start']}
                        >0</MileageTracker>
                </TrackerDiv>
                </WidgetsDiv>
      
                <MapContainer ref={mapRef}
                    animateReCenter={true}
                    animateZoom={true}
                    maxIndex={14}
                    currentIndex={targetRef}
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

                        {routesLeg1}
                        {routesLeg2}
                        {routesLeg3}
                        {routesLeg4}
    
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


                <ScrollSectionDiv viewwidth={scrollyDivWidth} xmargin={5} paddingleft={'0'} paddingright={'0'} marginbottom={10}>
                    <StyledCarousel className="firstcarousel" 
                        viewwidth={scrollyDivWidth-14} 
                        slides={[{img: prairiemountain, caption: 'prairie'}, {img: pippamountain, caption: 'pippa'}]}
                    >
                    </StyledCarousel>
                </ScrollSectionDiv>
                <ScrollSectionDiv ref={divRefs[0]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Traveling from Kansas City to Columbia. <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>
    
                <ScrollSectionDiv ref={divRefs[1]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Kansas City to Somewhere outside of Platte City <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[2]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Somewhere outside of Platte City to Dignity Statue, South Dakota<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[3]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Dignity Statue, South Dakota to big ass storm in the middle of South Dakota<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[4]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    big ass storm in the middle of South Dakota to Wall, SD<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[5]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Badlands National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>land of stone and light</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[6]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Through the Badlands<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[7]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Through the Badlands some more<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[8]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Badlands to Mount Rushmore<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[9]}
                    marginbottom={30} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Devil's Tower</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>many people, many stories, one place</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[10]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Devil's Tower to Billings<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[11]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Billings to Hobson Montana<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[12]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Hobson to Sweet Grass (US Canada Border)<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[13]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Sweet Grass to Calgary<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv 
                     marginbottom={10} 
                     viewwidth={scrollyDivWidth} 
                     backgroundcolor={'#2a00a6'}>
                    <Headline fontcolor={"#fff"}>Calgary, Alberta</Headline>
                    <StyledHr></StyledHr>
                    <SubTitle fontcolor={"#fff"}>Our new home...</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={opacityRefs[0]}>
                    About to go on our trip back South<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[14]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Calgary to Carway (Canada US Border)<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[15]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Glacier National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>crown of the continent</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    "Crown of the Continent". What does that even mean? Did you forget about the entire country sitting just to your North?
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[16]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Glacier to Missoula<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[17]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Missoula to Bozeman<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[18]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Yellowstone National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>hissing steam and plopping mud</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[19]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Through Yellowstone to Old Faithful<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[20]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Grand Teton National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>mountains of the imagination</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[21]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Grand Teton to Jackson (Hole), Wyoming<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[22]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Jackson (Hole), Wyoming to Salt Lake Cityish<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[23]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Salt Lake Cityish to Moab<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[24]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Arches National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>a red-rock wonderland</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv
                    ref={divRefs[25]}
                    marginbottom={10} 
                    viewwidth={scrollyDivWidth} 
                    backgroundcolor={'#fff'}
                >
                    <Headline fontcolor={'#404040'}>Canyonlands National Park</Headline>
                    <StyledHr backgroundcolor={'#404040'}></StyledHr>
                    <SubTitle fontcolor={'#404040'}>kinda like the grand canyon</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[26]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Canyonlands to Grand Junction<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[27]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Grand Junction to Glenwood Springs, CO<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[28]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Glenwood Springs, CO to Hays, KS<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[29]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Hays, KS to Kansas City, MO<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={opacityRefs[1]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Then off to North Carolina trip<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[30]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Kansas City, MO to Paducah<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[31]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Paducah to Ferguson, NC <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv 
                     marginbottom={10} 
                     viewwidth={scrollyDivWidth} 
                     backgroundcolor={'#2a00a6'}>
                    <Headline fontcolor={"#fff"}>A Wedding</Headline>
                    <StyledHr></StyledHr>
                    <SubTitle fontcolor={"#fff"}>a time to celebrate</SubTitle>
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[32]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Ferguson, NC to Pittsburgh<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[33]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Pittsburgh back to KC <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={opacityRefs[2]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    And our final ascent<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[34]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    KC to Sioux City, IA TICKET TIME<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[35]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Sioux City to Fargo<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[36]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Fargo to Portal (US Canada Border)<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>


                <ScrollSectionDiv ref={divRefs[37]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Portal to Moosejaw<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[38]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Moosejaw to Switft Current<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={divRefs[39]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    Swift Current back to Calgary<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

                <ScrollSectionDiv ref={opacityRefs[3]} viewwidth={scrollyDivWidth} paddingleft={1} marginbottom={20}>
                    We made it!<br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                    <br /><br />
                    I can't say that I am that surprised, but to be quite honest, I wasn't nearly anticipating that much phlegm. A little fore warning sure does go a long way in this day and age.
                </ScrollSectionDiv>

            </ScrollItemsDiv>

        </MapItemsDiv>

    )

}

