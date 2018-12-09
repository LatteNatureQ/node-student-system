//导入express模块
const express = require('express')
//导入path模块
const path = require('path')
//导入工具模块
const tool = require(path.join(__dirname, '../tools/basetool'))
//获取学生列表信息 兼 查找功能
exports.getStudentList = (req, res) => {
    const {
        name
    } = req.query
    tool.findAll('studentInfo', {
        name: {
            $regex: name || ''
        }
    }, (err, result) => {
        console.log(result)
        res.render(path.join(__dirname, '../statics/views/list.html'), {
            list: result,
            username:req.session.username
        });
    })

}
//获取新增页面
exports.getAddPage = (req, res) => {
    res.render(path.join(__dirname, '../statics/views/add.html'), {username:req.session.username})
}
//新增学生
exports.addStudent = (req, res) => {
    tool.insertSingle('studentInfo', req.body, (err, result) => {
        if (result == null) {
            res.send(`<script>alert('新增失败')</script>`)
        } else {
            res.send(`<script>location.href='/student/list'</script>`)
        }
    })
}
//获取编辑学生页面
exports.getEditPage = (req, res) => {
    const {
        studentId
    } = req.params
    const _id = tool.findId(studentId)
    tool.findAll('studentInfo', {
        _id
    }, (err, result) => {
        result[0].username = req.session.username
        res.render(path.join(__dirname, '../statics/views/edit.html'), result[0])
    })

}
//保存编辑
exports.doEdit = (req, res) => {
    const {
        studentId
    } = req.params
    const _id = tool.findId(studentId)
    tool.updateSingle('studentInfo', {
        _id
    }, {
        $set: req.body
    }, (err, result) => {
        if (result == null) {
            res.send(`<script>alert('保存失败')</script>`)
        } else {
            res.send(`<script>location.href='/student/list'</script>`)
        }
    })
}
//删除
exports.del = (req, res) => {
    const _id = tool.findId(req.body._id)
    tool.delSingle('studentInfo', {
        _id
    }, (err, result) => {
        if (result == null) {
            res.send('error')
        } else {
            res.send('ok')
        }
    })
}
//登出
exports.logout = (req, res) => {
    req.session.username = null
    res.send(`<script>location.href='/account/login'</script>`)
}