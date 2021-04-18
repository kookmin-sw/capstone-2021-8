export const parseQueryString = () => {
  const queryString = window.location.search.trim();

  const queryObject = {};
  // Return empty obejct, when do not have querystring
  if (queryString === '') return queryObject;

  queryString
    .split('?')[1]
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=');
      queryObject[key] = decodeURI(value);
    });

  return queryObject;
};
