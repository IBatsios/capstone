'use strict'

/**
 * This is the routes file for all actions related to lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
const ListServices = require('../services/ListServices');
const mockLists = require('../data/mock-lists.json');

/**
 * INDEX: show all Lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    // const filter = req.body; // Optional TODO: Outsource to a ListServices function to build filter.
    // FIXME: This is a work-aournd to prevent master from crashing.  This route is going to be json at 
    // some point anyway.  Also a filter which is always empty can be commented-out (personal justification).
    /*
    const filter = {};

    var allLists = await ListServices.getManyLists(filter);

    if (!allLists) {
        // return res.send('No Lists found.');
        return res.redirect('/lists/newList');
    }
    */

    // FIXME: Workaround until json is returning expected data.
    //return res.render('lists', {lists: allLists});
    return res.status(200).send(mockLists);
});

/**
 * CREATE: add a new List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.post('/', async (req, res) => {
    req.body.isActive = true;
    const listDTO = req.body; // Optional TODO: Outsource to a temServices function to build DTO.
    console.log(listDTO);
    var newList = await ListServices.addList(listDTO);
    if (!newList) {
        return res.redirect('/lists/newList');
    }

    return res.render('lists/showList', {list: newList});
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
    console.log(req);
    const listId = req.params.id;
    var foundList = await ListServices.getList(listId);
    if (!foundList) {
        console.log('Error when retrieving list.');
        return res.redirect('/lists');
    }
    return res.render('lists/showList', {list: foundList});
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
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    const newData = req.body;
    const listId = req.params.id;
    const updatedList = await ListServices.updateList(listId, newData, itemList);
    if (!updatedList) {
        console.log('Error when updating list.');
        return res.redirect('/lists');
    }
    return res.redirect(`/lists/${listId}`);
});

/**
 * DELETE: deactivates an existing list in the database (NOT permanent deletion).
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    const listId = req.params.id;
    const response = await ListServices.deleteList(listId); // TODO: Currently deletes the list in the DB, but eventually will need to update isActive flag.
    console.log(response);
    if (!response) {
        console.log('Error when deleting list.'); // TODO: Send error message to view.
    }
    return res.redirect('/lists'); //TODO: Send success message to view.
});

module.exports = router;
