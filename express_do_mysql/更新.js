/*
* :* Author: 罗邓
* Date: 2019/12/10
* Time: 15:30:00
* Description: 学习nodejs 更新 mysql数据库 操作
* 文件名：更新.js
* **/

//导入自定义的mysql模块
const db = require('./connection');



//批量更新
function updateMany() {
    let sql = `update user set `;
    let params = [data, where];
    db.query(sql, params, (err, result) => {
            if (err) {
                console.error("更新失败！");
                return console.log(err);
            }
            return console.log(`影响行数：${result.affectedRows}`);
        })
}

// 修改数据
router.get('/updateUser', async (req, res) => {
    const sql = 'update users set userid=?,department_id=? where id=?' // 构建sql语句
    // 执行sql语句
    let ret = await db.query(sql, ['Jerry', 10, 8])
    console.log(ret)
    res.send({
        ok: 1,
    })
})


