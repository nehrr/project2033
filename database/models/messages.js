module.exports = (sequelize, DataTypes) => {

  let message = sequelize.define('message', {
    content: DataTypes.TEXT,
  });

  return message;
};
