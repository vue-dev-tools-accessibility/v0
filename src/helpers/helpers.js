export const escapeHtml = function (value) {
  return value
    .replaceAll('\xa0', '&nbsp;')
    .replaceAll('"', '&quot;')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
};

export const upperFirst = function (value) {
  return value[0].toUpperCase() + value.slice(1);
};
