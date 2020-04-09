'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'post.comment'
const Post = require(`../models/${modelName}`)

/**
 * Comment Services Class
 * Contains functions to retrieve or modify information of comments documents in the database.
 *
 * @author Jamie Weathers
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
  static async addNew(commentDTO) {
    try {
      const newComment = new Comment({
        content: commentDTO.content,
        author: commentDTO.author,
        isActive: commentDTO.isActive,
      })
      const result = await connector.create(modelName, newComment)

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
   * @since 1.0.0
   */
  static async update(commentId, newData) {
    const updatedComment = await connector.update(modelName, commentId, newData)

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
    const getComment = await this.update(commentId, hideData)
    return getComment
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
}

module.exports = CommentServices
