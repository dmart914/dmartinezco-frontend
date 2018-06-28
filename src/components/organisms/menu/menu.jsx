import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wpMenuItemToUrl from '../../../util/wpMenuItemToUrl';

export default class Menu extends Component {
  get _navLinks() {
    const { items } = this.props.data;
    return items.map(this._navLink);
  }

  _navLink = (item) => (
    <li key={item.ID}>
      {
        item.object === 'custom'
        ? (
          <a href={item.url} target="_blank">
            {item.title}
          </a>
        )
        : (
          <Link to={wpMenuItemToUrl(item)}>
            {item.title}
          </Link>
        )
      }
    </li>
  );

  render() {
    return (
      <nav>
        <ul>{this._navLinks}</ul>
      </nav>
    );
  }
}
