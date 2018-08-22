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
      frontPage: null,
      primaryMenu: null,
      siteMeta: null,
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      WPAPI.discover(this.url)
        .then(site => (this.site = site))
        .then(() => Promise.all([
          this._fetchPrimaryMenu(this.settings.primaryMenuId),
          this._fetchFrontPage(),
          this._fetchSiteMeta(),
        ]))
        .then(() => resolve());
    });
  }

  _fetchFrontPage = () => {
    return new Promise((resolve, reject) => {
      this.site
        .namespace('dmco')
        .front_page_id()
        .then(pageId => {
          if (pageId === null) { return resolve(); }
          return this._fetchSingle(pageId, 'pages')
        })
        .then(data => { this.data.frontPage = data; })
        .then(() => resolve());
    })
  }

  _fetchPaginatedContent = (contentType, page=1, perPage=10, params=[]) => {
    return new Promise((resolve, reject) => {
      let content = this._getCollectionHandler(contentType);
      if (!content) { return reject(`No content type for ${contentType}`); }
      content.perPage(perPage);
      content.page(page);
      params.forEach(p => { content.param(p[0], p[1]); });
      return resolve(content);
    })
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
      case 'posts':
      case 'pages':
        return this.site.pages().id(id);

      default:
        return new Promise(() => { throw new Error('Type not found') });
    }

  }

  _getCollectionHandler = (type) => {
    switch (type) {
      case 'posts':
        return this.site.posts();
      case 'pages':
        return this.site.pages();
      default:
        return null;
    }
  }
}
