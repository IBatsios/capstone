'use strict'

/**
 * Routes for admin portal.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */

// Imports
const router = require('express').Router();
const Middleware = require('../utility/Middleware');
const PostServices = require('../services/PostServices');
const CommentServices = require('../services/CommentServices');
const UserServices = require('../services/UserServices');


const REPORT_COUNT = 0;

/**
 * GET: homepage for admin portal.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    res.render('admin');
});

/**
 * GET: reported posts for admin portal.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/reportedPosts', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    var filter = {reportCount: {$gt: REPORT_COUNT}};
    // var reportedPosts = {}; // initialization
    var reportedPosts = await PostServices.getMany(filter);
    if (!reportedPosts) {
        reportedPosts = false;
    }
    res.render('admin/reportedPosts', {posts: reportedPosts});
});

/**
 * GET: reported comments for admin portal.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/reportedComments', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    var filter = {reportCount: {$gt: REPORT_COUNT}};
    // var reportedComments = {}; // initialization
    var reportedComments = await CommentServices.getMany(filter);
    res.render('admin/reportedComments', {comments: reportedComments});
});

/**
 * Administration route to disable a comment.
 * 
 * @author Christopher Thacker ref Jamie Weathers
 * @since 1.0.0
 */
router.delete('/reportedComments/:id', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    const commentId = req.params.id
    const hiddenComment = await CommentServices.hide(commentId)
  
    if (!hiddenComment) {
      return res
        .status(404)
        .redirect('/admin/reportedComments');
    }
    return res.status(200).redirect('/admin/reportedComments')
  })

  /**
 * Administration route to disable a comment.
 * 
 * @author Christopher Thacker ref Jamie Weathers
 * @since 1.0.0
 */
router.delete('/reportedPosts/:id', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    const postId = req.params.id
    const hiddenPost = await PostServices.hide(postId)
  
    if (!hiddenPost) {
      return res
        .status(404)
        .redirect('/admin/reportedPosts');
    }
    return res.status(200).redirect('/admin/reportedPosts')
  })

/**
 * Loads the manage users form for admins.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get('/manageUsers', Middleware.isLoggedIn, Middleware.isAdmin, (req, res) => {
    res.render('admin/manageUsers');
});

/**
 * Processes the manage users form for admins.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post('/manageUsers', Middleware.isLoggedIn, Middleware.isAdmin, async (req, res) => {
    const filter = {username: req.body.username}; // Optional TODO: Outsource to a UserServices function to build filter.
    var allUsers = null;
    var errors = {};

    try {
        allUsers = await UserServices.getManyUsers(filter);
    } catch (err) {
        errors.exception = err.message;
    } finally {
        if (allUsers) {
            return res.status(200).render('admin/manageUser', {users: allUsers});
        }
        return res.status(404).render('admin/manageUser', {users: allUsers});
    }
});

module.exports = router;
