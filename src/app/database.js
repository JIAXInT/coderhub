const mysql = require("mysql2");

const coonectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "123456",
  connectionLimit: 10,
});

// 获取链接是否成功
coonectionPool.getConnection((err, coonection) => {
  if (err) {
    console.log("Error connecting to database: " + err);
    return;
  }

  coonection.connect((err) => {
    if (err) {
      console.log("Error connecting to database: " + err);
      return;
    } else {
      console.log("Connected to database successfully.");
    }
  });
});

const coonection = coonectionPool.promise();
module.exports = coonection;
