module.exports = (sequelize, DataTypes) => {

  let module = sequelize.define('module', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    teacher: DataTypes.STRING,
  });

  return module;
};
