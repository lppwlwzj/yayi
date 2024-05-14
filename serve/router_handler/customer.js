/**
create: James
time: 2022.8.21
to:商品
 */
const moment = require("moment");
// 导入数据库操作模块
const db = require("../db/index");

exports.addCustomer = (req, res) => {
  const {
    isPrivacy,
    customer_id,
    customer,
    dateTime,
    daiyaTime,
    doctor,
    proxy,
    tiepianColor,
    CADImg,
    checiImg,
    CAD,
    checi,
    porcelain,
    frontPhoto,
    adviceContent,
    leftFv,
    rightFv,
    front,
    leftFvEdge,
    rightFvEdge,
    intentImg,
    designAdvice,
    designList,
    bianyuanOpen,
    bianyuanValue,
    roundOpen,
    roundValue,
    luochaOpen,
    luochaValue,
    angleOpen,
    angleValue,
    jiandunOpen,
    jiandunValue,
    qieduanOpen,
    qieduanValue,
    textureOpen,
    textureValue,
    dotOpen,
    dotValue,
    touliangOpen,
    touliangValue,
    qieduanLinearsOpen,
    qieduanLinearsValue,
    thicknessOpen,
    thicknessValue
  } = req.body;
  const createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const _designList = JSON.stringify(designList);
  const sql = `insert into customer (
    isPrivacy,
    createtime,
    customer_id,
		customer,
        dateTime,
        daiyaTime,
        doctor,
        proxy,
        tiepianColor,
        CADImg,
        checiImg,
        CAD,
        checi,
        porcelain,
        frontPhoto,
        adviceContent,
        leftFv,
        rightFv,
        front,
        leftFvEdge,
        rightFvEdge,
        intentImg,
        designAdvice,
        designList,
        bianyuanOpen,
        bianyuanValue,
        roundOpen,
        roundValue,
        luochaOpen,
        luochaValue,
        angleOpen,
        angleValue,
        jiandunOpen,
        jiandunValue,
        qieduanOpen,
        qieduanValue,
        textureOpen,
        textureValue,
        dotOpen,
        dotValue,
        touliangOpen,
        touliangValue,
        qieduanLinearsOpen,
        qieduanLinearsValue,
        thicknessOpen,
        thicknessValue
	) values ('${isPrivacy}','${createtime}','${customer_id}','${customer}','${dateTime}','${daiyaTime}','${doctor}','${proxy}','${tiepianColor}','${CADImg}','${checiImg}','${CAD}','${checi}','${porcelain}','${frontPhoto}','${adviceContent}','${leftFv}','${rightFv}','${front}','${leftFvEdge}','${rightFvEdge}','${intentImg}','${designAdvice}','${_designList}','${bianyuanOpen}','${bianyuanValue}','${roundOpen}','${roundValue}','${luochaOpen}','${luochaValue}','${angleOpen}','${angleValue}','${jiandunOpen}','${jiandunValue}','${qieduanOpen}','${qieduanValue}','${textureOpen}','${textureValue}','${dotOpen}','${dotValue}','${touliangOpen}','${touliangValue}','${qieduanLinearsOpen}','${qieduanLinearsValue}','${thicknessOpen}','${thicknessValue}')`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("新增失败！");
    setTimeout(() => {
      const _sql = `select id  from customer  where customer_id = '${customer_id}'`;
      db.query(_sql, (err, result) => {
        console.log('req.app.get("token")', req.app.get("token"));
        req.app.logger(
          req.headers.authorization.replace(/Bearer\s/g, ""),
          `添加${customer}客户`
        );
        res.send({
          code: 0,
          message: "新增信息成功！",
          re: {
            id: result[0].id
          }
        });
      });
    }, 100);
  });
};

