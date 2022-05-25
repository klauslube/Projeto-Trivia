const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    assertions: 0,
  },
};

const userReducer = (state = INITIAL_STATE) => state;

export default userReducer;
