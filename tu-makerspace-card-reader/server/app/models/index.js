const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("testdb", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  dialectOptions: {
    socketPath: "/tmp/mysql.sock"
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;