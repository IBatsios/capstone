// Get Environment Variables
require('dotenv').config();

// Database Connection Configuration
const db_settings = {
    //dbUri: process.env.DB_URI_PREFIX + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + process.env.DB_URI_SUFFIX,
    dbUri: "mongodb://localhost:27017/devfeaturama?retryWrites=true&w=majority",
    dbTranslator: 'MongoTranslator'
};
console.log(db_settings);

// To access the website with Ioannis's login info
// UserName: ioannisbatsios@gmail.com
// Password: r841P#EyGe@qfB34O

module.exports = db_settings;
