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
	) values ('${createtime}','${customer_id}','${customer}','${dateTime}','${daiyaTime}','${doctor}','${proxy}','${tiepianColor}','${CADImg}','${checiImg}','${CAD}','${checi}','${porcelain}','${frontPhoto}','${adviceContent}','${leftFv}','${rightFv}','${front}','${leftFvEdge}','${rightFvEdge}','${intentImg}','${designAdvice}','${_designList}','${bianyuanOpen}','${bianyuanValue}','${roundOpen}','${roundValue}','${luochaOpen}','${luochaValue}','${angleOpen}','${angleValue}','${jiandunOpen}','${jiandunValue}','${qieduanOpen}','${qieduanValue}','${textureOpen}','${textureValue}','${dotOpen}','${dotValue}','${touliangOpen}','${touliangValue}','${qieduanLinearsOpen}','${qieduanLinearsValue}','${thicknessOpen}','${thicknessValue}')`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("新增失败！");
    setTimeout(() => {
      const _sql = `select id  from customer  where customer_id = '${customer_id}'`;
      db.query(_sql, (err, result) => {
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
    res.send({
      code: 200,
      message: "修改成功！",
      data: {
        ...results[0]
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
    res.send({
      code: 0,
      message: "删除成功！",
      re: {}
    });
  });
};
const getRoot = () => {
  return new Promise((resolve, reject) => {
    db.query("select  root from preinstall", (err, results) => {
      console.log(results);
      if (err) return reject(err);
      resolve(results);
    });
  });
};
exports.getCustomerList = (req, res) => {
  const userinfo =  req.app.get("userinfo")
  console.log("🚀 ~ userinfo:", userinfo)
  const { search } = req.body;
  let sql = "";
  if (isNaN(search) && !isNaN(Date.parse(search))) {
    sql = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id  where i.dateTime = '${search}'`;
    
    db.query(sql, req.body,  (err, results) => {
      if (err) return res.cc(err);
      // const root = await getRoot();
      // console.log("🚀 ~ db.query ~ root:", root)
      if (!results.length) {
        db.query(
          `select * from customer  where dateTime = '${search}'`,
          (_err, _results) => {
            if (_err) return res.cc(_err);
            res.send({
              code: 0,
              message: "查询成功！",
              re: _results
            });
          }
        );
      } else {
        res.send({
          code: 0,
          message: "查询成功！",
          re: results
        });
      }
    });
  } else {
    const sql1 = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id where i.customer LIKE "%${search}%"`;
    const sql2 = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id where i.porcelain LIKE "%${search}%"`;
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
    Promise.all([p1, p2])
      .then((results) => {
        const list = results[0].concat(results[1]);
        if (list.length) {
          db.query(
            `select * from customer  where dateTime = '${search}'`,
            (_err, _results) => {
              if (_err) return res.cc(_err);
              res.send({
                code: 0,
                message: "查询成功！",
                re: _results
              });
            }
          );
        } else {
          res.send({
            code: 200,
            message: "查询成功！",
            re: list
          });
        }
      })
      .catch((err) => res.cc(err));
  }
};
