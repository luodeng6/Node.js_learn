const express = require('express');
const session_api =express.Router();
const cookieParser = require('cookie-parser');
const session = require("express-session");

// 使用 cookie-parser 中间件
session_api.use(cookieParser());
// 使用环境变量设置 secret
const sessionSecret = process.env.SESSION_SECRET || 'default-secret-key';


// 配置 session 中间件
session_api.use(session({
    secret: sessionSecret, // 用于加密 session ID 的字符串
    resave: false, // 是否在每次请求时都重新保存 session
    saveUninitialized: true, // 是否在未初始化时保存 session
    cookie: { secure: false } // 设置 cookie 参数，secure: true 需要 HTTPS
}));

// 设置 session 示例
session_api.get('/set-session', (req, res) => {
    req.session.username = '罗邓';
    res.send('Session 已设置');
});
// 读取 session 示例
session_api.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Session 中的用户名是：${req.session.username}`);
    } else {
        res.send('没有找到 session');
    }
});
// 销毁 session 示例
session_api.get('/destroy-session', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('无法销毁 session');
        }
        res.send('Session 已销毁');
    });
});




// 导出 session_api
module.exports = session_api;
