import * as TYPES from './types';

export function setMapInstance(map: any) {
  return {
    type: TYPES.SET_MAP_INSTANCE,
    payload: map
  };
}

export function setClassifiedRoads(roads: any) {
  return {
    type: TYPES.SET_CLASSIFIED_ROADS,
    payload: roads
  };
}
