import * as TYPES from './types';
import { ClassifiedRoadsType } from 'models/Road';

type StateType = {
  map: any;
  classifiedRoads: ClassifiedRoadsType;
};

const initialState: StateType = {
  map: null,
  classifiedRoads: {}
};

export function homeReducer(state = initialState, action: any) {
  switch (action.type) {
    case TYPES.SET_MAP_INSTANCE:
      return { ...state, map: action.payload };
    case TYPES.SET_CLASSIFIED_ROADS:
      return { ...state, classifiedRoads: action.payload };
    default:
      return initialState;
  }
}
