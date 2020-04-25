/**
 * This is the routes file for all actions related to posts.
 * @author Jamie Weathers ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router()
const PostServices = require('../services/PostServices')
const UserServices = require('../services/UserServices')

// INDEX: show all posts.
router.get('/', async (req, res) => {
  const filter = req.body

  function descendingDate(a, b) {
    if (a == b) {
      return 0
    } else if (a < b) {
      return 1
    } else {
      return -1
    }
  }

  const allPosts = (await PostServices.getMany(filter)).sort(descendingDate)

  if (!allPosts) {
    return res.redirect('/dev/posts/new')
  }

  res.render('posts', { posts: allPosts })
})

// CREATE: add a new post.
router.post('/', async (req, res) => {
  const postDTO = req.body
  const userObj = await UserServices.getUser(postDTO.authorId)
  console.log(userObj)
  const result = await PostServices.addNew(userObj, postDTO)

  if (!result) {
    response = 'Post was unsuccessful.'
    return res.send(response)
  }

  return res.redirect('posts/')
})

// NEW: renders the form to add a new post.
router.get('/new', async (req, res) => {
  res.render('posts/newPost')
})

// SHOW: displays more information about an existing post.
router.get('/:id', async (req, res) => {
  const postId = req.params.id
  const postResult = await PostServices.getById(postId)

  if (!postResult) {
    console.log('Error attempting to get post.')
    return res.redirect('/posts')
  }
  console.log(postId)

  return res.render('posts/showPost', { post: postResult })
})

// EDIT: renders the form to edit an existing post.
router.get('/:id/edit', async (req, res) => {
  const postId = req.params.id
  const postResult = await PostServices.getById(postId)

  if (!postResult) {
    console.log('Error when attempting to render edit post form.')
    return res.render('/posts')
  }

  return res.render('posts/editPost', { post: postResult })
})

// PUT: updates a post in the database.
router.put('/:id', async (req, res) => {
  const newPostData = req.body
  const postId = req.params.id
  const updatedPost = await PostServices.update(postId, newPostData)

  if (!updatedPost) {
    console.log('Error when updating post.')
    return res.redirect('/posts')
  }

  return res.redirect(`/posts/${postId}`)
})

// DELETE: turns off a certain post within the database (NOT permanent deletion).
router.delete('/:id', async (req, res) => {
  // Set is active to false.

  const postId = req.params.id
  const hiddenPost = await PostServices.hide(postId)

  if (!hiddenPost) {
    console.log('Error when deleting post.')
    return res.redirect('/posts')
  }
  return res.send('Post hidden.')
})

module.exports = router
