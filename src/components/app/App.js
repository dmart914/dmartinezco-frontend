import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Menu from '../organisms/menu/menu';
import Header from '../organisms/header/header';
import Loading from '../atoms/loading/loading';

import WP from '../../lib/wp';
const wp = new WP(process.env.REACT_APP_WP_HOST, {
  primaryMenuId: process.env.REACT_APP_WP_PRIMARY_MENU_ID
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    wp.init().then(() => this.setState({ loaded: true }));
  }

  render() {
    if (!this.state.loaded) return <Loading />;

    const { primaryMenu } = wp.data;

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Menu data={primaryMenu} />

            <Route path='/sample-page' render={props => (<h1>Sample Page</h1>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
