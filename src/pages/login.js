import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';

class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
    isDisable: true,
  };

  handleChange = ({ target: { value, name } }) => {
    const minLength = 6;
    const includeCheck = ['@', '.com'];

    this.setState({ [name]: value }, () => {
      const { userEmail, userName } = this.state;
      const fieldCheck = [userEmail, userName];

      const lengthCheck = fieldCheck.every((field) => field.length >= minLength);
      const emailCheck = includeCheck.every((toHave) => userEmail.includes(toHave));
      const disabled = lengthCheck && emailCheck;

      this.setState({ isDisable: !disabled });
    });
  }

  render() {
    const { userName, userEmail, isDisable } = this.state;

    return (
      <div>
        <Link to="/settings" data-testid="btn-settings">Settings</Link>

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
            onClick={ () => {} }
            isDisable={ isDisable }
          />

        </form>

      </div>
    );
  }
}

export default Login;
