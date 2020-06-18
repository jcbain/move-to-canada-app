import React, { forwardRef, useEffect } from 'react';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export const MapMarker = forwardRef((props, ref) => {
    const [projectedLon, projectedLat] = props.projection([props.lon, props.lat]);
    
    useEffect(() => {
        gsap.to(ref.current, {
            motionPath: {
                path: props.pathRef.current,
                align: props.pathRef.current
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