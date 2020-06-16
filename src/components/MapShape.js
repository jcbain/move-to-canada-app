import React, {forwardRef} from 'react';

const MapShape = forwardRef((props, ref) => {
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

export default MapShape;