const db = require('../dbConnection');
module.exports = {
  all,
  create,
  getOne,
  getSetDeep,
  getSet,
  remove
}

const tableName = 'tasks';

function getSet() {
  return db(tableName)
    .columns({
      id: 'tasks.id',
      task: 'tasks.description',
      notes: 'tasks.notes',
      completed: 'tasks.completed',
      project_id: 'tasks.project_id'
    })
    .select()
}

function getSetDeep() {
  return db(tableName)
    .join('projects', 'tasks.project_id', 'projects.id')
    .column({
      id: 'tasks.id',
      task: 'tasks.description',
      notes: 'tasks.notes',
      completed: 'tasks.completed',
      project_id: 'tasks.project_id',
      project: 'projects.name',
      description: 'projects.description'
    })
    .select();

    // .select('tasks.id', 'tasks.description', 'tasks.notes', 'tasks.completed', 'projects.name', 'projects.description');
}

function getOne(id) {
  if (id) {
    return getSet()
      .where('tasks.id', id)
      .first()
  } else {
    throw 'must pass an id argument';
  }
}

function getOneDeep(id) {
  if (id) {
    return getSetDeep()
      .where('tasks.id', id)
      .first()
  } else {
    throw 'must pass an id argument';
  }
}

function all(id, deep = true, filter = {}) {
  if (id) {
    return deep ? getOneDeep(id) : getOne(id);
  } else {
    return deep ? getSetDeep(id) : getSet(id);
  }
}

function create(data) {
  return db(tableName)
    .insert(data, 'id')
    .then(result => {
      console.log('task insert res:', result)
      if (result)
        return getOneDeep(result[0]);
      else {
        throw 'database failed to return new ID';
      }
    })
}

function remove(id) {
  return db(tableName)
    .where("id", id)
    .del()
}