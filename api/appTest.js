var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./User');

var port = 8080;
var db = 'mongodb://localhost/example'

mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('Welcome!!!');
});

app.get('/users', function(req, res) {
  console.log('getting all users');
  User.find({})
    .exec(function(err, users) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(users);
        res.json(users);
      }
    });
});

app.get('/users/:id', function(req, res) {
  console.log('getting a user');
  User.findOne({
    _id: req.params.id
    })
    .exec(function(err, users) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(users);
        res.json(users);
      }
    });
});

app.post('/user', function(req, res) {
  var newUser = new User();

  newUser.email= req.body.email;
  newUser.password= req.body.password;
  newUser.firstName= req.body.firstName;
  newUser.lastName= req.body.lastName;
  newUser.userName= req.body.userName;
  newUser.bio= req.body.bio;
  newUser.phone= req.body.phone;
  newUser.isActive= req.body.isActive;

  newUser.save(function(err, user) {
    if(err) {
      res.send('error saving user');
    } else {
      console.log(user);
      res.send(user);
    }
  });
});

app.post('/user2', function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) {
      res.send('error saving user');
    } else {
      console.log(user);
      res.send(user);
    }
  });
});

app.put('/user/:id', function(req, res) {
  User.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newUser) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newUser);
      res.send(newUser);
    }
  });
});

app.delete('/User/:id', function(req, res) {
  User.findOneAndRemove({
    _id: req.params.id
  }, function(err, user) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(user);
      res.status(204);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});