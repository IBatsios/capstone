'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'post.model'
const Post = require(`../models/${modelName}`)
const UserServices = require('../services/UserServices');
const Validation = require('../utility/Validation');

/**
 * Post Services class
 * Contains functions to retrieve or modify information in the database.
 *
 * @author Jamie Weathers
 * @author Christopher Thacker
 * @since 1.0.0
 */

class PostServices {
    /**
     * Adds a new post to the database.
     *
     * @param {Object} postDTO Post data transfer object.
     * @returns {Object|false} Post object or false if creating a new post unsuccessful
     * @author Jamie Weathers
     * @author Michael McCulloch
     * @since 1.0.0
     */
    static async addNew(user, postDTO) {
        try {
            const newPost = new Post({
                title: postDTO.title,
                content: postDTO.content,
                interest: postDTO.interest,
                likeCount: 0,
                arrayLike: [],
                comments: [],
                author: { id: user.id, username: user.username, avatar: user.avatar },
                isActive: true,
                spoiler: postDTO.spoiler,
            })

            const result = await connector.create(modelName, newPost)
            if (!result) {
                console.log('New post failed at PostServices')
                return false
            }
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     *
     * @param {ObjectId|string} postId Associated post reference identification to the intended post document.
     * @returns {Object|null|false} Returns the post Object if it is found, null if it is not found, and false if unsuccessful.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async getById(postId) {
        const postResult = await connector.readOne(modelName, postId)

        if (postResult === false) {
            console.log(`Error: bad post ID [${postId}].`)
        }

        if (postResult === null) {
            console.log(`Error: post with ID [${postId} not found.]`)
        }

        console.log(postResult.title)

        return postResult
    }

    /**
     * Gets an array of posts based on the provided filter conditions.
     * If not filter defined, all posts will be returned.
     * @param {Object} filter
     * @returns {Object|null|false} the post object if successful | null if no post found | false if unsuccessful
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async getMany(filter) {
        //TODO: Need a filter utility.

        const allPosts = await connector.readMany(modelName, filter)

        if (!allPosts) {
            console.log('Could not find any posts with the provided query.')
        }

        return allPosts
    }

    /**
     * Updates a post given new data.
     *
     * @param {ObjectId|string} postId Associated post reference identification to the intended post document.
     * @param {Object} newData Dictionary containing the intended field changes.
     * @returns {Object|null|false} Returns the updated post object if successful, null if the post does not exist, and false if unsuccessful.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async update(postId, newData) {
        const updatedPost = await connector.update(modelName, postId, newData)

        if (updatedPost === null) {
            console.log(`Could not find post ID [${postId}] to update.`)
        }

        if (updatedPost === false) {
            console.log(`Update post ID [${postId}] failed.`)
        }

        return updatedPost
    }

    /**
     * Changes the 'isActive' field of the post to false.
     *
     * @param {ObjectId|string} postId Associated post reference identification to the intended post document.
     * @returns {boolean} true if succcessful, false if post is not found or already hidden.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async hide(postId) {
        const hideData = { isActive: 'false' }
        const getPost = await this.update(postId, hideData)

        return getPost
    }

    /**
     * Changes the 'isActive' field of the post to true.
     *
     * @param {ObjectId|string} postId Associated post reference identification to the intended post document.
     * @returns {boolean} true if successful, false if post not found or already showing.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async show(postId) {
        const hideData = { isActive: 'true' }
        const getPost = await this.update(postId, hideData)

        return getPost
    }

    /**
     * Pushes a report onto a post and increments the report counter.
     * 
     * @param {string} postId 
     * @param {string} userId 
     * 
     * @author Christopher Thacker
     * @author Michael McCulloch
     * @since 1.0.0
     */
    static async addReport(postId, userId) {
        try {
            var foundPost = await this.getById(postId);
            var foundUser = await UserServices.getUser(userId);

            // Check if user has already reported the post
            const previousReport = foundPost.reportedBy.some((user) => {
                return user._id == userId;
            })

            // If user hasn't report the post before, add the report.
            if (!previousReport) {
                foundPost.reportedBy.push(foundUser);
                foundPost.reportCount++;

                try {
                    var updatedPost = await this.update(postId, foundPost);
                    if (updatedPost) {
                        console.log(`Updated post: ${updatedPost}`);
                        return updatedPost;
                    }
                    console.log('Failed to update post');
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
     * Removes all reports from a post.
     * 
     * @param {string} postId 
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async clearReports(postId) {
        try {
            var foundPost = await this.getById(postId);

            foundPost.reportedBy = [];
            foundPost.reportCount = 0;

            try {
                var updatedPost = await this.update(postId, foundPost);
                if (updatedPost) {
                    console.log(`Updated post: ${updatedPost}`);
                    return updatedPost;
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

module.exports = PostServices
