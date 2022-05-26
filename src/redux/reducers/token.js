import { actionTypes } from '../action';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.TOKEN_ACTION:
    return action.token;
  default:
    return state;
  }
};

export default token;
