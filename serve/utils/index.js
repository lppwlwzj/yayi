const db = require("../db/index");

// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

// 导入配置文件
const config = require("../config");
exports.log = (token, logcontent) => {
  console.log("🚀 ~ logContent:", logcontent);

  jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
    }
    const { username, usercount } = decoded;
    const sql = `insert into logger (
        logname,
        logcount,
        logcontent
      ) values ('${username}','${usercount}','${logcontent}') `;
    db.query(sql, (err, results) => {
      console.log("🚀 ~ db.query ~ err:", err);
    });
  });
};


//			
// SELECT * FROM logger  ORDER BY logtime DESC 