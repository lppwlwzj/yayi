/*
create: James
time: 2022.8.4
to:处理首页操作
*/

// 导入数据库操作模块
const db = require("../db/index");

// const findService = (customer_id) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `select * from service where customer_id='${customer_id}'`,
//       (_err, result) => {
//         if (_err) {
//           return reject(_err);
//         }
//         resolve(result);
//       }
//     );
//   });
// };

exports.submit = async (req, res) => {
  //customer_id 是customer表的主键id
  const { customer_id, service_id, tryInfo, recoverInfo, imgList } = req.body;
  // const _res = await findService(customer_id);
  // console.log("🚀 ~ exports.submit= ~ _res:", _res);
  // // 定义sql语句id
  const insertSql = `insert into service (
      customer_id,
      tryInfo,
      recoverInfo,
      imgList
    ) values ('${customer_id}','${tryInfo}','${recoverInfo}','${imgList}') `;
  const updateSql = imgList
    ? `update service set  imgList = '${imgList}' where id='${service_id}'`
    : `update service set  recoverInfo = '${recoverInfo}',tryInfo='${tryInfo}'  where id='${service_id}' `;
    
  const sql = service_id ? updateSql : insertSql;

  console.log("🚀 ~ exports.submit= ~ sql:", sql);
  // // 调用db.query()执行sql语句
  db.query(sql, async (err, results) => {
    if (err) {
      return res.cc(err);
    }
    console.log("🚀 ~ db.query ~ results:", results);
    res.send({
      code: 0,
      message: "操作成功！",
      re: {
        service_id: results?.insertId || service_id
      }
    });
  });
};

exports.detail = (req, res) => {
  const { service_id } = req.body;
  // 定义sql语句
  const sql = `select * from service where id='${service_id}'`;
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
