const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3030,
  }
);

// Definição dos modelos
const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
});

const Sticker = sequelize.define("Sticker", {
  number: DataTypes.INTEGER,
  name: DataTypes.STRING,
  team: DataTypes.STRING,
});

const UserSticker = sequelize.define("UserSticker", {
  amount: DataTypes.INTEGER,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  stickerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Sticker,
      key: "id",
    },
  },
}, {
  uniqueKeys: {
    actions_unique: {
      fields: ["userId", "stickerId"],
    },
  },
});

const Notification = sequelize.define("Notification", {
  from: DataTypes.INTEGER,
  to: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

const Exchange = sequelize.define("Exchange", {
  notificationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Notification,
      key: "id",
    },
  },
  stickerNumber: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
});

// Definição dos relacionamentos
User.hasMany(Notification, { foreignKey: "to" });
Notification.belongsTo(User, { foreignKey: "to" });

User.hasMany(UserSticker, { foreignKey: "userId" });
Sticker.hasMany(UserSticker, { foreignKey: "stickerId" });

UserSticker.belongsTo(User, { foreignKey: "userId" });
UserSticker.belongsTo(Sticker, { foreignKey: "stickerId" });

Notification.hasMany(Exchange, { foreignKey: "notificationId" });
Exchange.belongsTo(Notification, { foreignKey: "notificationId" });

// Sincronização das tabelas na ordem correta
async function syncTables() {
  await sequelize.sync({ force: true }); // Use { force: true } apenas em desenvolvimento
}

syncTables().then(() => {
  console.log("All tables synced");
}).catch(err => {
  console.error("Error syncing tables:", err);
});

module.exports = sequelize;
