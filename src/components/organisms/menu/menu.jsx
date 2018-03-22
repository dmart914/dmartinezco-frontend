import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to={item.url}>{item.title}</Link>
    </li>
  );
}
