import { getToken, getQuestions } from '../../services/api';

// ACTION TYPES
const TOKEN_ACTION = 'TOKEN_ACTION';
const PICTURE_ACTION = 'PICTURE_ACTION';
const SET_PLAYER = 'SET_PLAYER';
const QUESTIONS_ACTION = 'QUESTIONS_ACTION';
const SCORE_ACTION = 'SCORE_ACTION';
const INVALID_TOKEN = 'INVALID_TOKEN';
const ASSERTIONS_ACTION = 'ASSERTIONS_ACTION';
const RESET_ACTION = 'RESET_ACTION';

export const actionTypes = {
  TOKEN_ACTION,
  PICTURE_ACTION,
  SET_PLAYER,
  QUESTIONS_ACTION,
  SCORE_ACTION,
  INVALID_TOKEN,
  ASSERTIONS_ACTION,
  RESET_ACTION,
};

// ACTIONS CREATORS

export const setToken = (token) => ({
  type: TOKEN_ACTION,
  token,
});

export const setPlayer = (playerInfo) => ({
  type: SET_PLAYER,
  playerInfo,
});

export const setQuestions = (questions) => ({
  type: QUESTIONS_ACTION,
  questions,
});

export const setScore = (score) => ({
  type: SCORE_ACTION,
  score,
});

export const pictureAction = (picture) => ({
  type: PICTURE_ACTION,
  picture,
});

export const invalidToken = () => ({
  type: INVALID_TOKEN,
});

export const correctAction = (valor) => ({
  type: ASSERTIONS_ACTION,
  valor,
});

export const resetUserAction = () => ({
  type: RESET_ACTION,
});

export const getTokenThunk = () => async (dispatch) => {
  const result = await getToken();
  localStorage.setItem('token', result.token);
  dispatch(setToken(result.token));
};

export const getQuestionsThunk = () => async (dispatch) => {
  const error = 3;
  const token = localStorage.getItem('token');
  const result = await getQuestions(token);
  console.log(result.response_code);
  if (result.response_code === error) {
    dispatch(invalidToken());
  } else {
    dispatch(setQuestions(result.results));
  }
};
