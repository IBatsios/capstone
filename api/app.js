// Import Dependencies
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const DatabaseConnector = require('./database/DatabaseConnector')

// Import Login Requirements
const passport = require('passport')

// Import Routers
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users.route')
const postsRouter = require('./routes/posts.route')
const itemsRouter = require('./routes/items.route')
const listsRouter = require('./routes/lists.route')
const commentsRouter = require('./routes/comments.route')
const devUsersRouter = require('./routes/dev.users.route');
const devCommentsRouter = require('./routes/dev.comments.route')
const devPostsRouter = require('./routes/dev.posts.route')

// Environment Variables Access
require('dotenv').config()

// Create Server Application
const app = express()

// Use Dependencies
app.use(methodOverride('_method')) // IMPORTANT: Keep as first
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Backend View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Use Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/items', itemsRouter)
app.use('/lists', listsRouter)
app.use('/comments', commentsRouter)

// Dev routes
app.use('/dev/users/', devUsersRouter)
app.use('/dev/comments/', devCommentsRouter)
app.use('/dev/posts/', devPostsRouter)

// Connect to Database
let connection = new DatabaseConnector()
connection.connect()

app.use(passport.initialize());
require('./config/passport')(passport);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
