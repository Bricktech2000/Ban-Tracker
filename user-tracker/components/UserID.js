import React, { Component } from 'react';

import styles from './UserID.module.css';

class UserID extends Component {
  state = {};
  render() {
    return <div className={styles.UserID}>{this.props.id}</div>;
  }
}

export default UserID;
