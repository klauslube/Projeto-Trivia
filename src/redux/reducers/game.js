import { actionTypes } from '../action';

const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.QUESTIONS_ACTION:
    return { questions: action.questions };
  default:
    return state;
  }
};

export default gameReducer;
