module.exports = (sequelize, DataTypes) => {

  let users = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    birthdate: DataTypes.DATE,
    password: DataTypes.STRING,
  });

  return users;
};
