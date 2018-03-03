import WPAPI from 'wpapi';

export default class WP {
  constructor(url) {
    this.wp = null;
    this.url = url;
  }

  init() {
    return new Promise((resolve, reject) => {
      WPAPI.discover(this.url).then(site =>{
        console.log(site);
        resolve((this.wp = site))
      });
    });
  }
}
