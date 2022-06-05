import React, { Component } from 'react';
import styles from '../styles/Settings.module.scss';

class Settings extends Component {
  render() {
    return (
      <section className={ styles.section_container }>
        <h1 data-testid="settings-title">Settings</h1>
      </section>
    );
  }
}

export default Settings;
