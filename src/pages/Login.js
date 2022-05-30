import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';
import { getTokenThunk, setPlayer } from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisable: true,
      userName: '',
      userEmail: '',
    };
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

  handlePlayClick = async () => {
    const { history, dispatchGetToken, dispatchSetPlayer } = this.props;
    const { userName, userEmail } = this.state;
    await dispatchGetToken();
    dispatchSetPlayer({
      name: userName,
      gravatarEmail: userEmail,
    });
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

const mapDispatchToProps = (dispatch) => ({
  dispatchGetToken: () => dispatch(getTokenThunk()),
  dispatchSetPlayer: (player) => dispatch(setPlayer(player)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchGetToken: PropTypes.func.isRequired,
  dispatchSetPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
