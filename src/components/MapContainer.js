import React, {useEffect, forwardRef, useState} from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const MapSvg = styled.svg`
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewheight}vh;
    transform: scale(${props => props.zoomscale})
`;

const MapContainer = forwardRef((props, ref) => {
    const [centerCoords, setCenterCoords] = useState({lat: 0, lon:0})
    const [lonMove, latMove] = props.projection(props.moveCoords)
    const centerWidthVal = props.width/2;
    const centerHeightVal = props.height/2;
    const [zoomScale, setZoomScale] = useState(2);

    const latDelta = latMove - centerWidthVal ;
    const lonDelta = lonMove - centerHeightVal ;

    useEffect(() => {
        if(props.animateReCenter){
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: props.triggerRef.current,
                    start: "top 90%",
                    end: "top 15%",
                    scrub: true,
                    onLeave: () => setCenterCoords({lat: latDelta, lon: lonDelta}),
                    toggleActions: "restart pause reverse pause"     
                },
                attr: {viewBox: `${lonDelta} ${latDelta} ${props.width} ${props.height}`}
            })
        }
    }, [latDelta, lonDelta, props.height, props.width, props.triggerRef, ref])

    useEffect(() => {
        if(props.animateZoom){
            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: props.zoomRef.current,
                    start: "top 35%",
                    end: "top 10%",
                    // markers: true,
                    toggleActions: "play play reverse pause"
                },
                scale: zoomScale
            })
        }
    }, [zoomScale, ref, props.zoomRef])

    return (
        <MapSvg ref={ref} 
            className={props.className}
            viewBox={`${centerCoords.lon} ${centerCoords.lat} ${props.width} ${props.height}`}
            viewwidth={props.viewWidth}
            viewheight={props.viewHeight}>
            {props.children}
        </MapSvg>
    )
})

export default MapContainer;