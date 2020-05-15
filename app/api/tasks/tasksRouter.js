const router = require('express').Router()
module.exports = router;

// data access
const dbx = require('../../../data/dbContext');
// shorthands
const tasks = dbx.tasks;
const log = console.log;

router.get('/', (req, res) => {
  tasks.all()
    .then(result => {
      log('get all:', result)
      res.status(200).json({data: result})
    })
    .catch(error => {
      log('task router get /:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

router.get('/:id', (req, res) => {
  tasks.getOne(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({data: result})
      } else {
        res.status(404).json({data: null, message: "Item not found"})
      }
    })
    .catch(error => {
      log('task router get /id:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

// create a task for given project ID 
router.post('/:id', (req, res) => {
  const projID = req.params.id;
  tasks.create({...req.body, project_id: projID})
    .then(result => {
      if (result) {
        res.status(201).json({data: result});
      } else {
        res.status(404).json({data: result, message: "Error retrieving new item"})
      }
    })
    .catch(error => {
      log('task router post:', error)
      res.status(500).json({message: "Unable to create item"})
    })
})

router.delete('/:id', (req, res) => {
  tasks.remove(req.params.id)
    .then(result => {
      res.status(200).json({ message: 'Successfully deleted item'})
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to delete item'})
    })
})