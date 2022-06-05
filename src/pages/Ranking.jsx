import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../components/CreateButton';
import { readRanking } from '../services/localStore';
import styles from '../styles/Ranking.module.scss';

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
    if (a.score > b.score) {
      return numberNeg;
    }
    const one = 1;
    return one;
  }

  renderRanking = (rank, index) => (
    <ul key={ index } className={ styles.ul_no_dots }>
      <li><img alt="avatar" src={ rank.picture } className={ styles.img_player } /></li>
      <li data-testid={ `player-name-${index}` }>{rank.name}</li>
      <li data-testid={ `player-score-${index}` }>{`${rank.score} pontos`}</li>
    </ul>
  )

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <section className={ styles.section_container }>
        <h1
          data-testid="ranking-title"
          className={ styles.title }
        >
          Ranking
        </h1>
        <hr className={ styles.hr } />
        {ranking.map(this.renderRanking)}
        <CreateButton
          className={ styles.button }
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
