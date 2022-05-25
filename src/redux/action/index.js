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

export const actionCreators = {
  setToken,
  setPlayer,
  setQuestions,
  getTokenThunk,
};
