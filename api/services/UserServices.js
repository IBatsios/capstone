'use strict'
const modelName = 'user.model';
const User = require(`../models/${modelName}`);

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();


/**
 * User Services class: supplement to the traditional models from MVC. Functions here will be used to get specific information from the database.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class UserServices {

    /**
     * Service method to add a user to the database. IMPORTANT: this method uses PassportJS to contact the database, NOT the DatabaseConnector.
     * 
     * @param {object} userDTO Data Transfer Object for user.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async addUser(userDTO) {
        try {
            // TODO: make a separate user building function.
            const newUser = new User({
                email: userDTO.email,
                password: userDTO.password,
                firstName: userDTO.firstName,
                lastName: userDTO.lastName,
                username: userDTO.username,
                bio: userDTO.bio,
                phone: userDTO.phone,
                isActive: true
            });

            try {
                const result = await connector.create(modelName, newUser);
                if (!result) {
                    console.log('Registration failed at UserServices');
                    return false;
                }
                return result;
            } catch (error) {
                console.log(error);
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }  
    }

    /**
     * Service method to find a single user in the database.
     * 
     * @param {ObjectId|string} userId
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
     * @param {object} filter
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async getManyUsers(filter) {

        // TODO: validate filter conditions.

        const allUsers = await connector.readMany(modelName, filter);

        if (!allUsers) {
            console.log('Could not find any users with provided query.');
            return false;
        }

        return allUsers;
    }

    /**
     * Finds a user with an email matching the specified one.
     * 
     * @param {string} email 
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async getUserByEmail(email) {
        const user = await this.getManyUsers({email: email});

        if (!user) {
            console.log('Could not find user with that email.');
        }

        return user[0];
    }

    /**
     * Contacts the database connector to update a user that matches the ID passed in.
     * 
     * @param {ObjectId|string} userId 
     * @param {object} newData 
     * 
     * @returns {object|null|false} the updated object if successful | null if no user found | false if failed
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async updateUser(userId, newData) {

        // TODO: validate newData

        const updatedUser = await connector.update(modelName, userId, newData);

        if (updatedUser === null) {
            console.log('Could not find user to update.');
        }

        if (updatedUser === false) {
            console.log('Update user failed.');
        }

        return updatedUser;
    }

    /**
     * Contacts the database connector to deactivate a user that matches the ID passed in.
     * 
     * @param {ObjectId|string} userId 
     * 
     * @returns {boolean} true if delete was successful, false if not
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async deleteUser(userId) {
        const deleteResponse = await connector.delete(modelName, userId);

        if (!deleteResponse) {
            console.log('Error deleting user.');
        }

        return deleteResponse;
    }
}

module.exports = UserServices;
