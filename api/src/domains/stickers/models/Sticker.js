const database = require("../../../../database/index.js");
const { DataTypes } = require("sequelize");

const Sticker = database.define("Stickers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  team: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Sticker.associate = (models) => {
  Sticker.belongsToMany(models.User, {
    through: models.UserSticker,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

module.exports = Sticker;
