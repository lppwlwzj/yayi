/**
create: James
time: 2022.8.21
to:商品
 */

const express = require('express')
const router = express.Router()

// 导入使用商品处理模块
const customer_handler = require('../router_handler/customer')

// 获取根据商品id轮播图
// router.get('/getShopCarousel',shop_handler.getShopCarousel)

// // 获取根据id商品信息
// router.get('/getShopInfo',shop_handler.getShopInfo)
router.post('/add',customer_handler.addCustomer)

module.exports = router