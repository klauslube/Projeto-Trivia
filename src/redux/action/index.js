import { getToken, getQuestions } from '../../services/api';

// ACTION TYPES
const TOKEN_ACTION = 'TOKEN_ACTION';

export const actionTypes = {
  TOKEN_ACTION,
};

// ACTIONS CREATORS

const setToken = (token) => ({
  type: TOKEN_ACTION,
  token,
});

const setPlayer = (player) => ({
  type: 'SET_PLAYER',
  player,
});

const setQuestions = (questions) => ({
  type: 'SET_QUESTIONS',
  questions,
});

const getTokenThunk = () => async (dispatch) => {
  const result = await getToken();
  localStorage.setItem('token', result.token);
  dispatch(setToken(result.token));
};
const getQuestionsThunk = () => async (dispatch, getState) => {
  const { token } = getState();
  const result = await getQuestions(token);
  const ERROR = 3;
  if (result.response_code === ERROR) {
    await dispatch(getTokenThunk());
    const { token: newToken } = getState();
    const questions = await getQuestions(newToken);
    dispatch(setQuestions(questions.results));
  } else {
    dispatch(setQuestions(result.results));
  }
};

export const actionCreators = {
  setToken,
  setPlayer,
  setQuestions,
  getTokenThunk,
  getQuestionsThunk,
};
