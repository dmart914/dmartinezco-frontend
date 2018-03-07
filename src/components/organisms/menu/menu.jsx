import React, { Component } from 'react';

export default class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>{this._navLinks}</ul>
      </nav>
    );
  }

  get _navLinks() {
    const { items } = this.props.data;
    return items.map(this._navLink);
  }

  _navLink = (item) => (
    <li key={item.ID}>
      <a href={item.url}>{item.title}</a>
    </li>
  );
}
