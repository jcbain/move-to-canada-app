import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import MapShape from './MapShape';
import {createProjection} from '../helpers/mapperHelpers'

import canadianProvinces from '../data/canada';
import usStates from '../data/us-states';
import route from '../data/to_calgary';

gsap.registerPlugin(ScrollTrigger);

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
    const [animation, setAnimation] = useState();
    let firstLegDivRef = useRef(null);
    let firstLegRef = useRef(null);
    let secondLegDivRef = useRef(null);
    let secondLegRef = useRef(null);


    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);


    useEffect(() => {

        setAnimation(
            gsap.to(firstLegRef.current, {
                scrollTrigger : {
                    trigger: firstLegDivRef,
                    markers: true,
                    start: "top 90%",
                    end: "top 15%",
                    scrub: 0,
                    toggleActions: "restart pause reverse pause"
                },
                strokeDashoffset: `${0}`,
                rotation: 0,
                duration: 20
            }
            ),
            gsap.to(secondLegRef.current, {
                scrollTrigger : {
                    trigger: secondLegDivRef,
                    markers: true,
                    start: "top 90%",
                    end: "top 15%",
                    scrub: 0,
                    toggleActions: "restart pause reverse pause"
                },
                strokeDashoffset: `${0}`,
                rotation: 0,
                duration: 20
            }
            )
        );
    }, []);


    return (
        <div>
        
            <MapDiv>

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
                        <MapShape key='route'
                            ref={firstLegRef}
                            useFeatures={false}
                            className={'route'}
                            data={[route.features[0]]}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'2px'}
                            fill={'none'}
                            usePathMeasure={true}
                        ></MapShape> 
                        <MapShape key='route2'
                            ref={secondLegRef}
                            useFeatures={false}
                            className={'route'}
                            data={[route.features[1]]}
                            path={path}
                            stroke={'#000'}
                            strokeWidth={'2px'}
                            fill={'none'}
                            usePathMeasure={true}
                        ></MapShape> 
                </MapSvg>

            </MapDiv>
            <TmpDiv>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam vestibulum. Sit amet cursus sit amet. Urna et pharetra pharetra massa massa. Mattis molestie a iaculis at erat pellentesque. A pellentesque sit amet porttitor eget. Proin sagittis nisl rhoncus mattis rhoncus. Quam quisque id diam vel quam. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Erat pellentesque adipiscing commodo elit at. Elementum tempus egestas sed sed risus pretium quam vulputate. Nunc sed velit dignissim sodales.
                Ut eu sem integer vitae justo eget. Natoque penatibus et magnis dis. Felis bibendum ut tristique et. Gravida neque convallis a cras semper. Porttitor massa id neque aliquam. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Orci porta non pulvinar neque. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Est placerat in egestas erat. Iaculis nunc sed augue lacus viverra vitae. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Ornare arcu dui vivamus arcu felis bibendum ut. Vulputate ut pharetra sit amet. Diam maecenas sed enim ut. A diam sollicitudin tempor id eu. Malesuada nunc vel risus commodo viverra maecenas accumsan.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
            </TmpDiv>
            <TmpDiv ref={element => {firstLegDivRef = element;}}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.

            </TmpDiv>
            <TmpDiv ref={element => {secondLegDivRef = element;}}>
                ...and so Jennifer set off from Columbia, MO, our home of 10ish years to where we grew up in Kansas City, MO. This was the end of a chapter, perhaps even a book and a new one was about to begin. We had thousands of miles ahead of us, three border crossings, 
                nearly half of the states in the US and a handful of provinces yet ahead.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.
                Varius quam quisque id diam vel. Quisque egestas diam in arcu cursus euismod. Cursus risus at ultrices mi. Eleifend donec pretium vulputate sapien nec sagittis. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet cursus sit amet dictum sit amet justo donec. Ante metus dictum at tempor. Donec ac odio tempor orci. Pulvinar mattis nunc sed blandit. Amet nisl suscipit adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna nunc id cursus.

            </TmpDiv>

        </div>

    )

}

