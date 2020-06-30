import { geoAlbers, geoDistance } from 'd3-geo';

export const createProjection = (width, height, scale, centerLong, centerLat) => {
    return geoAlbers().scale([width * scale])
        .rotate([centerLong, 0])
        .center([0, centerLat])
        .translate([width/2, height/2])
}

export const getDistanceOfPath = (coordsArray, inMiles=false) => {
    const earthRadius = 3959;
    let cumDist = coordsArray.map((d, i, a) => {
        const curr = a[i]
        const next = a[i + 1] !== undefined ? a[i + 1] : a[i]
        const distance = geoDistance(curr, next) * earthRadius;
        return distance
    }).reduce((totalDist, currDist) => totalDist + currDist)

    cumDist = !inMiles ? cumDist * 1.609344 : cumDist
    return cumDist
}



