export default function wpSingleToUrl(item) {
  const { id, type } = item;

  switch (type) {
    case 'page':
      return `/pages/${id}`;

    case 'post':
      return `/posts/${id}`;

    default:
      return '';
  }
}
