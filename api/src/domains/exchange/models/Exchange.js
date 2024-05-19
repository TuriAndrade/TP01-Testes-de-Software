const database = require("../../../../database/index.js");
const { DataTypes } = require("sequelize");

const Exchange = database.define("Exchanges", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  notificationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stickerNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Exchange.associate = (models) => {
  Exchange.belongsTo(models.Notification, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    foreignKey: { name: "notificationId" },
  });
};

module.exports = Exchange;
