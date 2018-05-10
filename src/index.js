import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';


import WP from './lib/wp';

const wp = new WP(
  process.env.REACT_APP_WP_HOST,
  {
    primaryMenuId: process.env.REACT_APP_WP_PRIMARY_MENU_ID
  }
);

ReactDOM.render(<App wp={wp} />, document.getElementById('root'));
registerServiceWorker();
