import * as TYPES from './types';
import { ClassifiedRoadsType } from 'models/Road';
import { PointOverlay } from 'models/PointOverlay';

type StateType = {
  map: any; // 地图实例
  classifiedRoads: ClassifiedRoadsType; // 已评估的街道 byId 类型数据集合
  classifiedPointOverlays: PointOverlay[]; // 已评估 BMap.Overlay 实例
};

const initialState: StateType = {
  map: null,
  classifiedRoads: {},
  classifiedPointOverlays: []
};

export function homeReducer(state = initialState, action: any) {
  switch (action.type) {
    case TYPES.SET_MAP_INSTANCE:
      return { ...state, map: action.payload };
    case TYPES.SET_CLASSIFIED_ROADS:
      return { ...state, classifiedRoads: action.payload };
    case TYPES.SET_CLASSIFIED_POINT_OVERLAYS:
      return { ...state, classifiedPointOverlays: action.payload };
    default:
      return initialState;
  }
}
