const api = require('express').Router();
module.exports = api;

// ROUTER METHODS

// basic hello world response to root path showing server is running
api.get('/', (req, res) => {
  res.send('API is running');
})

// sub-routes
const projectsRouter = require('./projects/projectsRouter')
api.use('/projects', projectsRouter);

const resourcesRouter = require('./resources/resourcesRouter')
api.use('/resources', resourcesRouter);

const tasksRouter = require('./tasks/tasksRouter')
api.use('/tasks', tasksRouter);
