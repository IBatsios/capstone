const model = 'user.model';

const DatabaseConnector = require('../connectors/database.connector');
const connector = new DatabaseConnector();

/**
 * User Controller: file that determines what to do with the user data. Will need to be optimized.
 */
class UserController {
    constructor() {
        // Do nothing for the moment.
    }

    getAllUsers(req, res) {
        // Build object (should eventually be done by some sort of factory or model)
        req.params.obj = {};

        // Save model's file name
        req.params.model = model;

        // Begin READ operation
        connector.read(req, res);
    }
}

module.exports = UserController;