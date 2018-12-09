//导入express模块
const express = require('express')
//导入path模块
const path = require('path')
//导入body-parser模块
const bodyParser = require('body-parser')
//导入express-session模块
const session = require('express-session')
//调用express方法
const app = express()

app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// 解析 application/json
app.use(bodyParser.json())
//调用方法实现静态页面的托管
app.use(express.static(path.join(__dirname, 'statics')))
//导入accountRouter路由
const account = require(path.join(__dirname, 'routers/accountRouter.js'))
//导入studentRouter路由
const student = require(path.join(__dirname, './routers/studentRouter'))
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else {
        if(req.session.username){
            next()
        }else {
            res.send(`<script>alert('请先登录');location.href='/account/login'</script>`)
        }
    }
})
//使用accountRouter路由
app.use('/account', account)
//使用studentRouter路由
app.use('/student', student)



//开启服务
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        throw err
        return
    }
    console.log('127.0.0.1:3000/')
})