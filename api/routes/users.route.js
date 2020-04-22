'use strict'

/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

// Imports
const router = require('express').Router();
const UserServices = require('../services/UserServices');

// Message content
const NO_USERS_FOUND = 'No users found in database';
const USER_NOT_FOUND = 'User not found';
const DEPRECATED_MSG = 'This route is deprecated. Please use the following instead: ';

/**
 * INDEX: Returns all users by default; to get a subset of all the users, pass a filter in using mongoosejs format in req.body.filter.
 * 
 * @returns {object} JSON object of all users in the database. If no users are found, then an error message will sent as a JSON object instead.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    const filter = req.body.filter; // Optional TODO: Outsource to a UserServices function to build filter.
    var allUsers = null;
    var errors = {};

    try {
        allUsers = await UserServices.getManyUsers(filter);
    } catch (err) {
        errors.exception = err.message;
    } finally {
        if (allUsers) {
            return res.status(200).json({ errors, users: allUsers });
        }
        errors.database = NO_USERS_FOUND;
        return res.status(404).json({ errors, users: allUsers });
    }
});

/**
 * @DEPRECATED Replaced by '/register' POST route, which handles adding new users through PassportJS.
 * CREATE: add a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/', (req, res) => {
    var errors = {};

    console.log('THIS POST ROUTE (users.route.js/index) IS DEPRECATED. PLEASE USE THE /register ROUTE.');
    errors.deprecated = DEPRECATED_MSG + '/register';
    return res.status(410).json(errors); // Error status 410 is for "Gone"
});

/**
 * @DEPRECATED Replaced by '/register' GET route, which handles adding new users through PassportJS.
 * NEW: renders the form to register a new user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/new', (req, res) => {
    var errors = {};

    console.log('THIS GET ROUTE (users.route.js/index) IS DEPRECATED. PLEASE USE THE /register ROUTE.');
    errors.deprecated = DEPRECATED_MSG + '/register';
    return res.status(410).json(errors); // Error status 410 is for "Gone"
});

/**
 * SHOW: displays user page for an existing user. Uses the user's ID to find its object.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    var foundUser = null;
    var errors = {};

    try {
        // Pass the user id, username, and avatar with the session.
        foundUser = await UserServices.getUser(userId);
        req.session.user = {
          id: foundUser._id,
          username: foundUser.username,
          avatar: foundUser.avatar
        };
    } catch (err) {
        errors.exception = err.message;
    } finally {
        if (foundUser) {
            return res.status(200).json({ user: foundUser });
        }
        errors.database = USER_NOT_FOUND;
        console.log(`Could not find user with ID ${userId}`);
        return res.status(404).json({ errors, user: foundUser });
    }
});

/**
 * @DEPRECATED Please use the front-end forms to edit user profiles (port 3000).
 * EDIT: renders the form to edit an existing user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', (req, res) => {
    var errors = {};

    console.log('THIS GET ROUTE (users.route.js/id/edit) IS DEPRECATED. FORM REQUESTS ARE NOW HANDLED ON PORT 3000');
    errors.deprecated = DEPRECATED_MSG + 'profile editor on port 3000';
    return res.status(410).json(errors); // Error status 410 is for "Gone"
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
    var updatedUser = null;
    var errors = {};

    try {
        updatedUser = await UserServices.updateUser(userId, newData);
    } catch (err) {
        errors.exception = err.message;
    } finally {
        if (updatedUser) {
            return res.status(200).json({ errors, user: updatedUser });
        }
        errors.database = 'Error when updating user';
        return res.status(404).json({ errors, user: updatedUser });
    }
});

/**
 * DELETE: deactivates an existing user in the database (NOT permanent deletion).
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    var response = null;
    var errors = {};

    try {
        response = await UserServices.deleteUser(userId);
    } catch (err) {
        errors.exception = err.message;
    } finally {
        if (response) {
            return res.status(200).json({ errors, response })
        }
        errors.database = 'Error when deleting user';
        return res.status(404).json({ errors, response });
    }
});

module.exports = router;
