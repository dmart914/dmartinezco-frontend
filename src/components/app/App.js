import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Menu from '../organisms/menu/menu';
import Header from '../organisms/header/header';
import Loading from '../atoms/loading/loading';
import Single from '../pages/single/single';

import HomePage from '../pages/home/home';


class App extends Component {
  static defaultProps = {
    wp: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };

    this.props.wp
      .init()
      .then(() => this.setState({ loaded: true }));
  }

  render() {
    if (!this.state.loaded || !this.props.wp) {
      return <Loading />;
    }

    const { wp } = this.props;
    const { primaryMenu, siteMeta } = wp.data;

    return (
      <BrowserRouter>
        <div className="App">
          <Header
            title={siteMeta.name}
            description={siteMeta.description} />

          {/**<Route exact path="/" render={props => <HomePage />} />**/}

          <Menu data={primaryMenu} />

          <Route
            path="/:objectType(page|post)/:objectId"
            render={props => (
              <Single {...props} wp={wp}/>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
