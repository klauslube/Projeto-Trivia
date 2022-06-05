import React from 'react';
import logo from '../trivia.png';
import styles from '../styles/Logo.module.scss';

class Logo extends React.Component {
  render() {
    return (
      <header className={ styles.App_header }>
        <img src={ logo } className={ styles.App_logo } alt="logo" />
      </header>
    );
  }
}

export default Logo;
