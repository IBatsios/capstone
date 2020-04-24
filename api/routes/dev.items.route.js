'use strict'

/**
 * This is the routes file for all actions related to items.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
const ItemServices = require('../services/ItemServices');
const UserServices = require('../services/UserServices')

/**
 * INDEX: show all Items.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    const filter = req.body
    const allItems = await ItemServices.getManyItems(filter)
    if (!allItems) {
        return res.redirect('/items/newItem')
      }
    res.render('items', {items: allItems});
});

  

/**
 * CREATE: add a new Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.put('/', async (req, res) => {   
    const itemDTO = req.body
    const userObj = await UserServices.getUser(itemDTO.authorId)
    console.log(userObj)
    const newItem = await ItemServices.addItem(userObj, itemDTO)
    if (!newItem) {
        return res.redirect('dev/items/newItem');
    }
    return res.render('dev/items/showItem', {item: newItem});
});

/**
 * NEW: renders the form to register a new Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/newItem', (req, res) => {
    res.render('items/newItem');
});

/**
 * SHOW: displays item page for an existing item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    const foundItem = await ItemServices.getItem(itemId);
    if (!foundItem) {
        console.log('Error when retrieving item.');
        return res.redirect('/items');
    }
    console.log(itemId)
    return res.render('items/showItem', {item: foundItem});
});

/**
 * EDIT: renders the form to edit an existing Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', async (req, res) => {
    const itemId = req.params.id
    const foundItem = await ItemServices.getItem(itemId);

    if (!foundItem) {
        console.log('Error when attempting to render edit item form.')
        return res.render('/items')
      }
    return res.render('items/editItem', {item: foundItem});
});

/**
 * PUT: updates a Item in the database.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    const newData = req.body;
    const itemId = req.params.id;
    const updatedItem = await ItemServices.updateItem(itemId, newData, itemItem);
    if (!updatedItem) {
        console.log('Error when updating item.');
        return res.redirect('/items');
    }
    return res.redirect(`/items/${itemId}`);
});

/**
 * DELETE: deactivates an existing item in the database (NOT permanent deletion).
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
    const hiddenItem = await ItemServices.hide(itemId)

  if (!hiddenItem) {
    console.log('Error when deleting item.')
    return res.redirect('/items')
  }
  return res.send('Item hidden.')
})

module.exports = router;