import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);


const TrackerDiv = styled.div`
    position: absolute;
    left: 90vw;
`

export const MileageTracker = forwardRef((props, ref) => {
    const distanceIndex = props.targetRefIndex < props.maxIndex ? props.targetRefIndex + 1 : props.targetRefIndex;
    useEffect(() => {
        gsap.to(ref.current, {
            scrollTrigger:{ 
                trigger: props.triggerRef.current,
                start: "top 90%",
                end: "top 15%",
                scrub: true,
                onEnter: () => console.log('hello'),
                onLeave: () => props.switchRef(distanceIndex),
                toggleActions: "restart pause reverse pause" 
            }, 
            innerHTML: props.updatedDistance
        }
        )
    }, [ref, props, distanceIndex])

    return(
        <TrackerDiv ref={ref}>{props.children}</TrackerDiv>
    )
})