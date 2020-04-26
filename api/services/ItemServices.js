'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'item.model'
const Item = require(`../models/${modelName}`)
const ListServices = require('../services/ListServices')
const UserServices = require('../services/UserServices')

/**
 * item Services class: supplement to the traditional models from MVC. Functions here will be used to get specific information from the database.
 *
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
class ItemServices {
  /**
   * Service method to add a item to the database.
   *
   * @param {*} itemDTO Data Transfer Object for item.
   *
   * @author Hieu Vo ref Christopher Thacker
   * @since 1.0.0
   */
  static async addItem(user, itemDTO) {
    // TODO: validate item DTO.

    console.log(user)

    try {
      const newItem = new Item({
        name: itemDTO.name,
        url: itemDTO.url,
        listId: itemDTO.listId,
        description: itemDTO.description,
        author: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
        },
        isActive: true,
      })

      const result = await connector.create(modelName, newItem)

      // Add the item to the list.
      const list = await ListServices.getList(itemDTO.listId)
      list.items.push(result)
      ListServices.updateList(itemDTO.listId, list)

      if (!result) {
        console.log('New item failed at ItemServices')
        return false
      }
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  /**
   * Service method to find a single item in the database.
   *
   * @param {*} itemId
   *
   * @author Hieu Vo ref Christopher Thacker
   * @since 1.0.0
   */
  static async getItem(itemId) {
    var foundItem = await connector.readOne(modelName, itemId)

    if (foundItem === false) {
      console.log(`Error: bad item ID [${itemId}].`)
    }

    if (foundItem === null) {
      console.log(`Error: item with ID ${itemId} not found.`)
    }

    return foundItem
  }

  /**
   * Returns all Items based on the provided conditions. If no filters are provided, then all items in the database will be returned.
   * These parameters match the MongoDB function parameters; please refer to the MongoDB documentation for more details on what each
   * parameter is. WARNING: if no filter is defined, all items will be returned.
   *
   * @author Hieu Vo ref Christopher Thacker
   * @since 1.0.0
   */
  static async getManyItems(filter) {
    // TODO: validate filter conditions.

    const allItems = await connector.readMany(modelName, filter)

    if (!allItems) {
      console.log('Could not find any items with provided query.')
    }

    return allItems
  }

  /**
   * Contacts the database connector to update a Item that matches the ID passed in.
   *
   * @param {ObjectId|string} itemId
   * @param {object} newData
   *
   * @returns {object|null|false} the updated object if successful | null if no item found | false if failed
   *
   * @author Hieu Vo ref Christopher Thacker
   * @since 1.0.0
   */
  static async updateItem(itemId, newData) {
    await connector.update(modelName, itemId, newData)
    // TODO: validate newData
    // ^^^^ We don't need to do this. It's going to fail on its own and report what's missing.
    const updatedItem = await this.getItem(itemId)
    if (updatedItem === null) {
      console.log('Could not find Item to update.')
    }

    if (updatedItem === false) {
      console.log('Update Item failed.')
    }

    const list = await ListServices.getList(updatedItem.listId)

    // Shouldn't need to apply an update to all items... Just the one.
    const items = list.items.map((item) => {
      if (item._id == itemId) {
        item.name = updatedItem.name
        item.description = updatedItem.description
        item.url = updatedItem.url
      }
      return item
    })

    list.items = items
    ListServices.updateList(updatedItem.listId, { items: list })

    return updatedItem
  }
  /**
   * @author Hieu Vo ref Jamie Weathers
   * @since 1.0.0
   */
  static async hide(itemId) {
    const hideData = { isActive: 'false' }

    await this.updateItem(itemId, hideData)
    const updatedItem = await ItemServices.getItem(itemId)

    const list = await ListServices.getList(updatedItem.listId)

    // FIXME: This is a work-around to update the items on a list.
    const items = list.items.filter((item) => item._id != itemId)

    list.items = items

    // Update the list.
    ListServices.updateList(updatedItem.listId, list)

    return updatedItem
  }

  /**
   * @author Hieu Vo ref Jamie Weathers
   * @since 1.0.0
   */
  static async show(itemId) {
    const hideData = { isActive: 'true' }
    const getItem = await this.updateItem(itemId, hideData)

    return getItem
  }
}

module.exports = ItemServices
