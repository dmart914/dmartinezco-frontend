import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import wpSingleToUrl from '../../../util/wpSingleToUrl';

export default class Loop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loopData: null,
      loading: true,
    };

    this._fetchLoopData();
  }

  _fetchLoopData = () => {
    const { match, wp } = this.props;
    if (!match || !match.params || !match.params.objectType) {
      return;
    }

    const { objectType, page } = match.params;
    wp._fetchPaginatedContent(objectType, page, 10, [])
      .then(data => {
        this.setState({
          loopData: data,
          loading: false,
        });
      });
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
    const { loopData } = this.state;
    if (!loopData) { return (<p>No content.</p>); }

    return (
      <div className="content">
        { this._generateLoopMarkup(loopData) }
      </div>
    )
  }
}
