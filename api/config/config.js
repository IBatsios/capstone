// Get Environment Variables
require('dotenv').config();

// Database Connection Configuration
const db_settings = {
    dbUri: process.env.DB_URI_PREFIX + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + process.env.DB_URI_SUFFIX,
    dbTranslator: 'MongoTranslator'
};

// To access the website with Ioannis's login info
// UserName: ioannisbatsios@gmail.com
// Password: r841P#EyGe@qfB34O

module.exports = db_settings;