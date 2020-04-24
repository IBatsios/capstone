'use strict'

/**
 * This is the routes file for all actions related to users.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

// Imports
const router = require('express').Router();
const CommentServices = require('../services/CommentServices');

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
 * CREATE: add a new comment report.
 * 
 * @author Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.put('/:id', async (req, res) => {
    // Only authenticated users should able to add a comment.
    if (req.session.user) {
        try {
                const user = req.session.user;
                const isReported = await CommentServices.addReport(req.params.id, user.id);

                if (isReported) {
                    return res.status(200).json({comment: isReported});
                }
                return res.status(403).json({error: 'Comment was not reported'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).send(error);
        }
    }

    return res.status(401).json({error: 'User not logged in'});
});

/**
 * DELETE: currently deletes all reports on a comment. Eventually, this could be used to delete individual reports from comments.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.delete('/:id', async (req, res) => {
    try {
            const reportRemoved = await CommentServices.clearReports(req.params.id);

            if (reportRemoved) {
                return res.status(200).json({comment: reportRemoved});
            }
            return res.status(403).json({error: 'Could not remove reports from post'});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error);
    }
});

module.exports = router;
