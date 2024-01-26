
var mysql = require('mysql');
const conf = require("../config.json");
const pool = mysql.createPool({
  connectionLimit: 10, 
  host: conf.db.host,
  user: conf.db.user,
  password: conf.db.password,
  database: conf.db.dbname
});

module.exports = pool;
