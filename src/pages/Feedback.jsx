import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CreateButton from '../components/CreateButton';
import { resetUserAction } from '../redux/action';

class Feedback extends Component {
  render() {
    const { score, assertions, history, reset } = this.props;
    const assertionsComp = 3;
    return (
      <section>
        <Header />
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

        <CreateButton
          placeholder="Play Again"
          testID="btn-play-again"
          onClick={ () => {
            history.push('/');
            reset();
          } }
        />
        <CreateButton
          placeholder="Ranking"
          testID="btn-ranking"
          onClick={ () => {
            history.push('/ranking');
            reset();
          } }
        />
      </section>
    );
  }
}

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

const mapDispatchToProps = (Dispatch) => ({
  reset: () => Dispatch(resetUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  Assertions: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }),
}.isRequired;
