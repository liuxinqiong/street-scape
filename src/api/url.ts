export const ROAD_CLASSIFY = '/road/classify';

export const ROADS = function(districtName: string) {
  return `/district/${districtName}/roads`;
};
