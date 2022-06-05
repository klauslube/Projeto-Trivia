import React, { Component } from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import styles from '../styles/QuestionCard.module.scss';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      incorrectOptions: [],
    };
  }

  componentDidMount = () => {
    const { question } = this.props;
    const magicNumber = 0.5;
    const options = [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - magicNumber); // Embaralhar array https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
    const incorrectOptions = options.filter((option) => question
      .incorrect_answers.includes(option));

    this.setState({
      options,
      incorrectOptions,
    });
  }

  render() {
    const { answerClickHandler, question, isButtonDisabled, correctColor,
      incorrectColor } = this.props;
    const { options, incorrectOptions } = this.state;
    return (
      <section className={ styles.section_game }>
        <div className={ styles.div_container_text }>
          <p
            data-testid="question-category"
            className={ styles.question_category }
          >
            {`Categoria: ${question.category}`}
          </p>
          <h3
            data-testid="question-text"
            className={ styles.question_text }
          >
            { he.decode(question.question) }
          </h3>
        </div>
        <section
          data-testid="answer-options"
          className={ styles.section_container_question_card }
        >
          {options.map((option, index) => (
            <button
              disabled={ isButtonDisabled }
              onClick={ answerClickHandler }
              key={ index }
              type="button"
              id={
                incorrectOptions.includes(option)
                  ? `wrong-answer-${incorrectOptions.indexOf(option)}`
                  : 'correct-answer'
              }
              data-testid={
                incorrectOptions.includes(option)
                  ? `wrong-answer-${incorrectOptions.indexOf(option)}`
                  : 'correct-answer'
              }
              className={
                incorrectOptions.includes(option)
                  ? (`${incorrectColor} ${styles.button}`)
                  : (`${correctColor} ${styles.button}`)
              }
            >
              { he.decode(option) }
            </button>
          ))}
        </section>

      </section>
    );
  }
}

export default QuestionCard;

QuestionCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object),
  answerClickHandler: PropTypes.func,
}.isRequired;
