'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const debug = require('debug')('express-web:sequelize');

const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const init = () => {
  sequelize.authenticate().then(() => {
    debug('Database connected successfully');
    // db.User.findAll().then(res => debug('User.findAll: ', res));
    // db.User.findOne({ where: { id: 1 }}).then(res => debug('User.findOne: ', res));
  }).catch(error => {
    debug('Database connect failed: ', error);
  });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;

module.exports = db;
