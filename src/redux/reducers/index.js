import { combineReducers } from 'redux';
import token from './token';
import player from './player';
import game from './game';

const rootReducer = combineReducers({ token, player, game });

export default rootReducer;
