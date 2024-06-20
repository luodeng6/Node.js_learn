// 导入express模块
const express = require('express');

//创建路由对象
const router = express.Router();


// 挂载具体路由
router.get('/user', (req, res) => {
    console.log("/user的get请求参数如下:")
    console.log(req.query)
    res.send(`hello！ ${req.query.name}`)
})

// 创建用户接口设计 post要从请求体中获取表单数据，这要配置urlencoded中间件 解析表单数据
router.post('/adduser', (req, res) => {
    // 从请求体中获取表单数据
    const formData = req.body;
    console.log(formData)
    res.send({
        code: 0,
        msg: '添加成功params',
        user: JSON.stringify(formData)
    })

})


//导出路由对象
module.exports = router;

