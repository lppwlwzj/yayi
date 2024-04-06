/*
create: James
time: 2022.8.4
to:处理首页操作
*/

// 导入数据库操作模块
const db = require("../db/index");

exports.submit = (req, res) => {
  const { customer_id, tryInfo, recoverInfo, imgList } = req.body;
  // 定义sql语句
  const sql = `insert into service (
    customer_id,
    tryInfo,
    recoverInfo,
    imgList
  ) values ('${customer_id}','${tryInfo}','${recoverInfo}','${imgList}') `;
  // 调用db.query()执行sql语句
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    res.send({
      code: 0,
      message: "操作成功！",
      re: {}
    });
  });
};
exports.detail = (req, res) => {
  const { service_id } = req.body;
  // 定义sql语句
  const sql = `select * from service where id=${service_id}`;
  // 调用db.query()执行sql语句
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    res.send({
      code: 0,
      message: "操作成功！",
      re: results[0]
    });
  });
};
// 获取热门商品数据(查询分页)
