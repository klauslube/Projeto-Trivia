const getToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json());

/*   {"response_code":0,"response_message":"Token Generated Successfully!",
  "token":"8f149e8787a8304bead0ba16fee1800a2a862e748455001bb79b963e09144c38"}
 */
const getQuestions = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json());

module.exports = {
  getToken,
  getQuestions,
};
