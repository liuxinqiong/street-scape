import * as TYPES from './types';

const initialState = {
  map: null
};

export function homeReducer(state = initialState, action: any) {
  switch (action.type) {
    case TYPES.SET_MAP_INSTANCE:
      return { ...initialState, map: action.payload };
    default:
      return state;
  }
}
