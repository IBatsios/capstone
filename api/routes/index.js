const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserServices = require('../services/UserServices');
const User = require('../models/user.model');
const Middleware = require('../utility/Middleware');

/**
 * Home Page for back-end developer testing.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Featurama' });
});

/**
 * Displays the registration form to the user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/register', function (req, res, next) {
    res.render('register');
});

/**
 * Sends data in POST request to register the new user through PassportJS.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/register', async function (req, res, next) {
    const newUser = req.body;

    try {
        const result = await UserServices.addUser(newUser);
        if (result) {
            return res.redirect('/');
        }
        console.log('Add user failed');
        return res.render('register');
    } catch (error) {
        console.log(error);
        return res.render('register');
    }
});

/**
 * Displays the login form to the user.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/login', function (req, res, next) {
    res.render('login');
});

/**
 * Authenticates the user using PassportJS.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function (req, res, next) {
});

/**
 * Logs the user out using PassportJS.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/logout', Middleware.isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
