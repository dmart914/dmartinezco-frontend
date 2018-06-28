import React, { Component } from 'react';

export default class Header extends Component {
  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    const { title, description, } = this.props;
    return (
      <header>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </header>
    )
  }
}
