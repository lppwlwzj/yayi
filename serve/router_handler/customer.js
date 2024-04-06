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
    linearOpen,
    linearValue,
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
        linearOpen,
        linearValue,
        thicknessOpen,
        thicknessValue
	) values ('${createtime}','${customer_id}','${customer}','${dateTime}','${daiyaTime}','${doctor}','${proxy}','${tiepianColor}','${CADImg}','${checiImg}','${CAD}','${checi}','${porcelain}','${frontPhoto}','${adviceContent}','${leftFv}','${rightFv}','${front}','${leftFvEdge}','${rightFvEdge}','${intentImg}','${designAdvice}','${_designList}','${bianyuanOpen}','${bianyuanValue}','${roundOpen}','${roundValue}','${luochaOpen}','${luochaValue}','${angleOpen}','${angleValue}','${jiandunOpen}','${jiandunValue}','${qieduanOpen}','${qieduanValue}','${textureOpen}','${textureValue}','${dotOpen}','${dotValue}','${touliangOpen}','${touliangValue}','${linearOpen}','${linearValue}','${thicknessOpen}','${thicknessValue}')`;
  // 更新参数表
  db.query(sql, req.body, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("新增失败！");
    res.send({
      code: 200,
      message: "新增信息成功！",
      data: {
        ...results[0]
      }
    });
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
    linearOpen,
    linearValue,
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
			linearOpen='${linearOpen}',
			linearValue='${linearValue}',
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
  //   const _designList = JSON.stringify(designList);
  const sql = `select * from  customer where id=${id}`;
  // 更新参数表
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      code: 0,
      message: "查询成功！",
      data: {
        ...results[0]
      }
    });
  });
};

exports.getCustomerList = (req, res) => {
  const { search } = req.body;
  let sql = "";
  if (isNaN(search) && !isNaN(Date.parse(search))) {
    sql = ` select i.* , s.tryInfo,s.recoverInfo ,s.id as service_id  from customer i JOIN service s ON i.id = s.customer_id where i.dateTime = '${search}'`;
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err);
      res.send({
        code: 0,
        message: "查询成功！",
        re: results
      });
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
        res.send({
          code: 200,
          message: "查询成功！",
          re: list
        });
      })
      .catch((err) => res.cc(err));
  }
};
