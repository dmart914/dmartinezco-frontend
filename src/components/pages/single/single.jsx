import React, { Component } from 'react';

import Loading from '../../atoms/loading/loading';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: null,
      pageFetchError: null,
    }

    this._fetchPageData();
  }

  _fetchPageData = () => {
    const {
      match: { params: { objectId, objectType, } },
      wp,
    } = this.props;

    wp._fetchSingle(objectId, objectType)
      .then(data => { this.setState({ pageData: data }) })
      .catch(err => { this.setState({ pageFetchError: err }) });
  }

  render() {
    const {
      match: { params: { objectId, objectType, } },
    } = this.props;

    const { pageData, pageFetchError, } = this.state;

    if (pageData === null) {
      return <Loading />
    }

    if (pageFetchError !== null) {
      return pageFetchError.message;
    }

    return (
      <div id={`${objectType}_${objectId}`} className={`${objectType}`}>
        <div className='title'>
          <h2 dangerouslySetInnerHTML={{
            __html: pageData.title.rendered,
          }} />
        </div>
        <div className='content'>
          <article dangerouslySetInnerHTML={{
            __html: pageData.content.rendered,
          }} />
        </div>
      </div>
    )
  }
}
