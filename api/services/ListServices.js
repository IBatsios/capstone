'use strict'

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();
const modelName = 'list.model';
const List = require(`../models/${modelName}`)

/**
 * list Services class: supplement to the traditional models from MVC. Functions here will be used to get specific information from the database.
 * 
 * @author Hieu Vo ref Christopher Thacker
 * @since 1.0.0
 */
class ListServices {

    /**
     * Service method to add a list to the database.
     * 
     * @param {*} listDTO Data Transfer Object for list.
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async addList(user,listDTO) {

        // TODO: validate list DTO.

        try {
            const newList = new List({
                listName: listDTO.listName,           
                interest: listDTO.interest,
                itemList: [],              
                author: user,
                isActive: true,
              
            })
      
            const result = await connector.create(modelName, newList)
            if (!result) {
              console.log('New list failed at ListServices')
              return false
            }
            return result
          } catch (error) {
            console.log(error)
            return false
          }
        }
    

    /**
     * Service method to find a single list in the database.
     * 
     * @param {*} listId
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async getList(listId) {
        var foundList = await connector.readOne(modelName, listId);

        if (foundList === false) {
            console.log(`Error: bad list ID [${listId}].`);
        }

        if (foundList === null) {
            console.log(`Error: list with ID ${listId} not found.`);
        }

        return foundList;
    }

    /**
     * Returns all Lists based on the provided conditions. If no filters are provided, then all Lists in the database will be returned.
     * These parameters match the MongoDB function parameters; please refer to the MongoDB documentation for more details on what each
     * parameter is. WARNING: if no filter is defined, all Lists will be returned.
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async getManyLists(filter) {

        // TODO: validate filter conditions.

        const allLists = await connector.readMany(modelName, filter);

        if (!allLists) {
            console.log('Could not find any lists with provided query.');
        }

        return allLists;
    }

    /**
     * Contacts the database connector to update a List that matches the ID passed in.
     * 
     * @param {ObjectId|string} listId 
     * @param {object} newData 
     * 
     * @returns {object|null|false} the updated object if successful | null if no list found | false if failed
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async updateList(listId, newData) {

        // TODO: validate newData

        const updatedList = await connector.update(modelName, listId, newData);

        if (updatedList === null) {
            console.log('Could not find List to update.');
        }

        if (updatedList === false) {
            console.log('Update List failed.');
        }

        return updatedList;
    }

    /**
     * Contacts the database connector to deactivate a List that matches the ID passed in.
     * 
     * @param {ObjectId|string} listId 
     * 
     * @returns {boolean} true if delete was successful, false if not
     * 
     * @author Hieu Vo ref Christopher Thacker
     * @since 1.0.0
     */
    static async deleteList(listId) {
        const deleteResponse = await connector.delete(modelName, listId);

        if (!deleteResponse) {
            console.log('Error deleting list.');
        }

        return deleteResponse;
    }
    /**
     * @author Hieu Vo ref Jamie Weathers
     * @since 1.0.0
     */
    static async hide(listId) {
        const hideData = { isActive: 'false' }
        const getList = await this.update(listId, hideData)
    
        return getList
      }
    
      /**
       * @author Hieu Vo ref Jamie Weathers
       * @since 1.0.0
       */
      static async show(listId) {
        const hideData = { isActive: 'true' }
        const getList = await this.update(listId, hideData)
    
        return getList
      }
}

module.exports = ListServices;
