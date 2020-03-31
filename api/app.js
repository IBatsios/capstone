// Import Dependencies
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const DatabaseConnector = require('./database/DatabaseConnector');

// Import Login Requirements
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.model');

// Import Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.route');
const postsRouter = require('./routes/posts.route');
const itemsRouter = require('./routes/items.route');
const listsRouter = require('./routes/lists.route');

// Environment Variables Access
require('dotenv').config();

// Create Server Application
const app = express();

// Use Dependencies
app.use(methodOverride('_method')); // IMPORTANT: Keep as first
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Backend View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Makes the currently logged in user accessible.
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Use Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/items', itemsRouter);
app.use('/lists', listsRouter);

// Connect to Database
let connection = new DatabaseConnector();
connection.connect();

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
