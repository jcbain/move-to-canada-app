import React, { useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const MileageDiv = styled.div`
    font-family: 'Itim', cursive;
    display: grid;
    grid-template-columns: 1fr .5fr;
    align-items: end;
    column-gap: 1vw;
    margin-bottom: 0;
`;

const StyledParagraph = styled.p`
    margin-bottom: 1vh;
    margin-top: 0;
    justify-self: ${props => props.fontjustify};
    align-self: baseline;
    font-size: ${props => props.fontsize};
    color: ${props => props.fontcolor};
`

export const UnitLabel = (props) => {
    const unit = props.useKM ? 'km' : 'miles';

    return (
    <StyledParagraph 
        fontsize={props.fontsize}
        fontcolor={props.fontcolor}
        fontjustify={props.fontjustify}
        >
        {unit}
    </StyledParagraph>
    )
}


export const MileageTracker = forwardRef((props, ref) => {
    const distanceIndex = props.targetRefIndex < props.maxIndex ? props.targetRefIndex + 1 : props.targetRefIndex;
    const updatedDistance = props.useKM ? props.updatedDistance : props.updatedDistance * 0.62137119
    useEffect(() => {
        gsap.to(ref.current, {
            scrollTrigger:{ 
                trigger: props.triggerRef.current,
                start: "top 90%",
                end: "top 15%",
                scrub: true,
                onLeave: () => props.switchRef(distanceIndex),
                toggleActions: "restart pause reverse pause" 
            }, 
            innerHTML: updatedDistance,
            // innerHTML: `${unitMain} ${updatedDistance}`,
            modifiers: { innerHTML: function(i) { return Math.round(i * 100) / 100; } }

        }
        )
    }, [ref, props, distanceIndex, updatedDistance])

    return(
    <MileageDiv>
        <StyledParagraph ref={ref}
            fontsize={props.fontsizes[0]}
            fontcolor={props.fontcolors[0]}
            fontjustify={props.fontjustify[0]}
        >
            {props.children}
        </StyledParagraph>
        <UnitLabel useKM={props.useKM}
            fontsize={props.fontsizes[1]}
            fontcolor={props.fontcolors[1]}
            fontjustify={props.fontjustify[1]}
            >

        </UnitLabel>
    </MileageDiv>
    )
})