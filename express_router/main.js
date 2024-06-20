//导入express模块
const express = require('express');
const app = express();

// 配置urlencoded中间件 解析表单数据
app.use(express.urlencoded({ extended: false }));

//导入和注册 路由模块
const indexRouter = require('./router/router');

//注册路由
app.use("/api",indexRouter);

// 导出静态资源
app.use( express.static('public'))

//注册全局中间件 ---上游
app.use(function(req, res, next) {
    console.log('Time:', Date.now()+'--获得了请求！请求的url是：'+req.url);
    next();//继续执行后续中间件
});


app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
