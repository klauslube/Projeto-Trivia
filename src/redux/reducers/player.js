import { actionTypes } from '../action';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
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

  default:
    return state;
  }
};

export default playerReducer;
