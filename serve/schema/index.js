const joi = require('joi')
// 用户名的验证规则
const usercount = joi.string().alphanum().min(1).max(20).required()
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,20}$/)
    .required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        usercount,
        password,
    },
}
