export const readToken = () => (
  JSON.parse(localStorage.getItem('token')) || ''
);

export const addToken = (token) => {
  localStorage.setItem('token', token);
};
