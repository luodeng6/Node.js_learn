const express = require('express');
const db = require("../connection");
const api = express.Router();
const charu = require('../插入.js');
const cookieParser = require('cookie-parser');


// 使用 cookie-parser 中间件
api.use(cookieParser());

// 设置一个 cookie
api.get('/setcookie', (req, res) => {
    // cookie 有效期为 15 分钟
    // httpOnly 选项设置为 true，可以防止客户端 JavaScript 代码获取 cookie
    res.cookie('username', '罗邓', {maxAge: 900000, httpOnly: true});
    res.send('Cookie has been set');
});

// 读取 cookies
api.get('/getcookie', (req, res) => {
    let username = req.cookies.username;
    if (username) {
        res.send(`Hello, ${username}`);
    } else {
        res.send('没有cookie has been set');
    }
});

// 清除 cookie
api.get('/clearcookie', (req, res) => {
    res.clearCookie('username');
    // 获取username的值
    let username = req.cookies.username;
    res.send({
        message: '注销成功！',
        code: 200,
        result: true,
        username: username
    });
});


/*
    自定义中间件函数
    使用自定义中间件
    调用next()来继续处理请求
    :如果没有登录，就不允许访问api接口->401
*/
function loggerMiddleware(req, res, next) {
    console.log(`请求路径: ${req.path}, 请求方法: ${req.method}`);//请求路径和请求方法
    console.log(req.headers);//请求头
    console.log("cookie: " + req.headers.cookie);//cookie
    // console.log(req.headers.cookies['Webstorm-be5722ba']);//获取cookie中的参数
    console.log(req.query);//查询参数
    console.log(req.body);//请求体

    if (req.path !== '/login' && req.path !== '/checkuser' && req.path !== '/register') {
        let username = req.cookies.username;
        if (!username) {
            res.status(401).send({
                message: "请先登录！",
                code: 401,
                data: [],
                result: false,
            });
        } else {
            next();
        }
    } else {
        // 登录接口不需要验证
        next();
    }
}

// 注册自定义中间件->loggerMiddleware函数用于处理
api.use(loggerMiddleware)

// 获取用户名接口
api.get('/getusername', (req, res) => {
    res.send({
        message: '获取成功！',
        code: 200,
        username: req.cookies.username,
        result: true
    });
})

api.get('/getuser', (req, res) => {
    console.log("查询关键字：" + req.query.username);
    // 查询数据库获取用户信息
    db.query('SELECT * FROM user WHERE username LIKE ?', ['%' + req.query.username + '%'], (err, result) => {
        if (err) {
            // 处理错误情况
            console.error(err);
            res.status(500).send({
                message: err.message,
                code: 500,
                data: [],
                length: 0
            });
        } else {
            if (result.length > 0) {
                // 用户存在，返回用户信息
                // const user = result[0];
                res.send({
                    message: '数据获取成功！',
                    code: 200,
                    length: result.length,
                    data: result
                });
            } else {
                // 用户不存在
                res.send({
                    message: '用户不存在！',
                    code: 200,
                    length: 0,
                    data: []
                });
            }
        }
    });
});


