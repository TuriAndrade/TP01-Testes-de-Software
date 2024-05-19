// Dotenv
require("dotenv").config();

//Database sync
require("./api/database/sync"); //"./database/sync"

//APP
const app = require("./api/config/express-config"); //"./config/express-config"

app.listen(
  process.env.APP_PORT,
  console.log(`API listening on port ${process.env.APP_PORT}`)
);
