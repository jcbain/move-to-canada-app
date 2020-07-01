import React, {forwardRef, useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import {getDistanceInMiles} from '../helpers/mapperHelpers'
gsap.registerPlugin(ScrollTrigger);


export const MapShape = forwardRef((props, ref) => {
    const path = props.path;
    const features = props.useFeatures ? props.data.features: props.data;
    const shapes = features.map((d, i) => { 
        const pathMeasure =  props.usePathMeasure ? path.measure(d) : null
        return <path key={i}
            ref={ref}
            className={`${props.className}`}
            d={path(d)}
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            fill={props.fill}
            strokeDasharray={`${pathMeasure} ${pathMeasure}`}
            strokeDashoffset={`${pathMeasure}`}
            >
        </path>
    })
 

    return shapes;
})

export const AnimatedRoute = forwardRef((props, ref) => {

    useEffect(() => {
        gsap.to(ref.current, {
          scrollTrigger: {
              trigger: props.triggerRef.current,
              markers: true,
              start: "top 90%",
              end: "top 15%",
              scrub: true,
              toggleActions: "restart pause reverse pause"     
            },
            strokeDashoffset: `${0}`,
        });
      }, [props.triggerRef.current, ref.current]);

      return (
        <MapShape
            ref={ref}
            useFeatures={props.useFeatures}
            className={props.className}
            data={props.data}
            path={props.path}
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            fill={props.fill}
            usePathMeasure={props.usePathMeasure}
        ></MapShape> 
      )
});


