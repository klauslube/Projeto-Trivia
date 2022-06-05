import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import CreateButton from '../components/CreateButton';
import { resetUserAction } from '../redux/action';
import styles from '../styles/Feedback.module.scss';

class Feedback extends Component {
  render() {
    const { score, assertions, history, reset } = this.props;
    const assertionsComp = 3;
    return (
      <section>
        <Header />
        <div className={ styles.div_container }>
          <h2 data-testid="feedback-text">
            {
              assertions < assertionsComp ? 'Could be better...' : 'Well Done!'
            }
          </h2>

          <h3>
            { 'Sua pontuação foi de: ' }
            <span data-testid="feedback-total-score">{ score }</span>
          </h3>

          <h4>
            { 'Você acertou: ' }
            <span data-testid="feedback-total-question">{ assertions }</span>
          </h4>

          <CreateButton
            className={ styles.button }
            placeholder="Play Again"
            testID="btn-play-again"
            onClick={ () => {
              history.push('/');
              reset();
            } }
          />
          <CreateButton
            className={ styles.buttonRnk }
            placeholder="Ranking"
            testID="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
              reset();
            } }
          />
        </div>
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
