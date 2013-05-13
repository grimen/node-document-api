var DEFAULT_ID_SEPERATOR = ',';

module.exports = function(ids, id_seperator) {
  id_seperator = id_seperator || DEFAULT_ID_SEPERATOR;

  if (!ids) {
    ids = '';
  }

  if (ids.join) {
    ids = ids.join(id_seperator);
  }

  ids = ids.replace(/\s*/gmi, '');

  ids = ids.split('.')[0];

  ids = ids.split(id_seperator);

  ids = ids.filter(function(v) { return !!v; });

  return ids;
};
