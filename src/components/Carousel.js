import React, { forwardRef, useState } from "react";
import styled from 'styled-components';

const ActiveDiv = styled.div`
    display: ${props => props.active ? 'block' : 'none'};
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewwidth}vw;
    position: relative;
`

const SlidesDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr .2fr;
    row-gap: 2vh;
    justify-items: center;
`

const Dot = styled.span`
    height: 10px;
    width: 10px;
    background-color: ${props => props.active ? '#5149c4' : '#e0e0e0'};
    border-radius: 50%;
    display: inline-block;
    margin: 0.2rem;
    box-shadow:
        0 0 0.5px 0.5px ${props => props.active ? '#6058db' : 'none'},  /* inner white */
        0 0 1px 1px ${props => props.active? '#8982fa' : 'none'}, /* middle magenta */
        0 0 1.5px 1.5px ${props => props.active? '#d4d1ff' : 'none'}; /* outer cyan */
`

const DotsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-self: center;
`

const ImgDiv = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
        0 2px 2px rgba(0,0,0,0.12), 
        0 4px 4px rgba(0,0,0,0.12), 
        0 8px 8px rgba(0,0,0,0.12);
`

const CaptionDiv = styled.div`
    width: 100%;
    height: 5vw;
    position: absolute;
    left: 0px;
    top: ${props => props.viewwidth - 5}vw;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: ${props => props.active ? 'block' : 'none'};
    color: #fffff7;
    text-align: center;
    font-family: 'Roboto Slab';
    font-size: .9rem;
`

export const Slide = forwardRef((props, ref) => {
    const [hovered, setHovered] = useState(false);
    const slides = props.slides.map((s, i) => {
        return (
            <ActiveDiv key={i}
                active={i === props.activeIndex}
                viewwidth={props.viewwidth}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <ImgDiv src={s.img}>
                </ImgDiv>
                <CaptionDiv active={hovered} viewwidth={props.viewwidth}>
                    {s.caption}
                </CaptionDiv>
            </ActiveDiv>
        )
    })


    return (
        <div ref={ref} className={props.className}>
            {slides}
        </div>

    )

})

export const Carousel = forwardRef((props, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    const dots = props.slides.map((d, i) => {
        return (
            <Dot key={i} active={i === activeIndex} onClick={() => setActiveIndex(i)}></Dot>
        )
    })


    return(
        <SlidesDiv ref={ref} className={props.className}>
           <Slide viewwidth={props.viewwidth} activeIndex={activeIndex} slides={props.slides} captions={props.captions}></Slide>
            <DotsDiv>
                {dots}
            </DotsDiv>
        </SlidesDiv>
    )



})

