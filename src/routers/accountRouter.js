//导入express模块
const express = require('express')
//导入path模块
const path = require('path')
//导入控制器模块
const control = require(path.join(__dirname, '../controllers/accountControl'))
//开启路由
const accountRouter = express.Router()
//返回注册界面
accountRouter.get('/register', control.accountRegister)
//注册逻辑
accountRouter.post('/register', control.doRegister)
//返回登录页面
accountRouter.get('/login', control.loginPage)
//登录逻辑
accountRouter.post('/login',control.login)
//返回验证码图片
accountRouter.get('/vcode', control.getVcode)
//导出路由
module.exports = accountRouter