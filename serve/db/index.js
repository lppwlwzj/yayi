// // 引入mysql模块
// const mysql = require('mysql')
// // 创建数据库连接对象
// const db = mysql.createPool({
// 	host:'localhost',
// 	user:'root',
// 	password:'password',
// 	port:'3306',
// 	database:'my_shop'
// })
// // 向外共享db数据库对象
// module.exports = db

// //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678'

// 引入mysql模块
const mysql = require('mysql')
// 创建数据库连接对象
const db = mysql.createPool({
	// host:'192.168.4.117',
	host:'127.0.0.1',
    //Mac
	user:'root',
	password:'password',
	//window
	// password:'9699lppwl',
	//宝塔面板
	// user:'yayi_root',
	// password:'123456',
	port:'3306',
	database:'yayi'
})
// 向外共享db数据库对象
module.exports = db                                                                                                                                                                         

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678'