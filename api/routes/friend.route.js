const router = require('express').Router()
const FriendServices = require('../services/FriendServices');
const Middleware = require('../utility/Middleware');

// CREATE: add a new friend request.
router.post('/:id', Middleware.isLoggedIn, async (req, res) => {
  const UserB = req.body
  const UserA = req.session.user
  const result = await FriendServices.addFriend(UserA, UserB)

  if (!result) {
    return res
      .status(404)
      .send({ error: `Error attempting to add new friend request.` })
  }

  res.status(200).redirect(`${result._id}`)
})

// Accept or friend request.
router.put('/:id', Middleware.isLoggedIn, async (req, res) => {
    const UserA = req.body
    const UserB = req.session.user
    const result = await FriendServices.acceptFriend(UserA, UserB)
  
    if (!result) {
      return res
        .status(404)
        .send({ error: `Error attempting to accept request.` })
    }
  
    res.status(200).redirect(`${result._id}`)
  })

  // reject friend request.
  router.delete('/:id', Middleware.isLoggedIn, async (req, res) => {
    const UserA = req.body
    const UserB = req.session.user
    const result = await FriendServices.rejectFriend(UserA, UserB)
  
    if (!result) {
      return res
        .status(404)
        .send({ error: `Error attempting to reject request.` })
    }
  
    res.status(200).redirect(`${result._id}`)
  })

module.exports = router