var express = require('express');
var router = express.Router();
var passport = require('passport');
const localStrategy = require('passport-local');

var User = require('../models/user.model');

/* GET home page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
