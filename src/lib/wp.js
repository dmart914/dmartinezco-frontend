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
        .id(menuId)
        .then(data => {
          if (data.items && data.items.length > 0) {
            for (let i = 0; i < data.items.length; i++) {
              data.items[i].url = data.items[i].url.replace(
                process.env.REACT_APP_WP_HOST,
                ''
              );
            }
          }

          this.data.primaryMenu = data;
        })
        .then(() => resolve());
    });
  };
}