exports.editCustomer = (req, res) => {
  const {
    id,
    isPrivacy,
    customer,
    dateTime,
    daiyaTime,
    doctor,
    proxy,
    tiepianColor,
    CADImg,
    checiImg,
    CAD,
    checi,
    porcelain,
    frontPhoto,
    adviceContent,
    leftFv,
    rightFv,
    front,
    leftFvEdge,
    rightFvEdge,
    intentImg,
    designAdvice,
    designList,
    bianyuanOpen,
    bianyuanValue,
    roundOpen,
    roundValue,
    luochaOpen,
    luochaValue,
    angleOpen,
    angleValue,
    jiandunOpen,
    jiandunValue,
    qieduanOpen,
    qieduanValue,
    textureOpen,
    textureValue,
    dotOpen,
    dotValue,
    touliangOpen,
    touliangValue,
    qieduanLinearsOpen,
    qieduanLinearsValue,
    thicknessOpen,
    thicknessValue
  } = req.body;
  const _designList = JSON.stringify(designList);
  const sql = `update  customer set
  isPrivacy='${isPrivacy}',
			customer='${customer}',
			dateTime='${dateTime}',
			daiyaTime='${daiyaTime}',
			doctor='${doctor}',
			proxy='${proxy}',
			tiepianColor='${tiepianColor}',
			CADImg='${CADImg}',
			checiImg='${checiImg}',
			CAD='${CAD}',
			checi='${checi}',
			porcelain='${porcelain}',
			frontPhoto='${frontPhoto}',
			adviceContent='${adviceContent}',
			leftFv='${leftFv}',
			rightFv='${rightFv}',
			front='${front}',
			leftFvEdge='${leftFvEdge}',
			rightFvEdge='${rightFvEdge}',
			intentImg='${intentImg}',
			designAdvice='${designAdvice}',
			designList='${_designList}',
			bianyuanOpen='${bianyuanOpen}',
			bianyuanValue='${bianyuanValue}',
			roundOpen='${roundOpen}',
			roundValue='${roundValue}',
			luochaOpen='${luochaOpen}',
			luochaValue='${luochaValue}',
			angleOpen='${angleOpen}',
			angleValue='${angleValue}',
			jiandunOpen='${jiandunOpen}',
			jiandunValue='${jiandunValue}',
			qieduanOpen='${qieduanOpen}',
			qieduanValue='${qieduanValue}',
			textureOpen='${textureOpen}',
			textureValue='${textureValue}',
			dotOpen='${dotOpen}',
			dotValue='${dotValue}',
			touliangOpen='${touliangOpen}',
			touliangValue='${touliangValue}',
			qieduanLinearsOpen='${qieduanLinearsOpen}',
			qieduanLinearsValue='${qieduanLinearsValue}',
			thicknessOpen='${thicknessOpen}',
			thicknessValue='${thicknessValue}' where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    // const
    req.app.logger(
      req.headers.authorization.replace(/Bearer\s/g, ""),
      `修改${customer}客户`
    );
    res.send({
      code: 0,
      message: "修改成功！",
      re: {
        id
      }
    });
  });
};

exports.getCustomerDetailById = (req, res) => {
  const { id } = req.body;
  const sql = `select * from  customer where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length)
      db.query(
        `select s.id as service_id  from  customer i JOIN service s ON i.id = s.customer_id  where i.id=${id}`,
        (_err, _results) => {
          if (_err) return res.cc(_err);
          res.send({
            code: 0,
            message: "查询成功！",
            data: {
              service_id: _results[0]?.service_id || "",
              ...results[0]
            }
          });
        }
      );
  });
};
exports.deleteCustomer = (req, res) => {
  const { id } = req.body;
  const sql = `delete  from  customer where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    req.app.logger(
      req.headers.authorization.replace(/Bearer\s/g, ""),
      `删除客户`
    );

    res.send({
      code: 0,
      message: "删除成功！",
      re: {}
    });
  });
};
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

/**
 * 根据数组对象的某个字段去重
 * item.name  是[{name:1}] 根据每条数据的name值来去重
 * */
const unique = (arr, val) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
};

const getServiceInfo = (customer_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select  tryInfo,recoverInfo ,id as service_id  from  service  where customer_id = ${customer_id}`,
      (err, results) => {
        if (err) return reject(err);
        if (!results.length) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

exports.getCustomerList = (req, res) => {
  const { search } = req.body;
  let sql = "";
  if (isNaN(search) && !isNaN(Date.parse(search))) {
    // sql = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id  where i.dateTime = '${search}'`;
    sql = ` select i.*  from customer i where i.dateTime = '${search}'`;

    db.query(sql, req.body, async (err, results) => {
      if (err) return res.cc(err);
      if (results.length) {
        await asyncForEach(results, async (item, index) => {
          var serviceInfo = await getServiceInfo(results[index].id);
          results[index] = serviceInfo
            ? {
                ...results[index],
                ...serviceInfo
              }
            : results[index];
        });
      }
      res.send({
        code: 0,
        message: "查询成功！",
        re: results
      });
    });
  } else {
    // const sql1 = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id where i.customer LIKE "%${search}%"`;
    // const sql2 = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id where i.porcelain LIKE "%${search}%"`;

    const sql1 = ` select i.*   from customer i  where i.customer LIKE "%${search}%"`;
    const sql2 = ` select i.*   from customer i where i.porcelain LIKE "%${search}%"`;
    const sql3 = ` select i.*   from customer i where i.doctor LIKE "%${search}%"`;

    const sql4 = ` select i.*   from customer i where i.proxy LIKE "%${search}%"`;

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
    const p3 = new Promise((resolve, reject) => {
      db.query(sql3, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    const p4 = new Promise((resolve, reject) => {
      db.query(sql4, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    Promise.all([p1, p2,p3,p4])
      .then(async (results) => {
        const _list = results[0].concat(results[1]).concat(results[2]).concat(results[3]);
        const list = unique(_list, "id");
        if (list.length) {
          await asyncForEach(list, async (item, index) => {
            var serviceInfo = await getServiceInfo(list[index].id);
            list[index] = serviceInfo
              ? {
                  ...list[index],
                  ...serviceInfo
                }
              : list[index];
          });
        }
        res.send({
          code: 0,
          message: "查询成功！",
          re: list
        });
        // if (!list.length) {
        //   db.query(
        //     `select * from customer  where dateTime = '${search}'`,
        //     (_err, _results) => {
        //       if (_err) return res.cc(_err);
        //       res.send({
        //         code: 0,
        //         message: "查询成功！",
        //         re: _results
        //       });
        //     }
        //   );
        // } else {
        //   res.send({
        //     code: 0,
        //     message: "查询成功！",
        //     re: list
        //   });
        // }
      })
      .catch((err) => res.cc(err));
  }
};
