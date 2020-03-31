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
    // const filter = req.body; // Optional TODO: Outsource to a UserServices function to build filter.
    const filter = {};

    var allUsers = await UserServices.getManyUsers(filter);

    if (!allUsers) {
        // return res.send('No users found.');
        return res.redirect('/users/new');
    }

    return res.render('users', {users: allUsers});
});

/**
 * @DEPRECATED Replaced by '/register' POST route, which handles adding new users through PassportJS.
 * CREATE: add a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/', async (req, res) => {
    // req.body.isActive = true;
    // const userDTO = req.body; // Optional TODO: Outsource to a UserServices function to build DTO.

    // var newUser = await UserServices.addUser(userDTO);

    // if (!newUser) {
    //     return res.redirect('/users/new');
    // }

    // return res.render('users/show', {user: newUser});
    console.log('THIS POST ROUTE (users.route.js/index) IS DEPRECATED. PLEASE USE THE /register ROUTE.');
    return res.redirect('/register');
});

/**
 * @DEPRECATED Replaced by '/register' GET route, which handles adding new users through PassportJS.
 * NEW: renders the form to register a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/new', (req, res) => {
    console.log('THIS GET ROUTE (users.route.js/index) IS DEPRECATED. PLEASE USE THE /register ROUTE.');
    return res.redirect('/register');
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
    return res.render('users/show', {user: foundUser});
});

/**
 * EDIT: renders the form to edit an existing user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', async (req, res) => {
    const foundUser = await UserServices.getUser(req.params.id);
    return res.render('users/edit', {user: foundUser});
});

/**
 * PUT: updates a user in the database.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    const newData = req.body;
    const userId = req.params.id;
    const updatedUser = await UserServices.updateUser(userId, newData);
    if (!updatedUser) {
        console.log('Error when updating user.');
        return res.redirect('/users');
    }
    return res.redirect(`/users/${userId}`);
});

/**
 * DELETE: deactivates an existing user in the database (NOT permanent deletion).
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    const response = await UserServices.deleteUser(userId); // TODO: Currently deletes the user in the DB, but eventually will need to update isActive flag.
    console.log(response);
    if (!response) {
        console.log('Error when deleting user.'); // TODO: Send error message to view.
    }
    return res.redirect('/users'); //TODO: Send success message to view.
});

module.exports = router;