import { combineReducers } from 'redux';
import userReducer from './user';
import token from './token';

const rootReducer = combineReducers({
  user: userReducer, token,
});

export default rootReducer;
