/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
let User = require('../models/user.model');

// INDEX: show all users.
router.get('/', (req, res) => {
    res.send("This will eventually show ALL users!");
});

// CREATE: add a new user.
router.post('/', (req, res) => {
    res.send("This will eventually add a new user to the database!");
});

// NEW: renders the form to register a new user.
router.get('/new', (req, res) => {
    res.send("This will eventually render the form for creating a new user!");
});

// SHOW: displays user page for an existing user.
router.get('/:id', (req, res) => {
    res.send("This will eventually show more detailed information about a single user!");
});

// EDIT: renders the form to edit an existing user.
router.get('/:id/edit', (req, res) => {
    res.send("This will eventually render the form to edit a user!");
});

// PUT: updates a user in the database.
router.put('/:id', (req, res) => {
    res.send("This will eventually update a user inside the database!");
});

// DELETE: deactivates an existing user in the database (NOT permanent deletion).
router.delete('/:id', (req, res) => {
    res.send("This will eventually turn off a single user so it isn't displayed in the application! \nNOTE: DO NOT USE A PERMANENT DELETE METHOD.");
});

module.exports = router;