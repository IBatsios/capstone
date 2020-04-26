// Get Environment Variables
require("dotenv").config();

// Database Connection Configuration
const db_settings = {
  dbUri:
    process.env.DB_URI_PREFIX +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    process.env.DB_URI_SUFFIX,
  dbTranslator: "MongoTranslator",
  minPasswordLength: 6,
  maxPasswordLength: 30,
};

module.exports = db_settings;
