/**
 * This is the routes file for all actions related to comments.
 *
 * @author Jamie Weathers
 * @since 1.0.0
 */

const router = require('express').Router()
const CommentServices = require('../services/CommentServices')

// INDEX: show all comments.
router.get('/', async (req, res) => {
  const filter = req.body
  const allComments = await CommentServices.getMany(filter)

  if (!allComments) {
    return res.status(404).send({ error: `Error attempting to comments` })
  }

  res.status(200).send(allComments)
})

// CREATE: add a new comment.
router.post('/', async (req, res) => {
  const commentDTO = req.body
  const result = await CommentServices.addNew(commentDTO)

  if (!result) {
    return res
      .status(404)
      .send({ error: `Error attempting to add new comment.` })
  }

  res.status(200).send(result)
})

// SHOW: displays more information about an existing comment.
router.get('/:id', async (req, res) => {
  const commentId = req.params.id
  const commentResult = await CommentServices.getById(commentId)

  if (!commentResult) {
    return res
      .status(404)
      .send({ error: `Error attempting to get comment by ID ${commentId}.` })
  }

  return res.status(200).send(commentResult)
})

// PUT: updates a post in the database.
router.put('/:id', async (req, res) => {
  const newCommentData = req.body
  const commentId = req.params.id
  const updatedComment = await CommentServices.update(commentId, newCommentData)

  if (!updatedComment) {
    return res
      .status(404)
      .send({ error: `Error attempting to update comment by ID ${commentId}.` })
  }

  return res.status(200).send(updatedComment)
})

// DELETE: turns off a certain comment within the database (NOT permanent deletion).
router.delete('/:id', async (req, res) => {
  const commentId = req.params.id
  const hiddenComment = await CommentServices.hide(commentId)

  if (!hiddenComment) {
    return res
      .status(404)
      .send({ error: `Error attempting to delete comment by ID ${commentId}.` })
  }
  return res.status(200).send()
})

module.exports = router
