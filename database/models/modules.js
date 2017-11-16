module.exports = (sequelize, DataTypes) => {

  let modules = sequelize.define('module', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    teacher: DataTypes.STRING,
  });

  return modules;
};
