const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  let user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    firstname: {
      type: DataTypes.STRING,
      required: true
    },
    lastname: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    birthdate: DataTypes.DATE,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: function(user) {
        if (user.password != user.password_confirmation) {
          throw("Error: Passwords don't match.")
        }
        let salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  user.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  };

  return user;
};
