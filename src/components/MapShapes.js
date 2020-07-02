import React, {forwardRef, useEffect} from 'react';
import gsap from 'gsap';
import {toString, round} from 'lodash'
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export const MapShape = forwardRef((props, ref) => {
    const path = props.path;
    const features = props.useFeatures ? props.data.features: props.data;
    const shapes = features.map((d, i) => { 
        const pathMeasure =  props.usePathMeasure ? round(path.measure(d), 2) : 0.00;
        return <path key={i}
            ref={ref}
            className={`${props.className}`}
            d={path(d)}
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
            fill={props.fill}
            strokeDasharray={`${pathMeasure} ${pathMeasure}`}
            strokeDashoffset={pathMeasure}
            >
        </path>
    })
 

    return shapes;
})

export const AnimatedRoute = forwardRef((props, ref) => {


    useEffect(() => {
        if( props.animateStrokeOffset){
            gsap.to(ref.current, {
            scrollTrigger: {
                trigger: props.triggerRef.current,
                //   markers: true,
                start: "top 90%",
                end: "top 15%",
                scrub: true,
                toggleActions: "restart pause reverse pause"     
                },
                attr:{'stroke-dashoffset': 0.00,}
            });
        }
      }, [props.triggerRef.current, ref.current]);

      useEffect(() => {
        if (props.animateStrokeOpacity){
            gsap.to(ref.current, {
            scrollTrigger: {
                trigger: props.opacityTriggerRef.current,
                //   markers: true,
                start: "top 90%",
                end: "top 15%",
                scrub: true,
                toggleActions: "restart pause reverse pause"     
                },
                strokeOpacity: `${0.5}`,
            });
        }
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


