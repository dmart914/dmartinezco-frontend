import WPAPI from 'wpapi';

export default class WP {
  constructor(url, settings) {
    this.site = null;
    this.url = url;

    this.settings = {
      primaryMenuId: null,
      ...settings
    };

    this.data = {
      primaryMenu: null
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      WPAPI.discover(this.url)
        .then(site => (this.site = site))
        .then(() => this._fetchPrimaryMenu(this.settings.primaryMenuId))
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
}
