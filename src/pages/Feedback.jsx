import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    // const { feedbackText } = this.state;
    const assertionsComp = 3;
    console.log('feedback assertions', assertions);
    return (
      <section>
        <h2 data-testid="feedback-text">
          {
            assertions < assertionsComp ? 'Could be better...' : 'Well Done!'
          }

        </h2>

        <h3>
          { 'Sua pontuação foi de: ' }
          <span data-testid="feedback-total-score">{ score }</span>
        </h3>

        <h3>
          { 'Você acertou: ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
        </h3>
      </section>
    );
  }
}

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  Assertions: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;
