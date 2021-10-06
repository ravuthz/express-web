var debug = require('debug')('express-web:db');
var { Sequelize } = require('sequelize');

var sequelize = null;
// var logging = (process.env.DEBUG_SEQUALIZE === 'true') ? debug : false;
var logging = (process.env.DEBUG_SEQUALIZE === 'true');
var databaseUrl = process.env.DATABASE_URL || null;

var config = {
    logging
};

if (databaseUrl) {
    if (logging) {
        debug('Database URL: ', databaseUrl);
    }
    sequelize = new Sequelize(databaseUrl, config);
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        ...config
    });
}
    
module.exports = {
    sequelize,
    Sequelize
}