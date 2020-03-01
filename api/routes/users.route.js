/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();

const User = require('../models/user.model');

const DatabaseConnector = require('../connectors/database.connector');
const connector = new DatabaseConnector();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// INDEX: show all users.
router.get('/', function(req, res) {
    userController.getAllUsers(req, res);
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