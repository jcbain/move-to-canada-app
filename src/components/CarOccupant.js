import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const OccupantDiv = styled.div`
    width: ${props => props.imgwidth}vw;
    height: ${props => props.imgheight}vh;
`;

const StyledImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    opacity: ${props => props.imgopacity}
`
export const CarOccupant = forwardRef((props, ref) => {
    const [imgopacity, setImgOpacity] = useState(0.1)
    const imgpath = props.imgpath;

    useEffect(() => {
        gsap.to(ref.current, {
            scrollTrigger:{ 
                trigger: props.triggerRef.current,
                markers: true,
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
                toggleActions: "restart pause reverse pause"     
              },
              opacity: `${1}`,
              duration: 0.5,
        });
    }, [props.triggerRef, ref])


    return(
        <OccupantDiv imgwidth={props.imgwidth} imgheight={props.imgheight}>
            <StyledImg ref={ref}
                src={imgpath}
                imgopacity={imgopacity}
                alt={'doggo'}>
            </StyledImg>
        </OccupantDiv>
    )

})