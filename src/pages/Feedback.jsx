import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  state = {
    feedbackText: '',
  }

  componentDidMount() {
    const { assertions } = this.props;
    const Comparation = 3;
    const feedbackText = assertions < Comparation ? 'Could be better...' : 'Well Done!';
    this.setState({ feedbackText });
  }

  render() {
    const { score, assertions } = this.props;
    const { feedbackText } = this.state;
    return (
      <section>
        <h2 data-testid="feedback-text">{ feedbackText }</h2>

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
