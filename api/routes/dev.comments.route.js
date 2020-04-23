/**
 * This is the routes file for all actions related to comments.
 *
 * @author Jamie Weathers ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router()
const CommentServices = require('../services/CommentServices')
const UserServices = require('../services/UserServices')

// INDEX: show all comments.
router.get('/', async (req, res) => {
  const filter = req.body
  const allComments = await CommentServices.getMany(filter)

  if (!allComments) {
    return res.redirect('/dev/comments/new')
  }

  res.render('comments', { comments: allComments })
})

// CREATE: add a new comment.
router.post('/', async (req, res) => {
  const commentDTO = req.body
  const userObj = await UserServices.getUser(commentDTO.authorId)
  console.log(userObj)
  const result = await CommentServices.addNew(userObj, commentDTO)

  var response
  if (!result) {
    response = 'Post was unsuccessful'
    res.send(response)
  } else {
    res.redirect('/dev/comments')
  }
})

// NEW: renders the form to add a new comment.
router.get('/new', async (req, res) => {
  res.render('comments/newComment')
})

// SHOW: displays more information about an existing comment.
router.get('/:id', async (req, res) => {
  const commentId = req.params.id
  const commentResult = await CommentServices.getById(commentId)

  if (!commentResult) {
    console.log('Error attempting to get comment.')
    return res.redirect('/comments')
  }

  return res.render('comments/showComment', { comment: commentResult })
})

// EDIT: renders the form to edit an existing comment.
router.get('/:id/edit', async (req, res) => {
  const commentId = req.params.id
  const commentResult = await CommentServices.getById(commentId)

  if (!commentResult) {
    console.log('Error when attempting to render edit comment form.')
    return res.render('/comments')
  }

  return res.render('comments/editComment', { comment: commentResult })
})

// PUT: updates a post in the database.
router.put('/:id', async (req, res) => {
  const newCommentData = req.body
  const commentId = req.params.id
  const updatedComment = await CommentServices.update(commentId, newCommentData)

  if (!updatedComment) {
    console.log('Error when updating comment.')
    return res.redirect('/comments')
  }

  return res.redirect(`/comments/${commentId}`)
})

// DELETE: turns off a certain comment within the database (NOT permanent deletion).
router.delete(':id', async (req, res) => {
  const commentId = req.params.id
  const hiddenComment = await CommentServices.hide(commentId)

  if (!hiddenComment) {
    console.log('Error when deleting comment.')
    return res.redirect('/comments')
  }
  return res.send('Comment hidden.')
})

module.exports = router
