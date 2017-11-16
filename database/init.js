const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let db = {};

db.sequelize = new Sequelize('2033', 'ernoul', '', {
  host: 'localhost',
  dialect: 'postgres',
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
