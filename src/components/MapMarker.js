import React, { forwardRef, useEffect } from 'react';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

export const MapMarker = forwardRef((props, ref) => {
    const [projectedLon, projectedLat] = props.projection([props.lon, props.lat]);
    
    useEffect(() => {
        gsap.to(ref.current, {
            scrollTrigger: { 
                trigger: props.triggerRef.current,
                start: "top 90%",
                end: "top 15%",
                scrub: true,
                toggleActions: "restart pause reverse pause"  

            },
            motionPath: {
                path: props.pathRef.current,
                align: props.pathRef.current,
                alignOrigin: [0.5, 0.5]
            },
            duration: 5
        })
    }, [props, ref])

    return (
        <circle ref={ref}
            cx={projectedLat}
            cy={projectedLon}
            r={5}>
        </circle>
    )
})