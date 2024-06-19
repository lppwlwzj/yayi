/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const axios = require("axios");
const fs = require("fs");
const path = require("path");

//  导入数据库操作模块
const db = require("../db/index");

const bcrypt = require("bcryptjs");

// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

// 导入配置文件
const config = require("../config");

const WXBizDataCrypt = require("../common/WXBizDataCrypt");

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

    req.app.logger(tokenStr, "登录了");

    // 将生成的 Token 字符串响应给客户端
    res.send({
      code: 0,
      message: "登录成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      re: {
        token: "Bearer " + tokenStr,
        userinfo: {
          usercount,
          username,
          password
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

exports.getMiyao = (req, res) => {
  const { login_code } = req.body;
  axios
    .get("https://api.weixin.qq.com/sns/jscode2session", {
      params: {
        appid: "wxde671469f6dd9711", //你的小程序的APPID
        secret: "8163e585493cb7ac881574e1cec415a2", //你的小程序秘钥secret,
        js_code: login_code, //wx.login 登录成功后的code
        grant_type: "authorization_code"
      }
    })
    .then((_res) => {
      res.send({
        code: 0,
        message: "成功！",
        re: _res.data
      });
    })
    .catch((err) => {
      return res.cc(err);
    });
};

exports.jiemi = (req, res) => {
  const {
    appid,
    openid,
    session_key,
    phone_code,
    phone_encryptedData,
    phone_iv
  } = req.body;
  try {
    // 解密需要appid 会话密钥；然后需要手机号的加密字段
    let pc = new WXBizDataCrypt(appid, session_key);
    let data = pc.decryptData(phone_encryptedData, phone_iv);

    res.send({
      code: 0,
      message: "成功！",
      re: data
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.cc(error);
  }
};

const getQrCode = (token, params) => {
  const { page, id } = params;
  return axios
    .post(
      `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`,
      {
        page: page, // 需要打开的页面路径
        scene: `${id}`, // 这个是需要传递的参数
        width: 280,
        check_path: false
      },
      {
        responseType: "arraybuffer"
      }
    )
    .then((res) => {
      // res.data:<Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00> ....
      let src =
        path.dirname(__dirname).replace(/\\/g, "/") +
        `/public/images/zhibao/${id}.png`;
      return new Promise((resolve) => {
        fs.writeFile(src, res.data, function (err) {
          if (err) {
            console.log("生二维码图片失败", err);
          }
          resolve(`https://gdcasa.cn:3010/img/images/zhibao/${id}.png`);
          // resolve(`http://127.0.01:3010/img/images/zhibao/${id}.png`);
        });
      });
    })
    .catch((err) => {
      console.log("生二维码图片失败", err);
    });
};

exports.getAccessToken = (req, res) => {
  axios
    .get("https://api.weixin.qq.com/cgi-bin/token", {
      params: {
        appid: "wxde671469f6dd9711", //你的小程序的APPID
        secret: "8163e585493cb7ac881574e1cec415a2", //你的小程序秘钥secret,
        grant_type: "client_credential"
      }
    })
    .then(async (_res) => {
      const access_token = _res.data.access_token;
      if (access_token) {
        const img = await getQrCode(_res.data.access_token, req.body);
        const sql = `update  zhibao set imgQr='${img}' where id=${req.body.id}`;
        // 更新参数表
        db.query(sql, (err) => {
          if (err) return res.cc(err);
          res.send({
            code: 0,
            message: "成功！",
            re: {
              img
            }
          });
        });
      }
    })
    .catch((err) => {
      return res.cc(err);
    });
};

exports.log = (req, res) => {
  const { usercount } = req.body;
  const _sql = ` SELECT * FROM logger  ORDER BY logtime DESC  LIMIT 100 `;
  const filterSql = ` SELECT * FROM logger  where logcount=${usercount}  ORDER BY logtime DESC  LIMIT 100  `;
  const sql = usercount ? filterSql : _sql;
  // 执行 SQL 语句，查询用户的数据
  db.query(sql, function (err, results) {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      message: "成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      re: {
        list: results
      }
    });
  });
};
