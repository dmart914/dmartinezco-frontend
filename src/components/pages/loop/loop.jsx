import queryString from 'query-string';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import wpSingleToUrl from '../../../util/wpSingleToUrl';

export default class Loop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loopData: null,
      loading: true,
    };

    this._fetchLoopData();
  }

  _fetchLoopData = () => {
    const { location, match, wp } = this.props;
    if (!match || !match.params || !match.params.objectType) {
      return;
    }

    const { objectType, page, ...otherParams } = match.params;
    // @TODO: Refactor
    const search = location && location.search
      ? queryString.parse(location.search)
      : null;

    // @TODO: Refactor
    const allParams = {...otherParams, ...(search || {})};
    const PARAMS = ['slug', 'tag'];
    const safeParams = Object.keys(allParams)
      .filter(p => PARAMS.includes(p))
      .map(p => [p, allParams[p]]);

    // @TODO: Refactor undefined to perPage from safeParams (default to 10)
    wp._fetchPaginatedContent(objectType, page, undefined, safeParams)
      .then(data => {
        this.setState({
          loopData: data,
          loading: false,
        });
      })
      .catch(error => this.setState({ error }));
  }

  _generateLoopMarkup = (loopData=[]) => {
    return loopData.map(this._generateLoopItem);
  }

  _generateLoopItem = (item, indexNumber) => {
    const { title, excerpt } = item;
    const linkUrl = wpSingleToUrl(item);
    return (
      <div key={`item-${indexNumber}`} className="item">
        <Link to={linkUrl}>
          <h3 dangerouslySetInnerHTML={{ __html: title.rendered}} />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
      </div>
    );
  }

  render() {
    const { error, loopData } = this.state;
    if (!loopData) { return (<p>No content.</p>); }
    if (error) { return <pre>{JSON.stringify(error, null, '  ')}</pre> }

    return (
      <div className="content">
        { this._generateLoopMarkup(loopData) }
      </div>
    )
  }
}
