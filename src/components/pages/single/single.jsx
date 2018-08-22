import React, { Component } from 'react';

import Loading from '../../atoms/loading/loading';

export default class Single extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: props.pageData || null,
      pageFetchError: null,
    }

    if (!this.state.pageData) {
      const { match: { params: { objectId, objectType } } } = this.props;
      this._fetchPageData(objectId, objectType);
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: {
      objectId,
      objectType,
    } } } = this.props;

    const { match: { params: {
      objectId: prevObjectId,
      objectType: prevObjectType
    } } } = prevProps;

    if (prevObjectId !== objectId || prevObjectType !== objectType) {
      this.setState({ pageData: null, pageFetchError: null, });
      this._fetchPageData(objectId, objectType);
    }
  }

  _fetchPageData = (objectId, objectType) => {
    const { wp } = this.props;

    wp._fetchSingle(objectId, objectType)
      .then(data => {
        this.setState({
          pageData: data,
          pageFetchError: null
        })
      })
      .catch(err => { this.setState({ pageFetchError: err }) });
  }

  render() {
    const {
      match: { params: { objectId, objectType, } },
    } = this.props;

    const { pageData, pageFetchError, } = this.state;

    if (pageFetchError !== null) {
      return pageFetchError.message;
    }

    if (pageData === null) {
      return <Loading />
    }

    return (
      <div id={`${objectType}_${objectId}`} className={`${objectType}`}>
        <div className='title'>
          <h3 dangerouslySetInnerHTML={{
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
