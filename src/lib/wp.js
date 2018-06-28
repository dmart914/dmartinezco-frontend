import WPAPI from 'wpapi';
import axios from 'axios';

export default class WP {
  constructor(url, settings) {
    this.site = null;
    this.url = url;

    this.settings = {
      primaryMenuId: null,
      ...settings
    };

    this.data = {
      primaryMenu: null,
      siteMeta: null,
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      WPAPI.discover(this.url)
        .then(site => (this.site = site))
        .then(() => this._fetchPrimaryMenu(this.settings.primaryMenuId))
        .then(() => this._fetchSiteMeta())
        .then(() => resolve());
    });
  }

  _fetchPrimaryMenu = menuId => {
    return new Promise((resolve, reject) => {
      this.site
        .namespace('dmco')
        .menu()
        .location()
        .id('dmco_primary_menu')
        .then(data => (this.data.primaryMenu = data))
        .then(() => resolve());
    });
  };

  _fetchSiteMeta = () => {
    return axios.get(`${this.url}/wp-json`)
      .then(resp => {
        const { data } = resp;
        if (!data) { throw new Error('Site meta not found'); }
        this.data.siteMeta = data;
      });
  }

  _fetchSingle = (id, type) => {
    switch (type) {
      case 'post':
      case 'page':
        return this.site.pages().id(id);

      default:
        return new Promise(() => { throw new Error('Type not found') });
    }

  }

  _
}
