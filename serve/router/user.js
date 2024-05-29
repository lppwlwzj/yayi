
const express = require('express')
const router = express.Router()
// 导入并使用首页处理函数
const user_handler = require('../router_handler/user')

//TODO:校验
// // 1. 导入验证表单数据的中间件
// const expressJoi = require('@escook/express-joi')

// // 2. 导入需要的验证规则对象
// const { reg_login_schema } = require('../schema/index')

router.post('/login',user_handler.login)
router.post('/list',user_handler.list)
router.post('/getmiyao',user_handler.getMiyao)
router.post('/jiemi',user_handler.jiemi)


router.post('/log',user_handler.log)



module.exports = router