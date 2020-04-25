'use strict'

/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

 const Middleware = require('../utility/Middleware');

// Imports
const router = require('express').Router();
const PostServices = require('../services/PostServices');

/**
 * Testing purposes only.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
// router.get('/', async (req, res) => {
//     res.status(200).send('Hello!');
// });

/**
 * CREATE: add a new post report.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    try {
        if (req.session.user && req.session.user !== undefined) {
            const user = req.session.user;
            const isReported = await PostServices.addReport(req.params.id, user.id);

            if (isReported) {
                return res.status(200).json({post: isReported});
            }
            return res.status(403).json({error: 'Post was not reported'});
        }
        return res.status(401).json({error: 'User not logged in'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error);
    }
});

/**
 * DELETE: currently deletes all reports on a post. Eventually, this could be used to delete individual reports from posts.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', Middleware.isLoggedIn, async (req, res) => {
    try {
            const reportRemoved = await PostServices.clearReports(req.params.id);

            if (reportRemoved) {
                return res.status(200).json({post: reportRemoved});
            }
            return res.status(403).json({error: 'Could not remove reports from post'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error);
    }
});

module.exports = router;
