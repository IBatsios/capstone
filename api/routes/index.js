var express = require('express');
var router = express.Router();
var passport = require('passport');
// const localStrategy = require('passport-local');

var User = require('../models/user.model');
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Featurama' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  User.register(new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    bio: req.body.bio,
    phone: req.body.phone,
    isActive: true
  }), req.body.password, function(error, user) {
    if (error) {
      console.log(error.message);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/users');
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/users', 
    failureRedirect: '/login'
  }), function(req, res, next) {
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('You must be logged in to do that!');
  res.redirect('/login');
}

module.exports = router;
