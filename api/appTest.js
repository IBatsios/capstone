var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var List = require('./models/list.model');
var Post = require('./models/post.model');
var Comment = require('./models/comment.model');
var List = require('./models/list.model');
var Item = require('./models/item.model');

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

//get, post, edit and delete for posts
app.get('/posts', function(req, res) {
  console.log('getting all posts');
  Post.find({})
    .exec(function(err, posts) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(posts);
        res.json(posts);
      }
    });
});

app.get('/posts/:id', function(req, res) {
  console.log('getting a post');
  Post.findOne({
    _id: req.params.id
    })
    .exec(function(err, posts) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(posts);
        res.json(posts);
      }
    });
});

app.post('/post', function(req, res) {
  var newPost = new Post();

  newPost.title= req.body.title;
  newPost.content= req.body.connect;
  newPost.topic= req.body.topic;
  newPost.comments = req.body.comments;
  newPost.author = req.body.author;
  newPost.isActive= req.body.isActive;

  newPost.save(function(err, post) {
    if(err) {
      res.send('error saving post');
    } else {
      console.log(post);
      res.send(post);
    }
  });
});

app.post('/post2', function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) {
      res.send('error saving post');
    } else {
      console.log(post);
      res.send(post);
    }
  });
});

app.put('/post/:id', function(req, res) {
  Post.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newPost) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newPost);
      res.send(newPost);
    }
  });
});

app.delete('/post/:id', function(req, res) {
  Post.findOneAndRemove({
    _id: req.params.id
  }, function(err, post) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(post);
      res.status(204);
    }
  });
});

//get, post, edit and delete for comments
app.get('/comments', function(req, res) {
  console.log('getting all comments');
  Comment.find({})
    .exec(function(err, comments) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(comments);
        res.json(comments);
      }
    });
});

app.get('/comments/:id', function(req, res) {
  console.log('getting a comment');
  Comment.findOne({
    _id: req.params.id
    })
    .exec(function(err, comments) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(comments);
        res.json(comments);
      }
    });
});

app.post('/comment', function(req, res) {
  var newComment = new Comment();

  newComment.content= req.body.content;
  newComment.author= req.body.author;
  newComment.isActive= req.body.isActive;

  newComment.save(function(err, comment) {
    if(err) {
      res.send('error saving comment');
    } else {
      console.log(comment);
      res.send(comment);
    }
  });
});

app.post('/comment2', function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err) {
      res.send('error saving comment');
    } else {
      console.log(comment);
      res.send(comment);
    }
  });
});

app.put('/comment/:id', function(req, res) {
  Comment.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newComment) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newComment);
      res.send(newComment);
    }
  });
});

app.delete('/comment/:id', function(req, res) {
  Comment.findOneAndRemove({
    _id: req.params.id
  }, function(err, comment) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(comment);
      res.status(204);
    }
  });
});

//get, post, edit and delete for users
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

app.delete('/user/:id', function(req, res) {
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

//get, post, edit and delete for comments
app.get('/comments', function(req, res) {
  console.log('getting all comments');
  Comment.find({})
    .exec(function(err, comments) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(comments);
        res.json(comments);
      }
    });
});

app.get('/comments/:id', function(req, res) {
  console.log('getting a comment');
  Comment.findOne({
    _id: req.params.id
    })
    .exec(function(err, comments) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(comments);
        res.json(comments);
      }
    });
});

app.post('/comment', function(req, res) {
  var newComment = new Comment();

  newComment.content= req.body.content;
  newComment.author= req.body.author;
  newComment.isActive= req.body.isActive;

  newComment.save(function(err, comment) {
    if(err) {
      res.send('error saving comment');
    } else {
      console.log(comment);
      res.send(comment);
    }
  });
});

app.post('/comment2', function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err) {
      res.send('error saving comment');
    } else {
      console.log(comment);
      res.send(comment);
    }
  });
});

app.put('/comment/:id', function(req, res) {
  Comment.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newComment) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newComment);
      res.send(newComment);
    }
  });
});

app.delete('/comment/:id', function(req, res) {
  Comment.findOneAndRemove({
    _id: req.params.id
  }, function(err, comment) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(comment);
      res.status(204);
    }
  });
});

//get, post, edit and delete for list
app.get('/lists', function(req, res) {
  console.log('getting all lists');
  List.find({})
    .exec(function(err, lists) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(lists);
        res.json(lists);
      }
    });
});

app.get('/lists/:id', function(req, res) {
  console.log('getting a list');
  List.findOne({
    _id: req.params.id
    })
    .exec(function(err, lists) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(lists);
        res.json(lists);
      }
    });
});

app.post('/list', function(req, res) {
  var newList = new List();

  newList.topic= req.body.topic;
  newList.item= req.body.item;
  newList.author= req.body.author;
  newList.isActive= req.body.isActive;

  newList.save(function(err, list) {
    if(err) {
      res.send('error saving list');
    } else {
      console.log(list);
      res.send(list);
    }
  });
});

app.post('/list2', function(req, res) {
  List.create(req.body, function(err, list) {
    if(err) {
      res.send('error saving list');
    } else {
      console.log(list);
      res.send(list);
    }
  });
});

app.put('/list/:id', function(req, res) {
  List.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newList) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newList);
      res.send(newList);
    }
  });
});

app.delete('/list/:id', function(req, res) {
  List.findOneAndRemove({
    _id: req.params.id
  }, function(err, list) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(list);
      res.status(204);
    }
  });
});

//get, post, edit and delete for item
app.get('/items', function(req, res) {
  console.log('getting all items');
  Item.find({})
    .exec(function(err, items) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(items);
        res.json(items);
      }
    });
});

app.get('/items/:id', function(req, res) {
  console.log('getting a item');
  Item.findOne({
    _id: req.params.id
    })
    .exec(function(err, items) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(items);
        res.json(items);
      }
    });
});

app.post('/item', function(req, res) {
  var newItem = new Item();
  newItem.itemName= req.body.itemName;
  newItem.topic= req.body.topic;
  newItem.description= req.body.description;
  newItem.author= req.body.author;
  newItem.isActive= req.body.isActive;

  newItem.save(function(err, item) {
    if(err) {
      res.send('error saving item');
    } else {
      console.log(item);
      res.send(item);
    }
  });
});

app.post('/item2', function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) {
      res.send('error saving item');
    } else {
      console.log(item);
      res.send(item);
    }
  });
});

app.put('/item/:id', function(req, res) {
  Item.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, function(err, newItem) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newItem);
      res.send(newItem);
    }
  });
});

app.delete('/item/:id', function(req, res) {
  Item.findOneAndRemove({
    _id: req.params.id
  }, function(err, item) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(item);
      res.status(204);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});