const router = require('express').Router()
module.exports = router;

// data access
const dbx = require('../../../data/dbContext');
// shorthands
const resources = dbx.resources;
const log = console.log;

router.get('/', (req, res) => {
  resources.all()
    .then(result => {
      log('get all:', result)
      res.status(200).json({data: result})
    })
    .catch(error => {
      log('res router get /:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

router.get('/:id', (req, res) => {
  resources.getOne(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json({data: result})
      } else {
        res.status(404).json({data: null, message: "Item not found"})
      }
    })
    .catch(error => {
      log('res router get /id:', error)
      res.status(500).json({message: "Unable to retrieve data"})
    })
})

router.post('/', (req, res) => {
  resources.create(req.body)
    .then(result => {
      if (result) {
        res.status(201).json({data: result});
      } else {
        res.status(404).json({data: result, message: "Error retrieving new item"})
      }
    })
    .catch(error => {
      log('res router post:', error)
      res.status(500).json({message: "Unable to create item"})
    })
})