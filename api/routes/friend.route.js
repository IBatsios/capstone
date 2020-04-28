const router = require('express').Router()
const FriendServices = require('../services/FriendServices');
const Middleware = require('../utility/Middleware');


router.put('/:id', Middleware.isLoggedIn,async (req, res) => {
  const receivingUser = req.params.id
  const sendingUser = req.session.user.id
  const result = await FriendServices.friendRequest(sendingUser, receivingUser)

  if (result) {
    return res.status(200)
    .send(result)

  }
  return res
      .status(404)
      .send({ error: `Error attempting to add new friend request.` })
})

// Accept or friend request.
router.put('/accept/:id', Middleware.isLoggedIn, async (req, res) => {
    const accepted = req.params.id
    const acceptor = req.session.user.id

    const result = await FriendServices.acceptFriend(accepted, acceptor)

    if (result) {
      return res.status(200)
      .send(result)
  
    }
    return res
        .status(404)
        .send({ error: `Error attempting to accept new friend request.` })
  })

  // reject friend request.
router.put('/reject/:id', Middleware.isLoggedIn,async (req, res) => {
    const rejected = req.params.id
    const rejector = req.session.user.id
    const result = await FriendServices.rejectFriend(rejected, rejector)
  
    if (result) {
      return res.status(200)
      .send(result)
  
    }
    return res
        .status(404)
        .send({ error: `Error attempting to reject new friend request.` })
  })

  router.put('/cancel/:id', Middleware.isLoggedIn, async (req, res) => {
    const receivingUser = req.params.id
    const sendingUser = req.session.user.id
    const result = await FriendServices.cancelRequest(sendingUser, receivingUser)
  
    if (result) {
      return res.status(200)
      .send(result)
  
    }
    return res
        .status(404)
        .send({ error: `Error attempting to cancel friend request.` })
  })

  router.put('/remove/:id',Middleware.isLoggedIn ,async (req, res) => {
    const receivingUser = req.params.id
    const sendingUser = req.session.user.id
    const result = await FriendServices.removeFriend(sendingUser, receivingUser)
  
    if (result) {
      return res.status(200)
      .send(result)
  
    }
    return res
        .status(404)
        .send({ error: `Error attempting to remove friend request.` })
  })

module.exports = router
