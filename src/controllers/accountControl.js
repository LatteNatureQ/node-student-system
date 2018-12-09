//控制器处理具体逻辑代码
//导入express模块
const express = require('express')
//调用express方法
const app = express()
//导入path模块
const path = require('path')
//导入captchapng模块
const captchapng = require('captchapng')
//导入工具封装
const mongodbTool = require(path.join(__dirname, '../tools/basetool'))
//返回注册页面
exports.accountRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/register.html'))
}
//注册逻辑
exports.doRegister = (req, res) => {
    const {
        username,
        password
    } = req.body
    const obj = {
        status: 0,
        message: '成功了'
    }
    mongodbTool.findSingle('userInfo', {
        username,
        password
    }, (err, result) => {
        if (result == null) {
            mongodbTool.insertSingle('userInfo', {
                username,
                password
            }, (err, result) => {
                if (result == null) {
                    obj.status = 2,
                        obj.message = '服务器访问失败,请联系网站联系人'
                    res.json(obj)
                }
                obj.status = 0,
                    obj.message = '注册成功'
                // client.close();
                res.json(obj)
            })
        } else {
            obj.status = 1,
                obj.message = '用户名已经存在'
            // client.close();
            res.json(obj)
        }
    })
}
//返回登录页面
exports.loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'))
}
//返回图片验证码
exports.getVcode = (req, res) => {
    let vcode = parseInt(Math.random() * 9000 + 1000)
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
//登录逻辑
exports.login = (req, res) => {
    const {
        username,
        password,
        vcode
    } = req.body
    const obj = {
        status: 0,
        message: '成功了'
    }
    if (vcode != req.session.vcode) {
        obj.status = 2
        obj.message = '请输入正确的验证码'
        res.json(obj)
        return
    }
    mongodbTool.findSingle('userInfo', {username,password}, (err, result) => {
        if (result == null) {
            obj.status = 1
            obj.message = '用户名或密码错误'
            res.json(obj)
        } else {
            req.session.username = username
            obj.status = 0
            obj.message = '登录成功'
            res.json(obj)
        }
    })

}