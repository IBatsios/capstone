'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'post.model'
const Post = require(`../models/${modelName}`)

/**
 * Post Services class
 * Contains functions to retrieve information from the database.
 * @author Jamie Weathers
 */

class PostServices {
  /**
   *
   * @param {*} postDTO
   */
  static async addNewPost(postDTO) {

        try {

            const newPost = new Post({
                title = postDTO.title,
                content = postDTO.content,
                topic = postDTO.topic,
                likeCount = 0,
                arrayLike = [],
                comments = [],
                author = postDTO.author,
                isActive = postDTO.isActive
                });

                connector.create()


        } catch (error) {
            console.log(error);
            return false;
        }

    }
}


module.exports = PostServices;