import { actionTypes } from '../action';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  // console.log('playerReducer', action.valor);
  // console.log('playerReducer - state', state.assertions);
  switch (action.type) {
  case actionTypes.PICTURE_ACTION:
    return {
      ...state,
      picture: action.picture,
    };
  case actionTypes.SCORE_ACTION:
    localStorage.setItem('score', +state.score + +action.score);
    return {
      ...state,
      score: action.score + state.score,
    };

  case actionTypes.SET_PLAYER:
    return {
      ...state,
      ...action.playerInfo,
    };
  case actionTypes.ASSERTIONS_ACTION:
    return {
      ...state,
      assertions: state.assertions + action.valor,
    };
  case actionTypes.RESET_ACTION:
    return {
      name: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
    };

  default:
    return state;
  }
};

export default playerReducer;
