'use strict'

/**
 * This is the routes file for all actions related to lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */

const router = require('express').Router();
const ListServices = require('../services/ListServices');
const UserServices = require('../services/UserServices')
/**
 * INDEX: show all Lists.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/', async (req, res) => {
    const filter = req.body

  const allLists = await ListServices.getManyLists(filter)

  if (!allLists) {
    return res.redirect('/dev/lists/newList')
  }

  res.render('lists', {lists: allLists});
});

/**
 * CREATE: add a new List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.post('/', async (req, res) => {   
    const listDTO = req.body
    const userObj = await UserServices.getUser(listDTO.authorId)
    console.log(userObj)
    const result = await ListServices.addNew(userObj, listDTO)

    if (!result) {
        response = 'List was unsuccessful.'
        return res.send(response)
    }

    return res.redirect('/dev/lists/')
})

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
    var foundList = await ListServices.getList(listId);
    if (!foundList) {
        console.log('Error when retrieving list.');
        return res.redirect('/lists');
    }
    console.log(listId)
    return res.render('lists/showList', {list: foundList});
});

/**
 * EDIT: renders the form to edit an existing List.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.get('/:id/edit', async (req, res) => {
    const listId = req.params.id
    const foundList = await ListServices.getList(listId);
    if (!foundList) {
        console.log('Error when attempting to render edit list form.')
        return res.render('dev/lists')
      }
      return res.render('lists/editList', { list: foundList })
    })

/**
 * PUT: updates a List in the database.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    const newData = req.body;
    const listId = req.params.id;
    const updatedList = await ListServices.updateList(listId, newData, items);
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
        return res.redirect('/lists'); //TODO: Send success message to view.
    }
    return res.send('list delete.')
});

module.exports = router;