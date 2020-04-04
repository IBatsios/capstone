/**
 * This is the routes file for all actions related to posts.
 * 
 * @author Christopher Thacker
 * @author Jamie Weathers
 * @since 1.0.0
 */

const router = require('express').Router()
const PostServices = require('../services/PostServices')

// INDEX: show all posts.
router.get('/', (req, res) => {
    const filter = req.body;

    const allPosts = await PostServices.getMany(filter);

    if (!allPosts) {
        return res.redirect('/posts/new');
    }

  res.render('posts', {posts : allPosts});
})

// CREATE: add a new post.
router.post('/', (req, res) => {
  const postDTO = req.body;
  const result = await PostServices.addNew(postDTO);

  var response;
  if (!result) {
    response = 'Post was unsuccessful.';
  } else {
      response = 'Post successful.';
  }

  res.send(response);
})

// NEW: renders the form to add a new post.
router.get('/new', (req, res) => {
    res.render('posts/');
})

// SHOW: displays more information about an existing post.
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    const postResult = PostServices.getById(postId);

    if (!postResult) {
        console.log('Error attempting to get post.');
        return res.redirect('/posts');
    }

    return res.send('posts/show', {post: postResult});
})

// EDIT: renders the form to edit an existing post.
router.get('/:id/edit', (req, res) => {
    const postId = req.params.id;
    const postResult = await PostServices.getById(postId);

    if (!postResult) {
        console.log('Error when attempting to render edit post form.');
        return res.render('/posts');
    }

    return res.render('posts/edit',{post: postResult})
})

// PUT: updates a post in the database.
router.put('/:id', (req, res) => {

    const newPostData = req.body;
    const postId = req.params.id;
    const updatedPost = await PostServices.update(postId, newPostData);

    if (!updatedPost) {
        console.log('Error when updating post.');
        return res.redirect('/posts');
    }

   return res.redirect(`posts/${postId}`);
})

// DELETE: turns off a certain post within the database (NOT permanent deletion).
router.delete('/:id', (req, res) => {
    // Set is active to false.

    const postId = req.params.id;
    const hiddenPost = await PostServices.hide(postId);

    if (!hiddenPost) {
        console.log('Error when deleting post.');
        return res.redirect('/posts');
    }
    return res.send('Post hidden.');
})

module.exports = router;