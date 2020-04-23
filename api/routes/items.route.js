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
 * INDEX: show all items.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    // const filter = req.body; // Optional TODO: Outsource to a ItemServices function to build filter.
    const filter = {};

    var allItems = await ItemServices.getManyItems(filter);

  if (!allItems) {
    return res.status(404).send({ error: 'No list items were found' })
  }

    return res.status(200).send(allItems);
});

/**
 * CREATE: add a new Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.put('/', async (req, res) => {
    const user = req.session.user;
    const itemDTO = req.body; // Optional TODO: Outsource to a temServices function to build DTO.
    console.log('itemDTO');
    console.log(itemDTO);

    const result = await ItemServices.addItem(itemDTO);
    console.log('result');
    console.log(result);

    if (!result) {
      return res.status(404).send({ error: `Create list item  unsuccessful` })
    }

  // Provides the url of the new list item in the request response.
  //res.status(200).redirect(`${result._id}`);
  return res.status(200).send();
});

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
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    const foundItem = await ItemServices.getItem(itemId);
    if (!foundItem) {
      return res
        .status(404)
        .send({ error: `Error finding list item with ID ${[itemId]}.` })
    }

    return res.status(200).send(foundItem)
});

/**
 * EDIT: renders the form to edit an existing Item.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', async (req, res) => {
    const foundItem = await ItemServices.getItem(req.params.id);
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
    const updatedItem = await ItemServices.updateItem(itemId, newData);
    if (!updatedItem) {
      return res
        .status(404)
        .send({ error: `Error attempting to update item with ID ${itemId}.` })
    }

    return res.status(200).send(updatedItem)
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
      return res
        .status(404)
        .send({ error: `Error attempting to delete item with ID ${[itemId]}.` })
    }

    // Don't return anything upon delete.
    return res.status(200).send();
});

module.exports = router;
