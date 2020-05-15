const db = require('../dbConnection');
module.exports = {
  all,
  create,
  getOne
}

const tableName = 'resources';

function all(id) {
  return id ?
  db(tableName).where('id', id) : 
  db(tableName);
}

function getOne(id) {
  if (id) {
    return all(id).first();
  }
  else {
    throw 'must pass an id argument';
  }
}

function create(data) {
  return db(tableName)
    .insert(data, 'id')
    .then(result => {
      console.log('proj insert res:', result)
      if (result)
        return getOne(result[0]);
      else {
        throw 'database failed to return new ID';
      }
    })
}