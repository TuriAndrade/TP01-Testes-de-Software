const database = require("../../../../database/index");
const { DataTypes } = require("sequelize");

const User = database.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.associate = (models) => {
  User.belongsToMany(models.Sticker, {
    through: models.UserSticker,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

module.exports = User;
