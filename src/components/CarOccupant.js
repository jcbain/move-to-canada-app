import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const OccupantDiv = styled.div`
    width: ${props => props.imgwidth}vw;
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
                start: "top 90%",
                end: "top 15%",
                duration: 2,
                toggleActions: "restart pause reverse pause" 
            }, 
            opacity: 1,
        }
        )
    }, [props, ref])


    return(
        <OccupantDiv imgwidth={props.imgwidth}>
            <StyledImg ref={ref}
                src={imgpath}
                imgopacity={imgopacity}
                alt={'doggo'}>
            </StyledImg>
        </OccupantDiv>
    )

})