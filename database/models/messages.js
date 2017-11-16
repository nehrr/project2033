module.exports = (sequelize, DataTypes) => {

  let messages = sequelize.define('message', {
    content: DataTypes.TEXT,
  });

  return messages;
};
