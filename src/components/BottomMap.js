import React from 'react';
import { geoPath } from 'd3-geo';
import styled from 'styled-components';

import{ MapShape } from './MapShapes';
import MapContainer from './MapContainer';
import {createProjection} from '../helpers/mapperHelpers'

const MapItemsDiv = styled.div`
    width: 100vw;
    background-color: #2a00a6;
`

const BottomMap = (props) => {
    const {canadianProvinces, usStates} = props;
    const projection = createProjection(props.width, props.height, props.scale, props.centerLong, props.centerLat);
    const path = geoPath().projection(projection);

    return (
        <MapItemsDiv className={props.className}>
            <MapContainer
                projection={projection}
                path={path}
                width={props.width}
                height={props.height}
                moveCoords={[props.centerLong, props.centerLat]}
                viewWidth={100}
                viewHeight={100}

            >
                <MapShape key={'canadaprovinces'}
                    useFeatures={true}
                    className={'canadaprovincesbottom'}
                    data={canadianProvinces}
                    path={path}
                    stroke={'#4819d1'}
                    strokeWidth={'1px'}
                    fill={'#2a00a6'}>
                </MapShape>
                <MapShape key={'usstates'}
                    useFeatures={true}
                    className={'usstatesbottom'}
                    data={usStates}
                    path={path}
                    stroke={'#4819d1'}
                    strokeWidth={'1px'}
                    fill={'#2a00a6'}>
                </MapShape>

            </MapContainer>

        </MapItemsDiv>
    )

}

export default BottomMap;