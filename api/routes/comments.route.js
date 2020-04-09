/**
 * This is the routes file for all actions related to comments.
 *
 * @author Jamie Weathers
 * @since 1.0.0
 */

const router = require('express').Router()
let Post = require('../models/comment.model')

// INDEX: show all comments.
router.get('/', (req, res) => {
  res.send('This will eventually show ALL comments by users!')
})

// CREATE: add a new comment.
router.post('/', (req, res) => {
  res.send('This will eventually add a new comment to the database!')
})

// NEW: renders the form to add a new comment.
router.get('/new', (req, res) => {
  res.send('This will eventually render the form for creating a new comment!')
})

// SHOW: displays more information about an existing comment.
router.get('/:id', (req, res) => {
  res.send(
    'This will eventually show more detailed information about a single comment!'
  )
})

// EDIT: renders the form to edit an existing comment.
router.get('/:id/edit', (req, res) => {
  res.send('This will eventually render the form to edit a comment!')
})

// PUT: updates a post in the database.
router.put('/:id', (req, res) => {
  res.send('This will eventually update a comment inside the database!')
})

// DELETE: turns off a certain post within the database (NOT permanent deletion).
router.delete('/:id', (req, res) => {
  res.send(
    "This will eventually turn off a single comment so it isn't displayed in the application! \nNOTE: DO NOT USE A PERMANENT DELETE METHOD."
  )
})

module.exports = router
