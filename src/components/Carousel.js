import React, { forwardRef, useState } from "react";
import styled from 'styled-components';

const ActiveDiv = styled.div`
    display: ${props => props.active ? 'block' : 'none'};
`

const SlidesDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr .2fr;
    justify-items: center;
    // grid-template-columns: .2fr 1fr .2fr;
    // justify-items: center;
`

const Dot = styled.span`
    height: 10px;
    width: 10px;
    background-color: ${props => props.active ? '#5149c4' : '#e0e0e0'};
    border-radius: 50%;
    display: inline-block;
    margin: 0.2rem;
`

const DotsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-self: center;
`

export const Slide = forwardRef((props, ref) => {
    const slides = props.slides.map((s, i) => {
        return (
            <ActiveDiv key={i}
                active={i === props.activeIndex}
            >
            {s}
                
            </ActiveDiv>

        )
    })


    return (
        <div className={props.className}>
            {slides}
        </div>

    )

})

export const Carousel = forwardRef((props, ref) => {
    const numSlides = props.slides.length;
    const [activeIndex, setActiveIndex] = useState(0);

    const goToNextSlide = () => {
        if(activeIndex === numSlides - 1) {
            setActiveIndex(0)
        } else {
            setActiveIndex(activeIndex + 1)
        }
    }

    const goToPreviousSlide = () => {
        if(activeIndex === 0) {
            setActiveIndex(numSlides - 1);
        } else {
            setActiveIndex(activeIndex - 1)
        }
    }
    
    const dots = props.slides.map((d, i) => {
        return (
            <Dot active={i === activeIndex} onClick={() => setActiveIndex(i)}></Dot>
        )
    })


    return(
        <SlidesDiv ref={ref} className={props.className}>
            {/* <div><button onClick={goToPreviousSlide}>GoBack</button></div> */}
            <Slide activeIndex={activeIndex} slides={props.slides}></Slide>
            <DotsDiv>
            {dots}
            </DotsDiv>
            {/* <div><button onClick={goToNextSlide}>GoForward</button></div> */}
        </SlidesDiv>
    )



})

