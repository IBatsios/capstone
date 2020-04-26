'use strict'

/**
 * This is the routes file for all actions related to items.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router()
const ItemServices = require('../services/ItemServices')
const UserServices = require('../services/UserServices')
const Middleware = require('../utility/Middleware')

/**
 * INDEX: show all items.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
  // const filter = req.body; // Optional TODO: Outsource to a ItemServices function to build filter.
  const filter = req.body
  const allItems = await ItemServices.getManyItems(filter)

  if (!allItems) {
    // return res.send('No items found.');
    return res.status(404).send({ error: `Error attempting to create items` })
  }

  res.status(200).send(allItems)
})

/**
 * CREATE: add a new Item.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @author Jamie Weathers ref Christopher Thacker and Hieu Vo
 * @since 1.0.0
 */
router.put('/', Middleware.isLoggedIn, async (req, res) => {
  try {
    const itemDTO = req.body
    const user = await UserServices.getUser(req.session.user.id)

    var newItem = await ItemServices.addItem(user, itemDTO)

    if (!newItem) {
      return res.status(400).send({ error: 'New Item Failed!' })
    }

    return res.status(200).send(`${newItem._id}`)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send(err)
  }
})

/**
 * SHOW: displays item page for an existing item.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @author Jamie Weathers ref Christopher Thacker and Hieu Vo
 * @since 1.0.0
 */
router.get('/:id', Middleware.isLoggedIn, async (req, res) => {
  try {
    const itemId = req.params.id
    var foundItem = await ItemServices.getItem(itemId)
    if (!foundItem) {
      console.log('Error when retrieving item.')
      return res.status(403).json({ error: 'Item could not be retrieved.' })
    }

    return res.status(200).send(foundItem)
  } catch (err) {
    console.log(error.message)
    return res.status(500).send(error)
  }
})

/**
 * PUT: updates a Item in the database.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.put('/:id', Middleware.isLoggedIn, async (req, res) => {
  const newData = req.body
  const itemId = req.params.id
  const updatedItem = await ItemServices.updateItem(itemId, newData)
  if (!updatedItem) {
    return res
      .status(404)
      .send({ error: `Error attempting to update item by ID ${itemId}.` })
  }

  return res.status(200).send(updatedItem)
})

/**
 * DELETE: deactivates an existing item in the database (NOT permanent deletion).
 *
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', Middleware.isLoggedIn, async (req, res) => {
  const itemId = req.params.id
  const hiddenItem = await ItemServices.hide(itemId)

  if (!hiddenItem) {
    return res
      .status(404)
      .send({ error: `Error attempting to delete item by ID ${itemId}.` })
  }
  return res.status(200).send()
})

module.exports = router
