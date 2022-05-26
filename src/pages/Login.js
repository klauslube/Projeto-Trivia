import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';
// import { addToken } from '../services/localStore';
import { actionCreators } from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const INITIAL_STATE = {
      name: '',
      gravatarEmail: '',
      score: 0,
    };
    dispatch(actionCreators.setPlayer(INITIAL_STATE));
  }

  handleChange = ({ target: { value, name } }) => {
    const minLength = 6;
    const includeCheck = ['@', '.com'];

    this.setState({ [name]: value }, () => {
      const { userEmail, userName } = this.state;

      const lengthCheck = userEmail.length >= minLength && userName.length > 0;
      const emailCheck = includeCheck.every((toHave) => userEmail.includes(toHave));
      const disabled = lengthCheck && emailCheck;

      this.setState({ isDisable: !disabled });
    });
  }

  /* getToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { history } = this.props;
    try {
      const dados = await response.json();
      addToken(dados.token);
      history.push('/jogos');
    } catch (error) {
      console.log(error);
    }
  } */

  handlePlayClick = async () => {
    const { history, dispatch } = this.props;
    const { userName, userEmail } = this.state;
    await dispatch(actionCreators.getTokenThunk());
    dispatch(actionCreators.setPlayer({
      name: userName,
      gravatarEmail: userEmail,
    }));
    history.push('/game');
  }

  render() {
    const { userName, userEmail, isDisable } = this.state;

    return (
      <div>

        <h1>Login</h1>
        <form>
          <CreateInput
            placeholder="User"
            testID="input-player-name"
            name="userName"
            handleInput={ this.handleChange }
            value={ userName }
          />

          <CreateInput
            placeholder="E-mail"
            testID="input-gravatar-email"
            name="userEmail"
            handleInput={ this.handleChange }
            value={ userEmail }
          />

          <CreateButton
            placeholder="Play"
            testID="btn-play"
            isDisable={ isDisable }
            onClick={ this.handlePlayClick }
          />

        </form>
        <Link to="/settings" data-testid="btn-settings">
          <button type="button">Settings</button>
        </Link>
      </div>
    );
  }
}

/* const mapStateToProps = (state) => ({
  token: state.token,
}); */

// const mapDispatchToProps = (dispatch) => ({});

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
