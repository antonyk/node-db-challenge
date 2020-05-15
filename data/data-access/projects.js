const db = require('../dbConnection');
module.exports = {
  all,
  create,
  getOne,
  remove
}

function all(id) {
  return id ?
    db('projects').where('id', id) : 
    db('projects');
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
  return db('projects')
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

function remove(id) {
  return db('projects')
    .where("id", id)
    .del()
}