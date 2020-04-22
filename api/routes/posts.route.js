/**
 * This is the routes file for all actions related to posts.
 * TODO: Create form views.
 * @author Christopher Thacker
 * @author Jamie Weathers
 * @author Michael McCulloch
 * @since 1.0.0
 */

const router = require('express').Router()
const PostServices = require('../services/PostServices')

// INDEX: show all posts.
router.get('/', async (req, res) => {
  const filter = req.body

  const allPosts = await PostServices.getMany(filter)

  if (!allPosts) {
    return res.status(404).send({ error: 'No posts were found' })
  }

  res.status(200).send(allPosts)
})

// CREATE: add a new post.
router.put('/', async (req, res) => {
  const postDTO = req.body
  const user = req.session.user;
  const result = await PostServices.addNew(user, postDTO)

  if (!result) {
    return res.status(404).send({ error: `Create Post unsuccessful` })
  }

  // Provides the url of the new post in the request response.
  res.status(200).redirect(`${result._id}`)
})

// SHOW: displays more information about an existing post.
router.get('/:id', async (req, res) => {
  const postId = req.params.id
  const postResult = await PostServices.getById(postId)

  if (!postResult) {
    return res
      .status(404)
      .send({ error: `Error attempting to get post by ID ${[postId]}.` })
  }

  return res.status(200).send(postResult)
})

// PUT: updates a post in the database.
router.put('/:id', async (req, res) => {
  const newPostData = req.body
  const postId = req.params.id
  const updatedPost = await PostServices.update(postId, newPostData)

  if (!updatedPost) {
    return res
      .status(404)
      .send({ error: `Error attempting to update post by ID ${[postId]}.` })
  }

  return res.status(200).send({ updatedPost })
})

// DELETE: turns off a certain post within the database (NOT permanent deletion).
router.delete('/:id', async (req, res) => {
  // Set is active to false.

  const postId = req.params.id
  const hiddenPost = await PostServices.hide(postId)

  if (!hiddenPost) {
    return res
      .status(404)
      .send({ error: `Error attempting to delete post by ID ${[postId]}.` })
  }
  return res.status(200).send()
})

module.exports = router
