const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

const UserServices = require('../services/UserServices');
const User = require('../models/user.model');
const Middleware = require('../utility/Middleware');
const Validation = require('../utility/Validation');

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
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        avatar: req.body.avatar,
        bio: req.body.bio,
        phone: req.body.phone,
        isActive: true
    });
    User.register(newUser, req.body.password, function (err, user) { // TODO: abstract this out.
        if (err) {
            console.log(err);
            return false;
        }
        passport.authenticate('local')(req, res, function () {
            // res.redirect('/');
            res.status(200).json(req.user);
        });
    });
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
        // successRedirect: '/',
        // failureRedirect: '/login'
    }), function (req, res) {
        return res.status(200).json(req.user);
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
