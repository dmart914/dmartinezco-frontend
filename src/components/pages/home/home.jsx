import React, { Component } from 'react'
import wp from '../../../lib/wp';

export default class HomePage extends Component {
  render() {
    const { post_content } = this.props.frontPage;
    return (
      <div dangerouslySetInnerHTML={{ __html: post_content }} />
    );
  }
}
