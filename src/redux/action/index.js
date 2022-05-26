import { getToken, getQuestions } from '../../services/api';

// ACTION TYPES
const TOKEN_ACTION = 'TOKEN_ACTION';
const PICTURE_ACTION = 'PICTURE_ACTION';
const SET_PLAYER = 'SET_PLAYER';
const QUESTIONS_ACTION = 'QUESTIONS_ACTION';
const SCORE_ACTION = 'SCORE_ACTION';

export const actionTypes = {
  TOKEN_ACTION,
  PICTURE_ACTION,
  SET_PLAYER,
  QUESTIONS_ACTION,
  SCORE_ACTION,
};

// ACTIONS CREATORS

const setToken = (token) => ({
  type: TOKEN_ACTION,
  token,
});

const setPlayer = (playerInfo) => ({
  type: SET_PLAYER,
  playerInfo,
});

const setQuestions = (questions) => ({
  type: QUESTIONS_ACTION,
  questions,
});

const setScore = (score) => ({
  type: SCORE_ACTION,
  score,
});

const pictureAction = (picture) => ({
  type: PICTURE_ACTION,
  picture,
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
  getTokenThunk,
  setQuestions,
  setPlayer,
  setScore,
  pictureAction,
  getQuestionsThunk,
};
