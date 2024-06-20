const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// 配置中间件以解析JSON数据=>请求体中的数据
app.use(bodyParser.json());

//导入和注册 路由模块=>自定义模块要用./导入！
const api = require('./api/api');
const session_api = require('./session/session_api');
const goods_api = require('./api/goods_api');
const JiaoShu_api = require('./api/教书先生api');

//注册路由=>访问时：http://localhost:3000/api/login，实际上访问的是./api/api.js中的login方法
app.use("/api", api);
app.use("/session", session_api);
app.use("/goods", goods_api);
app.use("/jiaoshu", JiaoShu_api)



// 开放静态资源
// app.use("/static",express.static('static'));
app.use(express.static('static'));


const port = 3000;
// 这里是监听端口，启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}：http://localhost:${port}/`);
});
