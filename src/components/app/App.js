import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Menu from '../organisms/menu/menu';
import Header from '../organisms/header/header';
import Loading from '../atoms/loading/loading';
import Single from '../pages/single/single';
import Loop from '../pages/loop/loop';

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
    const { frontPage, primaryMenu, siteMeta } = wp.data;

    return (
      <BrowserRouter>
        <div className="App">
          <Header
            title={siteMeta.name}
            description={siteMeta.description}
          />

          <Menu data={primaryMenu} />

          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <Single {...props}
                  pageData={frontPage}
                  wp={wp}
                />
                <Loop match={{ params: { objectType: 'posts', tag: 'home', page: 1 }}} wp={wp} />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/:objectType(posts|pages)/:objectId"
            render={props => (
              <Single {...props} wp={wp} />
            )}
          />

          <Route
            exact
            path="/:objectType(categories|posts|pages|tags)/:slug?"
            render={props => (
              <Loop {...props} wp={wp} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
