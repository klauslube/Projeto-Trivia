import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../components/CreateButton';

class Ranking extends Component {
  render() {
    const { history } = this.props;

    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <CreateButton
          placeholder="Home page"
          testID="btn-go-home"
          onClick={ () => history.push('/') }
        />
      </section>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }),
}.isRequired;
