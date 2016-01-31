import React, { Component } from 'react';

import s from './Button.scss';

class Button extends Component {
  static get displayName() {
    return 'Button';
  }

  render() {
    return (
      <div className={s.root}>
        <button>Button</button>
      </div>
    );
  }
}
export default Button;
