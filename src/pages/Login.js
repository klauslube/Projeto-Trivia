import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';
// import { addToken } from '../services/localStore';
import { getTokenThunk, setPlayer } from '../redux/action';
import styles from '../styles/Login.module.scss';
import settingSVG from '../assets/svg/settings.svg';
import Logo from '../components/Logo';

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
    const { history, dispatch } = this.props;
    const { userName, userEmail } = this.state;
    await dispatch(getTokenThunk());
    dispatch(setPlayer({
      name: userName,
      gravatarEmail: userEmail,
    }));
    history.push('/game');
  }

  render() {
    const { userName, userEmail, isDisable } = this.state;

    return (
      <div className={ styles.div_container }>
        <Logo />
        <form className={ styles.form_container }>
          <CreateInput
            className={ styles.login_input }
            placeholder="User"
            testID="input-player-name"
            name="userName"
            handleInput={ this.handleChange }
            value={ userName }
          />

          <CreateInput
            className={ styles.login_input }
            placeholder="E-mail"
            testID="input-gravatar-email"
            name="userEmail"
            handleInput={ this.handleChange }
            value={ userEmail }
          />

          <CreateButton
            className={ styles.login_button }
            placeholder="Play"
            testID="btn-play"
            isDisable={ isDisable }
            onClick={ this.handlePlayClick }
          />

        </form>
        <Link to="/settings" data-testid="btn-settings">
          <button
            type="button"
            className={ styles.settings_button }
          >
            <img
              className={ styles.settings }
              src={ settingSVG }
              alt="engrenagem de settings"
            />
          </button>
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
