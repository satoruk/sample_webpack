import React, { Component, PropTypes } from 'react';

class App extends Component {
  static get displayName() {
    return 'App';
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default App;
