/**
 * This is the routes file for all actions related to posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
let Post = require('../models/Post');

// INDEX: show all posts.
router.get('/', (req, res) => {
    res.send("This will eventually show ALL posts by users!");
});

// CREATE: add a new post.
router.post('/', (req, res) => {
    res.send("This will eventually add a new post to the database!");
});

// NEW: renders the form to add a new post.
router.get('/new', (req, res) => {
    res.send("This will eventually render the form for creating a new post!");
});

// SHOW: displays more information about an existing post.
router.get('/:id', (req, res) => {
    res.send("This will eventually show more detailed information about a single post!");
});

// EDIT: renders the form to edit an existing post.
router.get('/:id/edit', (req, res) => {
    res.send("This will eventually render the form to edit a post!");
});

// PUT: updates a post in the database.
router.put('/:id', (req, res) => {
    res.send("This will eventually update a post inside the database!");
});

// DELETE: turns off a certain post within the database (NOT permanent deletion).
router.delete('/:id', (req, res) => {
    res.send("This will eventually turn off a single post so it isn't displayed in the application! \nNOTE: DO NOT USE A PERMANENT DELETE METHOD.");
});

module.exports = router;