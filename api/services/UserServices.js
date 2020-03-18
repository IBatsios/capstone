'use strict'

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();

const modelName = 'user.model';

/**
 * User Services class: supplement to the traditional models from MVC. Functions here will be used to get specific information from the database.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class UserServices {

    /**
     * Service method to add a user to the database.
     * 
     * @param {*} userDTO Data Transfer Object for user.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static addUser(userDTO) {

        // TODO: validate user DTO.

        const userId = connector.create(modelName, userDTO);
        return userId;
    }

    /**
     * Service method to find a single user in the database.
     * 
     * @param {*} userId
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async getUser(userId) {
        var foundUser = await connector.readOne(modelName, userId);

        if (foundUser === false) {
            console.log(`Error: bad user ID [${userId}].`);
        }

        if (foundUser === null) {
            console.log(`Error: user with ID ${userId} not found.`);
        }

        return foundUser;
    }

    /**
     * Returns all users based on the provided conditions. If no filters are provided, then all users in the database will be returned.
     * These parameters match the MongoDB function parameters; please refer to the MongoDB documentation for more details on what each
     * parameter is. WARNING: if no filter is defined, all users will be returned.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async getManyUsers(filter) {

        // TODO: validate filter conditions.

        const allUsers = await connector.readMany(modelName, filter);

        if (!allUsers) {
            console.log('Could not find any users with provided query.');
        }

        return allUsers;
    }

    /**
     * 
     * @param {*} userId 
     * @param {*} newData 
     */
    static async updateUser(userId, newData) {

        // TODO: validate newData

        const updatedUser = await connector.update(modelName, userId, newData);

        if (!updatedUser) {
            console.log('Could not find user to update.');
        }

        return updatedUser;
    }
}

module.exports = UserServices;
