// Get Environment Variables
require('dotenv').config();

const db_settings = {
    dbUri: process.env.DB_URI,
    dbTranslator: 'mongo.translator'
};

module.exports = db_settings;