//删除用户接口
api.post('/deleteuser', (req, res) => {
    let delete_ids = Array()
    req.body.forEach(item => {
        delete_ids.push(item.id);
    });
    console.log("要删除的id数组：");
    console.log(delete_ids);

    //删除用户信息
    db.query(`DELETE FROM user WHERE id IN (${delete_ids.join(",")})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send({
                    message: '删除成功！',
                    code: 200,
                    result: true
                });
            } else {
                res.status(200).send({
                    message: '删除失败！数据不存在',
                    code: 200,
                    result: false
                });
            }
        }
    });
});


//插入用户接口
api.get('/insertusers', (req, res) => {
    try {
        charu.insert_rows(req.query.num);
        res.status(200).send({
            message: '插入成功！',
            code: 200,
            result: true,
            num: req.query.num
        });
        console.log("插入成功！");
        console.log(req.query.num);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: '插入失败！',
            code: 500,
            result: false,
            num: req.query.num
        });
    }
});


// 登录接口
api.post('/login', (req, res) => {
    // 判断请求体中是否包含 username 和 password
    if (!req.body.username || !req.body.password) {
        res.status(200).send({
            message: "接口参数错误！请检查请求体中是否包含 username 和 password！",
            code: 202,
            data: [],
            result: false,
        });
    }
    console.log("_________");
    console.log(req.body);
    console.log("@api/login.js 登录接口：");
    const {username, password} = req.body;
    console.log("登录用户名：" + req.body.username);
    console.log("登录密码：" + req.body.password);
    // 查询数据库获取用户信息
    db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            // 处理错误情况
            console.error(err);
            res.status(500).send({
                message: "后端错误：" + err.message,
                code: 500,
                data: [],
                length: 0
            });
        } else {
            if (result.length > 0) {
                //没有cookie，设置cookie
                if (!req.cookies.username) {
                    // 用户存在，设置 cookie
                    res.cookie('username', username, {maxAge: 900000, httpOnly: true});
                }
                // 返回用户信息
                res.send({
                    message: '登录成功！',
                    code: 200,
                    data: req.body,
                    result: true
                });
            } else {
                // 用户不存在
                res.status(200).send({
                    message: '用户名或密码错误！',
                    code: 200,
                    data: req.body,
                    result: false
                });
            }
        }
    });
});

/**
 * ：检查用户是否存在的接口->此接口无需登录即可访问，开放中间件
 * :param req 请求对象
 * :param res 响应对象
 * :param next 继续处理请求的函数
 * */

api.post('/checkuser', (req, res, next) => {
    // 判断请求体中是否包含 username 和 password
    if (!req.body.username) {
        res.status(200).send({
            message: "接口参数错误！请检查请求体中是否包含 username！",
            code: 202,
            data: [],
            result: false,
        });
    }
    console.log("_________");
    console.log(req.body);
    console.log("@api/checkuser.js 检查用户是否存在接口：");
    const {username} = req.body;
    console.log("检查用户名是否存在：" + req.body.username);
    // 查询数据库获取用户信息
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, result) => {
        if (err) {
            // 处理错误情况
            console.error(err);
            res.status(500).send({
                message: "后端错误：" + err.message,
                code: 500,
                data: [],
                length: 0
            });
        } else {
            console.log(result);
            if (result.length > 0) {
                // 用户存在，返回用户信息
                res.send({
                    message: '用户存在！',
                    code: 200,
                    data: req.body,
                    result: true
                });
            } else {
                // 用户不存在
                res.status(200).send({
                    message: '用户不存在！',
                    code: 200,
                    data: req.body,
                    result: false
                });
            }
        }
    });
});


/**
 *  /api/register
 * ：注册接口->此接口无需登录即可访问，开放中间件
 * :param req 请求对象
 * :param res 响应对象
 * :param next 继续处理请求的函数
 * */

api.post('/register', (req, res, next) => {
    // 判断请求体中是否包含 username 和 password
    if (!req.body.username || !req.body.password || !req.body.name) {
        res.status(200).send({
            message: "接口参数错误！请检查请求体中是否包含 username 和 password！",
            code: 202,
            data: [],
            result: false,
        });
    }
    console.log("_________");
    console.log(req.body);
    console.log("@api/register.js 注册接口：");
    const {username, password, name} = req.body;
    console.log("注册用户名：" + req.body.username);
    console.log("注册密码：" + req.body.password);
    console.log("注册姓名：" + req.body.name);

    // 查询数据库获取用户信息
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, result) => {
        if (err) {
            // 处理错误情况
            console.error(err);
            res.status(500).send({
                message: "后端错误-查询错误：" + err.message,
                code: 500,
                data: [],
                length: 0
            });
        } else {
            if (result.length > 0) {
                // 用户已存在
                res.status(200).send({
                    message: '用户名已存在！',
                    code: 200,
                    data: req.body,
                    result: false
                });
            } else {
                // 用户不存在，插入用户信息
                db.query('INSERT INTO user (username, password, name) VALUES (?, ?, ?)', [username, password, name], (err, result) => {
                    if (err) {
                        // 处理错误情况
                        console.error(err);
                        res.status(500).send({
                            message: "后端错误-插入错误：" + err.message,
                            code: 500,
                            data: [],
                            length: 0
                        });
                    } else {
                        // 插入成功，返回用户信息
                        res.send({
                            message: '注册成功！',
                            code: 200,
                            data: req.body,
                            result: true,
                        });
                    }
                });
            }
        }
    });
});

module.exports = api;
