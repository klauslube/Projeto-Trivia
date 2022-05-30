import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../components/CreateButton';
import { readRanking } from '../services/localStore';

class Ranking extends Component {
  state ={
    ranking: [],
  }

  componentDidMount() {
    const dadosRanking = readRanking();
    dadosRanking.sort(this.ordemScore);
    this.setState({
      ranking: dadosRanking });
  }

  ordemScore = (a, b) => {
    const numberNeg = -1;
    if (a.score > b.score) return numberNeg;
    if (a.score < b.score) return 1;
  }

  renderRanking = (rank, index) => (
    <ul key={ index }>
      <li><img alt="avatar" src={ rank.picture } /></li>
      <li data-testid={ `player-name-${index}` }>{rank.name}</li>
      <li data-testid={ `player-score-${index}` }>{rank.score}</li>
    </ul>
  )

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map(this.renderRanking)}
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
