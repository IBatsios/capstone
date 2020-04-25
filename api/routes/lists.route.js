'use strict'

/**
 * This is the routes file for all actions related to lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */

const router = require('express').Router();
const ListServices = require('../services/ListServices');

/**
 * INDEX: show all Lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    // Optional TODO: Outsource to a ListService function to build filter.
    const filter = req.body;

    const allLists = await ListServices.getManyLists(filter);

    if (!allLists) {
      return res.status(404).send({ error: 'No lists were found' })
    }

    return res.status(200).send(allLists);
});

/**
 * CREATE: add a new List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.put('/', async (req, res) => {
    // Optional TODO: Outsource to a temServices function to build DTO.
    const listDTO = req.body;
    const user = req.session.user;
    const result = await ListServices.addList(user, listDTO);

    if (!result) {
      return res.status(404).send({ error: `Create List unsuccessful` })
    }

    // Provides the url of the new post in the request response.
    return res.status(200).redirect(`${result._id}`)
});

/**
 * NEW: renders the form to register a new List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/newList', (req, res) => {
    return res.render('lists/newList');
});

/**
 * SHOW: displays list page for an existing list.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id', async (req, res) => {
    const listId = req.params.id;
    const foundList = await ListServices.getList(listId);

    if (!foundList) {
      return res
        .status(404)
        .send({ error: `Error attempting to get list with ID ${[listId]}.` })
    }
    return res.status(200).send(foundList);
});

/**
 * EDIT: renders the form to edit an existing List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', async (req, res) => {
    const foundList = await ListServices.getList(req.params.id);
    return res.render('lists/editList', {list: foundList});
});

/**
 * PUT: updates a List in the database.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    const newData = req.body;
    const listId = req.params.id;
    let items = [];

    if (newData.items && newData.items.length > 0) {
      items = newData.items;
    }

    const updatedList = await ListServices.updateList(listId, newData, items);

    if (updatedList === null) {
      console.log(`Could not find list ID [${listId}] to update.`)
    }

    if (updatedList === false) {
      console.log(`Update list ID [${listId}] failed.`)
    }

    return res.status(200).send({ updatedList });
});

/**
 * DELETE: deactivates an existing list in the database (NOT permanent deletion).
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    const listId = req.params.id;
    const response = await ListServices.hide(listId); // TODO: Currently deletes the list in the DB, but eventually will need to update isActive flag.
    if (!response) {
        console.log('Error when deleting list.'); // TODO: Send error message to view.
    }
    return res.status(200).send()
});

module.exports = router;
