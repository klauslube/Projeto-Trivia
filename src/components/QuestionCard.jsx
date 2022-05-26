import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { answerClickHandler, question, isButtonDisabled } = this.props;
    const { options, incorrectOptions } = this.state;
    return (
      <section className="section-question-card">
        <p data-testid="question-category">{question.category}</p>
        <h3 data-testid="question-text">{question.question}</h3>
        <section data-testid="answer-options">
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
            >
              { option }
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
