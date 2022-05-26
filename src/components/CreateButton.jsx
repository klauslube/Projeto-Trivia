import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateButton extends Component {
  render() {
    const { placeholder, testID, onClick, isDisable } = this.props;
    return (
      <button
        type="button"
        data-testid={ testID }
        onClick={ onClick }
        disabled={ isDisable }
      >
        { placeholder }
      </button>
    );
  }
}

CreateButton.defaultProps = {
  testID: '',
  isDisable: false,
};

CreateButton.propTypes = {
  placeholder: PropTypes.string,
  testID: PropTypes.string,
  onClick: PropTypes.func,
  isDisable: PropTypes.bool,
}.isRequired;
