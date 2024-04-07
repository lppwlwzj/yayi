/**
create: James
time: 2022.8.21
to:商品
 */

const express = require('express')
const router = express.Router()

// 导入使用商品处理模块
const customer_handler = require('../router_handler/customer')

router.post('/add',customer_handler.addCustomer)
router.post('/edit',customer_handler.editCustomer)
router.post('/detail',customer_handler.getCustomerDetailById)
router.post('/list',customer_handler.getCustomerList)
router.post('/delete',customer_handler.deleteCustomer)




module.exports = router