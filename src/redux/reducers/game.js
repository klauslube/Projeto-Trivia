import { actionTypes } from '../action';

const INITIAL_STATE = {
  invalidToken: false,
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.QUESTIONS_ACTION:
    return {
      ...state,
      questions: action.questions,
      invalidToken: false,
    };
  case actionTypes.INVALID_TOKEN:
    return {
      ...state,
      invalidToken: true,
    };
  default:
    return state;
  }
};

export default gameReducer;
