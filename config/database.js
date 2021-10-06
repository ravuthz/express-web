var debug = require('debug')('express-web:sequelize');

const logging = process.env.DEBUG_SEQUALIZE == 'true' ? (obj) => debug(obj) : false;

const devConfig = {
  // dialect: 'postgres',
  // host: process.env.DB_HOST || 'localhost',
  // port: process.env.DB_PORT || 5432,
  // database: process.env.DB_NAME || '',
  // username: process.env.DB_USER || 'postgres',
  // password: process.env.DB_PASSWORD || '',
  logging,
  logQueryParameters: true,
  use_env_variable: 'DATABASE_URL',
  migrationStorageTableName: 'migrations'
};

const testConfig = {
  logging,
  logQueryParameters: true,
  use_env_variable: 'TEST_DATABASE_URL',
  migrationStorageTableName: 'migrations'
};

module.exports = {
  development: devConfig,
  production: devConfig,
  test: testConfig,
};