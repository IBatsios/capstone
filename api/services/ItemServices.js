'use strict'

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();
const modelName = 'item.model';
const Item = require(`../models/${modelName}`)
const ListServices = require('../services/ListServices');

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
    static async addItem(itemDTO) {

        // TODO: validate item DTO.
        try {
            const newItem = new Item({
              name: itemDTO.name,
              url: itemDTO.url,
              interest: itemDTO.interest,
              description: itemDTO.description,
              listId: itemDTO.listId,
              isActive: true
            })
      
            const result = await connector.create(modelName, newItem)
            if (!result) {
              console.log('New item failed at ItemServices')
              return false
            }

            // Add the item to the list.
            const list = await ListServices.getList(itemDTO.listId);
            list.items.push(result);
            ListServices.updateList(itemDTO.listId, list);

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
        await connector.update(modelName, itemId, newData);
        // Get the item by id, rather than use the return value of,
        // connector update to avoid an asynchronous issue.
        const updatedItem = await this.getItem(itemId);
        const list = await ListServices.getList(updatedItem.listId);
        console.log('list');
        console.log(list);

        // FIXME: This is a work-around to update the items on a list.
        const items = list.items.map(item => {
          console.log('item');
          console.log(item);
          if (item._id == itemId){
            return updatedItem;
          }
          return item;
        });

        list.items = items;

        // Update the post.
        ListServices.updateList(updatedItem.listId, list);

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
        const item = await this.getItem(itemId);

        const list = await ListServices.getList(item.listId);
        
        // FIXME: This is a work-around to update the items on a list.
       // const items = list.items.filter(item => item._id != itemId);
        
        const newItem = new Item({
          name: item.name,
          url: item.url,
          description: itemDTO.description,
          listId: itemDTO.listId,
          isActive: true
        })
        const items = list.items.filter(item => item._id != itemId);
        list.items = items;
        console.log('list._id: ', list._id);
        console.log('list: ', list);

        ListServices.updateList(item.listId, list);
        // Commenting the below line, could essentially hides
        // the deleted item; because the item is still in the database,
        // but not apart of the list anymore.
        //const deleteResponse = await connector.delete(modelName, itemId);
        //return deleteResponse;
        return true;
    }
}

module.exports = ItemServices;
