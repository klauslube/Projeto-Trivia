import { actionTypes } from '../action';

const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.SET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
};

export default gameReducer;
