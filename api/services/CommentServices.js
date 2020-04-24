'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'comment.model'
const Comment = require(`../models/${modelName}`)
const PostServices = require('../services/PostServices');
const UserServices = require('../services/UserServices');

/**
 * Comment Services Class
 * Contains functions to retrieve or modify information of comments documents in the database.
 *
 * @author Jamie Weathers
 * @author Michael McCulloch
 * @author Christopher Thacker
 * @since 1.0.0
 */

class CommentServices {
    /**
     * Adds a new comment to the database.
     *
     * @param {Object} commentDTO Comment data transfer object.
     * @returns {Object|false} Comment object | false if creating new comment unsuccessful.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async addNew(user, commentDTO) {
        try {
            const newComment = new Comment({
                content: commentDTO.content,
                postId: commentDTO.postId,
                author: { id: user.id, username: user.username, avatar: user.avatar },
                isActive: true,
            })
            const result = await connector.create(modelName, newComment)

            // Add the comment to the post.
            const post = await PostServices.getById(commentDTO.postId)
            post.comments.push(result)
            PostServices.update(commentDTO.postId, post)

            if (!result) {
                console.log(`New comment failed at CommentServices`)
                return false
            }
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Gets a Comment object from the database given the comment id.
     * @param {ObjectId|string} commentId Associated comment reference identification to the intended comment  document.
     * @returns {Object|null|false} Returns the post Object if it is found | null if it is not found | false if unsuccessful.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async getById(commentId) {
        const commentResult = await connector.readOne(modelName, commentId)

        if (commentResult === false) {
            console.log(`Error: Bad Comment ID [${commentId}]`)
        }

        if (commentResult === null) {
            console.log(`Error: Comment with ID [${commentId} not found]`)
        }

        return commentResult
    }

    /**
     * Gets an array of comments based on the provided filter conditions.
     * If not filtered, all comments will be returned.
     * @param {Object} filter Filter defining matching field conditions.
     * @returns {Object|null|false} The comment object if successful | null if no comment found | false if unsuccessful.
     */
    static async getMany(filter) {
        // TODO: We need a filter utility.
        const allComments = await connector.readMany(modelName, filter)

        if (!allComments) {
            console.log(`Could not find any posts with provided filter.`)
        }

        return allComments
    }

    /**
     * Upates an existing comment given new data and it's reference identification.
     *
     * @param {ObjectId|string} commentId Associated comment reference identification to the intended comment document.
     * @param {Object} newData Dictionary containing the intended field changes.
     * @returns {Object|null|false} Returns the updated comment object if successful | null if comment does not exist | false if unsuccessful
     * @author Jamie Weathers
     * @author Michael McCulloch
     * @since 1.0.0
     */
    static async update(commentId, newData) {
        await connector.update(modelName, commentId, newData)

        // Get the comment by id, rather than use the return value of,
        // connector update to avoid an asynchronous issue.
        const updatedComment = await this.getById(commentId)

        // Get the post to update the comments.
        const post = await PostServices.getById(updatedComment.postId)

        // FIXME: This is a work-around to update the comments on a post.
        const comments = post.comments.map((comment) => {
            if (comment._id == commentId) {
                return updatedComment
            }
            return comment
        })

        post.comments = comments

        // Update the post.
        PostServices.update(updatedComment.postId, post)

        if (updatedComment == null) {
            console.log(`Could not find comment ID [${commentId}] to update.`)
        }

        if (updatedComment == false) {
            console.log(`Update comment ID [${commentId}] failed.`)
        }

        return updatedComment
    }

    /**
     * Changes the 'isActive' field of the comment to false.
     * @param {ObjectId|string} commentId Associated comment reference identification to the intended comment document.
     * @returns {boolean} True if successful, false if post not found or already hidden.
     * @param {ObjectId|string}
     */
    static async hide(commentId) {
        const hideData = { isActive: 'false' }

        // Get the comment by id, rather than use the return value of,
        // update to avoid an asynchronous issue.
        await this.update(commentId, hideData)
        const updatedComment = await CommentServices.getById(commentId)

        // Get the post to update the comments.
        const post = await PostServices.getById(updatedComment.postId)

        // FIXME: This is a work-around to update the comments on a post.
        const comments = post.comments.filter((comment) => comment._id != commentId)

        post.comments = comments

        // Update the post.
        PostServices.update(updatedComment.postId, post)

        return updatedComment
    }

    /**
     * Changes the 'isActive' field of the comment to true.
     * @param {ObjectId|string} commentId Associated comment reference identification to the intended comment document.
     * @returns {boolean} True if successful, false if post not found or already showing.
     */
    static async show(commentId) {
        const showData = { isActive: 'true' }
        const getComment = await this.update(commentId, showData)

        return getComment
    }

    /**
     * Pushes a report onto a comment and increments the report counter.
     * 
     * @param {string} commentId 
     * @param {string} userId 
     * 
     * @author Christopher Thacker
     * @author Michael McCulloch
     * @since 1.0.0
     */
    static async addReport(commentId, userId) {
        try {
            var foundComment = await this.getById(commentId);
            var foundUser = await UserServices.getUser(userId);

            // Check if user has already reported the post
            const previousReport = foundComment.reportedBy.some((user) => {
                return user._id == userId;
            })

            // If user hasn't report the post before, add the report.
            if (!previousReport) {
                foundComment.reportedBy.push(foundUser);
                foundComment.reportCount++;

                try {
                    var updatedComment = await this.update(commentId, foundComment);
                    if (updatedComment) {
                        console.log(`Updated post: ${updatedComment}`);
                        return updatedComment;
                    }
                    console.log('Failed to update comment');
                    return false;
                } catch (error) {
                    console.log(error.message);
                    return false;
                }
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    /**
     * Deletes a report that the current user has submitted.
     * 
     * @param {*} postId 
     * @param {*} userId 
     * 
     * @author
     * @since
     */
    static async removeReport(postId, userId) {
        // TODO: not implemented
    }

    /**
     * Removes all reports from a comment.
     * 
     * @param {string} postId 
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async clearReports(commentId) {
        try {
            var foundComment = await this.getById(commentId);

            foundComment.reportedBy = [];
            foundComment.reportCount = 0;

            try {
                var updatedComment = await this.update(commentId, foundComment);
                if (updatedComment) {
                    console.log(`Updated post: ${updatedComment}`);
                    return updatedComment;
                }
                console.log('Failed to update post');
                return false;
            } catch (error) {
                console.log(error.message);
                return false;
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

module.exports = CommentServices
