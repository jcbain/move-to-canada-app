import React, {forwardRef, useEffect, useRef} from 'react';

import { geoPath } from 'd3-geo';
import styled from 'styled-components';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import MapShape from './MapShape';
import {createProjection} from '../helpers/mapperHelpers'

import route from '../data/to_calgary';

gsap.registerPlugin(ScrollTrigger); 

export default function Route(props){
    const refArray = [useRef(null) ,useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    const routeParts = route.features.map((r, i) => {
        return <MapShape key={`route-${i}`}
            ref={refArray[i]}
            className={'route'}
            data={[r]}
            path={props.path}
            useFeatures={false}
            stroke={'#000'}
            strokeWidth={'2px'}
            fill={'#fff'}
        ></MapShape>
    })
    return(
        <svg>
            {routeParts}
            {/* <MapShape key='route'
                useFeatures={false}
                className={'usstates'}
                data={[route.features[0]]}
                path={props.path}
                stroke={'#000'}
                strokeWidth={'2px'}
                fill={'#fff'}
            ></MapShape> */}

        </svg>
    )
}