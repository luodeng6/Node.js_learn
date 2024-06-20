const express = require('express');
const res = require("express/lib/response");
const goods_api = express.Router();
// 连接数据库
const db = require("../connection");

/*
    自定义中间件函数
    使用自定义中间件
    调用next()来继续处理请求
*/
function goodsMiddleware(req, res, next) {
    console.log('goods_api: 自定义中间件被调用');
    next();
}

// 注册中间件
goods_api.use(goodsMiddleware)

/*
* :分页函数
* **/
function paginate(items, currentPage, pageSize) {
    // 计算起始索引和结束索引
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // 返回当前页的数据
    return items.slice(startIndex, endIndex);
}


/*
 商品列表接口：/api/goods_api/getGoodsList？page=1&limit=10?key=xxx
* 商品列表接口:
* :param page: 页码
* :param limit: 每页数量
* :param key: 关键字搜索
* :return: 商品列表数据
* **/
goods_api.get('/getGoodsListByKey', (req, res) => {
    let is_all_return = false
    // 判断请求体中是否包含 username 和 password
    if (!req.query.page || !req.query.limit) {
        is_all_return = true;
        console.log('请求参数中不包含 page 或 limit 参数')
    }


    // 获取参数
    let {page, limit, keyword} = req.query;
    console.log(req.query);

    if (!req.body.keyword) {
        keyword = ''
    }
    const query3 = "SELECT * FROM goods_data WHERE title LIKE ?";
    db.query(query3, [`%${keyword}%`], (err, result) => {
        if (err) {
            console.log(err.message);
            res.send({
                code: 500,
                message: '服务器内部错误'
            })
        }

        // 返回全部数据
        if (is_all_return) {
            res.send({
                code: 200,
                length: result.length,
                keyword: keyword,
                result: true,
                data: result
            })
        } else {
            res.send({
                code: 200,
                length: limit,
                keyword: keyword,
                result: true,
                data: paginate(result, parseInt(page), parseInt(limit)),
            })
        }
    })
})


module.exports = goods_api

