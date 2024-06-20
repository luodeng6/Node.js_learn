// 关于express的使用
// 1. 安装express
// npm install express --save
// 2. 导入express
// 导入express模块
const express = require('express');
// 创建一个express 服务器实例
const app = express();


// 设置服务器监听的端口号：设置一个变量 port，它的值取决于环境变量 process.env.PORT 是否存在。
// 如果环境变量 process.env.PORT 存在并且有值（非空），那么 port 的值将是 process.env.PORT 的值；
// 否则，port 的值将是 3000。
const port = process.env.PORT || 3000;


// 监听端口
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// 监听get请求 获取参数 http://localhost:3000/response?name=luodeng&age=21&sex=man
app.get('/name', (req, res) => {
    console.log(req.query);
    console.log(req.query.name);
    res.send('Hello World!');
});


//测试响应 通过send方法返回响应数据
// http://localhost:3000/response?name=luodeng&age=21&sex=man
app.get('/response', (req, res) => {
    console.log(req.query);
    console.log(Array(1, 2, 3));
    res.send(Array(1, 2, 3));

    // res.send(req.query);// json格式数据
});


// 动态参数有三种类型：
// 1. 路径参数：/:param
// 2. 查询字符串参数：?param=value
// 3. 请求体参数：在请求体中以 JSON 格式发送

// 路径参数 : http://localhost:3000/users/2
app.get('/users/:id', (req, res) => {
    console.log(req.params);
    res.send(`hello user${req.params.id}`);
})

/*//导入执行静态文件开放脚本
require('./static')*/

//开放public目录  http://localhost:3000/index.html  "/public" 挂载路径前缀
app.use("/public",express.static('./public')); //http://localhost:3000/public/index.html





