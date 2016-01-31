import React from 'react';
import ReactDOM from 'react-dom';

import { App, Button } from './components';

if (typeof process === 'undefined') {
  console.log('process is undefined');
} else if (typeof process.env === 'undefined') {
  console.log('process.env is undefined');
} else if (typeof process.env.NODE_ENV === 'undefined') {
  console.log('process.env.NODE_ENV is undefined');
} else {
  console.log(`process.env.NODE_ENV is "${process.env.NODE_ENV}"`);
}

ReactDOM.render(
  <App><Button/></App>,
  document.getElementById('content')
);
