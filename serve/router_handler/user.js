/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//  导入数据库操作模块
const db = require("../db/index");

const bcrypt = require("bcryptjs");

// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

// 导入配置文件
const config = require("../config");

// 登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = `select * from user where usercount=?`;
  // 执行 SQL 语句，查询用户的数据
  db.query(sql, userinfo.usercount, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc("用户不存在！");
    const { password, usercount, username } = results[0] || {};

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (userinfo.password !== password) {
      return res.cc("密码错误！");
    }

    // 剔除完毕之后，user 中只保留了用户的 id, userName, nickname, email 这四个属性的值
    const user = { ...results[0], password: "" };
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h" // token 有效期为 10 个小时
    });
    // 将生成的 Token 字符串响应给客户端
    res.send({
      code: 0,
      message: "登录成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      re: {
        token: "Bearer " + tokenStr,
        userinfo: {
          usercount,
          username
        }
      }
    });
  });
};
exports.list = (req, res) => {
  const sql = `select * from user `;
  // 执行 SQL 语句，查询用户的数据
  db.query(sql, function (err, results) {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      message: "成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      re: {
        list: results.map((item) => ({
          value: item.usercount,
          text: item.username
        }))
      }
    });
  });
};
