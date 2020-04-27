const router = require('express').Router()
const FriendServices = require('../services/FriendServices');
const Middleware = require('../utility/Middleware');


router.put('/:id',Middleware.isLoggedIn, async (req, res) => {
  // maybe req.session.user
  const receivingUser = req.body
  const sendingUser = req.params.id
  const result = await FriendServices.friendRequest(sendingUser, receivingUser)

  if (!result) {
    return res
      .status(404)
      .send({ error: `Error attempting to add new friend request.` })
  }

  res.status(200).redirect(`${result._id}`)
})

// Accept or friend request.
router.put('/accept/:id',Middleware.isLoggedIn, async (req, res) => {
    const receivingUser = req.params.id
    // maybe req.session.user
    const sendingUser = req.body
    const result = await FriendServices.acceptFriend(sendingUser, receivingUser)
  
    if (!result) {
      return res
        .status(404)
        .send({ error: `Error attempting to accept request.` })
    }
  
    res.status(200).redirect(`${result._id}`)
  })

  // reject friend request.
  router.put('/reject/:id', Middleware.isLoggedIn,async (req, res) => {
    const receivingUser = req.params.id
    // maybe req.session.user
    const sendingUser = req.body
    const result = await FriendServices.rejectFriend(sendingUser, receivingUser)
  
    if (!result) {
      return res
        .status(404)
        .send({ error: `Error attempting to reject request.` })
    }
  
    res.status(200).redirect(`${result._id}`)
  })

module.exports = router