// const moment = require("moment");
// 导入数据库操作模块
const db = require("../db/index");

exports.addZhibao = (req, res) => {
  const {
    patient,
    dateTime,
    orderNo,
    zhibaoDate,
    hospital,
    origin,
    product,
    colorNo,
    top,
    bottom,
    liscens,
    certificate,
    business,
    imgQr
  } = req.body;
  //   const createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  //   const _designList = JSON.stringify(designList);
  const sql = `insert into zhibao (
    patient,
    dateTime,
    orderNo,
    zhibaoDate,
    hospital,
    origin,
    product,
    colorNo,
    top,
    bottom,
    liscens,
    certificate,
    business,
    imgQr
	) values ('${patient}','${dateTime}','${orderNo}','${zhibaoDate}','${hospital}',
    '${origin}','${product}','${colorNo}','${top}','${bottom}','${liscens}','${certificate}','${business}','${imgQr}')`;
  // 更新参数表
  db.query(sql, (err, results) => {
    console.log("id", results);
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("新增失败！");
    res.send({
      code: 0,
      message: "新增信息成功！",
      re: {
        id: results.insertId
      }
    });
    // setTimeout(() => {
    //   const _sql = `select id  from zhibao  where customer_id = '${customer_id}'`;
    //   db.query(_sql, (err, result) => {
    //     // req.app.logger(
    //     //   req.headers.authorization.replace(/Bearer\s/g, ""),
    //     //   `添加${zhibao}质保`
    //     // );
    //     res.send({
    //       code: 0,
    //       message: "新增信息成功！",
    //       re: {
    //         id: result[0].id
    //       }
    //     });
    //   });
    // }, 100);
  });
};

exports.editZhibao = (req, res) => {
  const {
    id,
    patient,
    dateTime,
    orderNo,
    zhibaoDate,
    hospital,
    origin,
    product,
    colorNo,
    top,
    bottom,
    liscens,
    certificate,
    business,
    imgQr
  } = req.body;
  const sql = `update  zhibao set
  patient='${patient}',
  orderNo='${orderNo}',
  zhibaoDate='${zhibaoDate}',
  hospital='${hospital}',
  origin='${origin}',
  product='${product}',
  colorNo='${colorNo}',
  top='${top}',
  bottom='${bottom}',
  liscens='${liscens}',
  certificate='${certificate}',
  business='${business}'
  where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    // req.app.logger(
    //   req.headers.authorization.replace(/Bearer\s/g, ""),
    //   `修改${zhibao}客户`
    // );
    res.send({
      code: 0,
      message: "修改成功！",
      re: {
        id
      }
    });
  });
};

exports.getZhibaoDetailById = (req, res) => {
  const { id } = req.body;
  const sql = `select * from  zhibao where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length)
      res.send({
        code: 0,
        message: "查询成功！",
        data: {
          ...results[0]
        }
      });
  });
};

/**
 * 根据数组对象的某个字段去重
 * item.name  是[{name:1}] 根据每条数据的name值来去重
 * */
const unique = (arr, val) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
};

exports.getZhibaoInfo = (req, res) => {
  const { search } = req.body;

  const sql = ` select i.*   from zhibao i  where i.orderNo = '${search}'`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      message: "查询成功！",
      data: results.length
        ? {
            ...results[0]
          }
        : null
    });
  });
};
exports.getZhibaoList = (req, res) => {
  const { search } = req.body;

  const sql1 = ` select i.*   from zhibao i  where i.patient LIKE "%${search}%"`;
  const sql2 = ` select i.*   from zhibao i where i.orderNo LIKE "%${search}%"`;
  // const sql3 = ` select i.*   from zhibao i where i.doctor LIKE "%${search}%"`;

  // const sql4 = ` select i.*   from zhibao i where i.proxy LIKE "%${search}%"`;

  const p1 = new Promise((resolve, reject) => {
    db.query(sql1, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
  const p2 = new Promise((resolve, reject) => {
    db.query(sql2, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
  // const p3 = new Promise((resolve, reject) => {
  //   db.query(sql3, (err, results) => {
  //     if (err) return reject(err);
  //     resolve(results);
  //   });
  // });
  // const p4 = new Promise((resolve, reject) => {
  //   db.query(sql4, (err, results) => {
  //     if (err) return reject(err);
  //     resolve(results);
  //   });
  // });
  Promise.all([p1, p2])
    .then(async (results) => {
      console.log("results", results);
      const _list = results[0].concat(results[1]);
      const list = unique(_list, "id");
      res.send({
        code: 0,
        message: "查询成功！",
        re: list
      });
    })
    .catch((err) => res.cc(err));
};
