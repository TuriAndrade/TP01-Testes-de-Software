const database = require("../../../../database/index.js");
const { DataTypes } = require("sequelize");

const Notification = database.define("Notifications", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  from: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  to: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Notification.associate = (models) => {
  Notification.hasMany(models.Exchange, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  Notification.belongsTo(models.User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    foreignKey: { name: "to" },
  });
};

module.exports = Notification;
