import React, { Component } from 'react';

import styles from './UserID.module.css';

class UserID extends Component {
  state = {};
  render() {
    return (
      <div
        className={styles.UserID}
        style={{
          background: `hsl(${parseInt(this.props.id) % 360}, 70%, 50%)`,
        }}
      >
        {this.props.id}
      </div>
    );
  }
}

export default UserID;
