//导入express模块
const express = require('express')
//创建路由对象
const router = express.Router()
//导入path模块
const path = require('path')
//导入学生界面控制器
const studentControl = require(path.join(__dirname, '../controllers/studentControl'))
//获取学生页面列表
router.get('/list', studentControl.getStudentList)
//获取新增学生页面
router.get('/add',studentControl.getAddPage)
//保存新增页面
router.post('/add',studentControl.addStudent)
//获取编辑学生页面
router.get('/edit/:studentId',studentControl.getEditPage)
//保存编辑
router.post('/edit/:studentId',studentControl.doEdit)
//删除
router.post('/del',studentControl.del)
//登出
router.get('/logout',studentControl.logout)
module.exports = router