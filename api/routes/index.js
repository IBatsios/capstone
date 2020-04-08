const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    // Form validation
    const { errors, isValid } = Validation.validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const foundUser = await UserServices.getManyUsers({ email: req.body.email });

    if (foundUser) {
        return res.status(400).json({ email: 'Email already exists' });
    } else {
        try {

            // Encrypt password before sending to database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    if (err) throw err;
                    req.body.password = hash;
                    
                    // Add user to the database.
                    const newUser = await UserServices.addUser(req.body);

                    if (newUser) {
                        // return res.status(200).json(user);   // Uncomment when front-end is connected.
                        return res.redirect('/');               // Remove when front-end is connected.
                    } else {
                        // return res.status(500); 
                        console.log('Error adding user to DB');
                        return res.render('register');
                    }
                });
            });
        } catch (error) {
            // errors.exception = error.message;
            console.log(error);
            res.render('register');
        }
    }

    // const newUser = req.body;

    // try {
    //     const result = await UserServices.addUser(newUser);
    //     if (result) {
    //         return res.redirect('/');
    //     }
    //     console.log('Add user failed');
    //     return res.render('register');
    // } catch (error) {
    //     console.log(error);
    //     return res.render('register');
    // }
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
