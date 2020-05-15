// config access to DB (connection string)

// import data access methods

// ? import business objects (BOs) / data models


module.exports = {
  projects: require('./data-access/projects'),
  resources: require('./data-access/resources'),
  tasks: require('./data-access/tasks')
}