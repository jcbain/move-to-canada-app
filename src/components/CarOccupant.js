import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import prairie from '../img/prairie.png';
import pippa from '../img/pippa.png';

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

const CarOccupantImageDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    height: 8vh;
    z-index: 1000;
`

const CarOccupantsContainer = styled.div`
    font-family: 'Itim', cursive;
    display: grid;
    grid-template-rows: 50% 50%;
    color: #5c5c5c;
`

export const CarOccupant = forwardRef((props, ref) => {
    const [imgopacity, setImgOpacity] = useState(0.1)
    const imgpath = props.imgpath;

    useEffect(() => {
        gsap.to(ref.current, {
            scrollTrigger:{ 
                trigger: props.triggerRef.current,
                // markers: true,
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
                toggleActions: "restart pause reverse pause"     
              },
              opacity: `${1}`,
              duration: 0.5,
        });
    }, [props.triggerRef.current, ref.current])


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

export const CarOccupants = (props) => {
    const {refs, triggerRefs, imgwidth, imgheight} = props;
    const jenniferimg = pippa;
    const jamesimg = prairie;
    const pippaimg = pippa;
    const prairieimg = prairie;
    const imgs = [jenniferimg, jamesimg, pippaimg, prairieimg];

    const occupants = imgs.map((d, i) => {
        return (
            <CarOccupant key={i}
                imgpath={d}
                ref={refs[i]}
                triggerRef={triggerRefs[i]}
                imgwidth={imgwidth}
                imgheight={imgheight}></CarOccupant>
        )
    })

    return (
        <CarOccupantsContainer>
            <p>Car Occupants</p>
            <CarOccupantImageDiv>
                {occupants}
            </CarOccupantImageDiv>
        </CarOccupantsContainer>
    )

}