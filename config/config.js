module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "testdb",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
  // outras configurações para test e production
};