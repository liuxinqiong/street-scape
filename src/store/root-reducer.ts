import { combineReducers } from 'redux';
import { homeReducer } from './home/reducers';

const root = combineReducers({
  home: homeReducer
});

export default function rootReducer(state: any, action: any) {
  return root(state, action);
}
