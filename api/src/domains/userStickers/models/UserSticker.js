const database = require("../../../../database/index.js");
const { DataTypes } = require("sequelize");

const UserSticker = database.define("UserStickers", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stickerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserSticker.associate = (models) => {
  UserSticker.belongsTo(models.User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    foreignKey: { name: "userId" },
  });

  UserSticker.belongsTo(models.Sticker, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    foreignKey: { name: "stickerId" },
  });
};

module.exports = UserSticker;
