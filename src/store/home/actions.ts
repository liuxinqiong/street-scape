import * as TYPES from './types';
import { PointOverlay } from 'models/PointOverlay';
import { Road } from 'models/Road';

export function setMapInstance(map: any) {
  return {
    type: TYPES.SET_MAP_INSTANCE,
    payload: map
  };
}

export function setClassifiedRoads(roads: Road) {
  return {
    type: TYPES.SET_CLASSIFIED_ROADS,
    payload: roads
  };
}

export function setClassifiedPointOverlays(pointOverlays: PointOverlay) {
  return {
    type: TYPES.SET_CLASSIFIED_POINT_OVERLAYS,
    payload: pointOverlays
  };
}

export function setSelectedModel(model: string) {
  return {
    type: TYPES.SET_SELECTED_MODEL,
    payload: model
  };
}
