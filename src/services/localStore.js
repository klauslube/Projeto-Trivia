export const readToken = () => (
  JSON.parse(localStorage.getItem('token')) || ''
);

export const addToken = (token) => {
  localStorage.setItem('token', token);
};

export const readRanking = () => (
  JSON.parse(localStorage.getItem('ranking')) || ''
);
