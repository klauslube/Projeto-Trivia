import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { type, placeholder, testID, name, handleInput } = this.props;
    return (
      <input
        type={ type }
        placeholder={ placeholder }
        data-testid={ testID }
        name={ name }
        onChange={ handleInput }
      />
    );
  }
}

Login.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  testID: PropTypes.string,
  name: PropTypes.string,
  handleInput: PropTypes.func,
}.isRequired;

export default Login;
