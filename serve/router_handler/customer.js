/**
create: James
time: 2022.8.21
to:商品
 */

// 导入数据库操作模块
const db = require("../db/index");

// 获取根据商品id轮播图
// exports.getShopCarousel = (req,res) =>{
// 	const params = parseInt(req.query.id)
// 	const sql = 'select * from shopdetailimg where shop_id = ?'
// 	db.query(sql,[params],(err,results)=>{
// 		if(err) return res.lose(err)
// 		res.send({
// 			message:'获取商品详情轮播图数据成功',
// 			success:true,
// 			status:0,
// 			result:results
// 		})
// 	})
// }

// 获取根据商品id商品信息
// exports.getShopInfo = (req,res) =>{
// 	const params = parseInt(req.query.id)
// 	const sql = 'select * from hotshop where id = ?'
// 	db.query(sql,[params],(err,results)=>{
// 		if(err) return res.lose(err)
// 		res.send({
// 			message:'获取商品信息数据成功',
// 			success:true,
// 			status:0,
// 			result:results
// 		})
// 	})
// }

// 获取根据商品id商品信息
exports.addCustomer = (req, res) => {
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
  const sql = `insert into customer (
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
	) values ('${customer}','${dateTime}','${daiyaTime}','${doctor}','${proxy}','${tiepianColor}','${CADImg}','${checiImg}','${CAD}','${checi}','${porcelain}','${frontPhoto}','${adviceContent}','${leftFv}','${rightFv}','${front}','${leftFvEdge}','${rightFvEdge}','${intentImg}','${designAdvice}','${_designList}','${bianyuanOpen}','${bianyuanValue}','${roundOpen}','${roundValue}','${luochaOpen}','${luochaValue}','${angleOpen}','${angleValue}','${jiandunOpen}','${jiandunValue}','${qieduanOpen}','${qieduanValue}','${textureOpen}','${textureValue}','${dotOpen}','${dotValue}','${touliangOpen}','${touliangValue}','${linearOpen}','${linearValue}','${thicknessOpen}','${thicknessValue}')`;
  // 更新参数表
  db.query(sql, req.body, (err, results) => {
    console.log("🚀 ~ db.query ~ results:", err, results);
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('新增失败！')
    res.send({
      code: 200,
      message: "新增信息成功！",
      data: {
        ...results[0]
      }
    });
  });
};

// 获取根据商品id商品信息
exports.editCustomer = (req, res) => {
	const {
		id,
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
			thicknessValue='${thicknessValue}' where id=${id}`
	  // 更新参数表
	  db.query(sql, (err, results) => {
		console.log("🚀 ~ db.query ~ results:", err, results);
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