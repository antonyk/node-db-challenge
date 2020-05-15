const router = require('express').Router()
module.exports = router;

// data access
const dbx = require('../../../data/dbContext');
// shorthands
const projects = dbx.projects;
const log = console.log;

router.get('/', (req, res) => {
  projects.all()
    .then(result => {
      res.status(200).json({data: result})
    })
    .catch(error => {
      log('proj router get /:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

router.get('/:id', (req, res) => {
  projects.getOne(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({data: result})
      } else {
        res.status(404).json({data: null, message: "Item not found"})
      }
    })
    .catch(error => {
      log('proj router get /id:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

router.post('/', (req, res) => {
  projects.create(req.body)
    .then(result => {
      if (result) {
        res.status(201).json({data: result});
      } else {
        res.status(404).json({data: result, message: "Error retrieving new item"})
      }
    })
    .catch(error => {
      log('proj router post:', error)
      res.status(500).json({message: "Unable to create item"})
    })
})