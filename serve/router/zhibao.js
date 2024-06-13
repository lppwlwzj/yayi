
/**
create: James
time: 2022.8.21
to:商品
 */

const express = require('express')
const router = express.Router()

// 导入使用商品处理模块
const zhibao_handler = require('../router_handler/zhibao')

router.post('/add',zhibao_handler.addZhibao)
router.post('/edit',zhibao_handler.editZhibao)
router.post('/detail',zhibao_handler.getZhibaoDetailById)
router.post('/list',zhibao_handler.getZhibaoList)
router.post('/query',zhibao_handler.getZhibaoInfo)

// router.post('/delete',zhibao_handler.deleteCustomer)




module.exports = router