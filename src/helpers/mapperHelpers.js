import { geoAlbers } from 'd3-geo';

export const createProjection = (width, height, scale, centerLong, centerLat) => {
    return geoAlbers().scale([width * scale])
        .rotate([centerLong, 0])
        .center([0, centerLat])
        .translate([width/2, height/2])
}

