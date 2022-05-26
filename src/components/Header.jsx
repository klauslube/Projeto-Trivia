import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userName, userEmail, score } = this.props;
    const userUrl = `https://www.gravatar.com/avatar/${md5(userEmail).toString()}`;

    return (
      <header>
        <img src={ userUrl } data-testid="header-profile-picture" alt="the user avater" />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { player: { name, gravatarEmail,
  score } } }) => ({
  userName: name,
  userEmail: gravatarEmail,
  score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
