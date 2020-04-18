'use strict'

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();

const modelName = 'item.model';

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
    static addItem(itemDTO) {

        // TODO: validate item DTO.

        
        try {
            const newItem = new Item({
              itemName: itemDTO.itemName,
              URL: itemDTO.URL,
              topic: itemDTO.topic,
              description: itemDTO.description,
              likeCount: itemDTO.likeCount,
              arrayLike: itemDTO.arrayLike,
              author: itemDTO.author,
              isActive: itemDTO.isActive,
            })
      
            const result = connector.create(modelName, newItem)
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
        var foundItem = await connector.readOne(modelName, itemId);

        if (foundItem === false) {
            console.log(`Error: bad item ID [${itemId}].`);
        }

        if (foundItem === null) {
            console.log(`Error: item with ID ${itemId} not found.`);
        }

        return foundItem;
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

        const allItems = await connector.readMany(modelName, filter);

        if (!allItems) {
            console.log('Could not find any items with provided query.');
        }

        return allItems;
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

        // TODO: validate newData

        const updatedItem = await connector.update(modelName, itemId, newData);

        if (updatedItem === null) {
            console.log('Could not find Item to update.');
        }

        if (updatedItem === false) {
            console.log('Update Item failed.');
        }

        return updatedItem;
    }

    /**
     * Contacts the database connector to deactivate a item that matches the ID passed in.
     * 
     * @param {ObjectId|string} itemId 
     * 
     * @returns {boolean} true if delete was successful, false if not
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async deleteItem(itemId) {
        const deleteResponse = await connector.delete(modelName, itemId);

        if (!deleteResponse) {
            console.log('Error deleting item.');
        }

        return deleteResponse;
    }
}

module.exports = ItemServices;
