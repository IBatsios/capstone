// Get Environment Variables
require('dotenv').config();

const db_settings = {
    dbUri: process.env.DB_URI,
    dbTranslator: 'mongoose.translator'
};

module.exports = db_settings;