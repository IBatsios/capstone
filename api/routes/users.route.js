'use strict'

/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
const UserServices = require('../services/UserServices');

/**
 * INDEX: show all users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    const filter = req.body; // Optional TODO: Outsource to a UserServices function to build filter.

    var allUsers = await UserServices.getManyUsers(filter);

    if (!allUsers) {
        return res.send('No users found.');
    }

    return res.json(allUsers);
});

/**
 * CREATE: add a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/', async (req, res) => {
    const userDTO = req.body; // Optional TODO: Outsource to a UserServices function to build DTO.

    var userId = await UserServices.addUser(userDTO);
    return res.json(userId);
});

/**
 * NEW: renders the form to register a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/new', (req, res) => {
    return res.render('users/new');
});

/**
 * SHOW: displays user page for an existing user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    var foundUser = await UserServices.getUser(userId);
    if (!foundUser) {
        console.log('Error when retrieving user.');
        return res.redirect('/users');
    }
    // console.log(foundUser);
    return res.render('users/show', {user: foundUser});
});

/**
 * EDIT: renders the form to edit an existing user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', (req, res) => {
    return res.render('users/edit', {user: req.user});
});

// PUT: updates a user in the database.
router.put('/:id', (req, res) => {
    const userId = req.params.id;
});

// DELETE: deactivates an existing user in the database (NOT permanent deletion).
router.delete('/:id', (req, res) => {
    res.send("This will eventually turn off a single user so it isn't displayed in the application! \nNOTE: DO NOT USE A PERMANENT DELETE METHOD.");
});

module.exports = router;