import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateInput extends Component {
  render() {
    const { type, placeholder, testID, name, handleInput, value } = this.props;
    return (
      <input
        type={ type }
        placeholder={ placeholder }
        data-testid={ testID }
        name={ name }
        onChange={ handleInput }
        value={ value }
      />
    );
  }
}

CreateInput.defaultProps = {
  type: 'text',
  testID: '',
};

CreateInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  testID: PropTypes.string,
  name: PropTypes.string,
  handleInput: PropTypes.func,
  value: PropTypes.string,
}.isRequired;
