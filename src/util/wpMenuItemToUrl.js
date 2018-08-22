/**
 * Takes a Wordpress menu item object and returns a absolute URL path
 * as a string
 * @returns string
**/

export default function wpMenuItemToUrl(menuItem) {
  const {
    object,
    object_id,
    url
  } = menuItem;
  switch (object) {
    case 'page':
      return `/pages/${object_id}`;

    case 'post':
      return `/posts/${object_id}`;

    case 'custom':
      return url;

    case 'category':
      return `/category/${object_id}`;

    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Unknown object type:', object);
      }
      return url;
  }
}
