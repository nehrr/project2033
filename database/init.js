const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const config = require(path.join(__dirname, 'config.json'));

let db = {};

db.sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

let modelPathname = path.join(__dirname, 'models');

fs
.readdirSync(modelPathname)
.filter((filename) => {
  return (filename.indexOf(".") !== 0);
})
.forEach((filename) => {
  let model = db.sequelize.import(path.join(modelPathname, filename));
  db[model.name] = model;
});

module.exports = db;
