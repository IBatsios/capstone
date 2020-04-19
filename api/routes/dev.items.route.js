'use strict'

/**
 * This is the routes file for all actions related to items.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
const ItemServices = require('../services/ItemServices');

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
router.post('/', async (req, res) => {   
    req.body.isActive = true;
    const itemDTO = req.body; // Optional TODO: Outsource to a temServices function to build DTO.
    var newItem = await ItemServices.addItem(itemDTO);
    var response
    if (!newItem) {
        response = 'unsuccessful.'
      } else {
        response = 'successful.'
      }
    
      res.send(response)
    })

/**
 * NEW: renders the form to register a new Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/newItem', (req, res) => {
    return res.render('items/newItem');
});

/**
 * SHOW: displays item page for an existing item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    var foundItem = await ItemServices.getItem(itemId);
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
    const response = await ItemServices.deleteItem(itemId); // TODO: Currently deletes the item in the DB, but eventually will need to update isActive flag.
    console.log(response);
    if (!response) {
        console.log('Error when deleting item.'); // TODO: Send error message to view.
        return res.redirect('/items'); //TODO: Send success message to view.
    }
    return res.send('item delete.')
});

module.exports = router;