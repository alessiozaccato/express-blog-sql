const express = require('express');
const router = express.Router();

const { index, show, store, update, patch, destroy } = require('../controllers/postController');

// index
router.get('/', index)
// show
router.get('/:id', show)
// store
router.post('/', store)

// update
router.put('/:id', update)
// modify
router.patch('/:id', patch)

// destroy
router.delete('/:id', destroy)

module.exports = router;