/*
在 Node.js 中，数据库查询通常是异步操作，因为数据库查询可能涉及网络请求、磁盘读取等耗时操作。
为了避免阻塞主线程和提高应用程序的并发性能，Node.js 使用回调函数或者 Promise/async-await 来处理异步操作。
:description: 查询所有用户和占位符查询、模糊查询、排序查询、分页查询、聚合查询等。
* **/

const  db=require('./connection');


const query = "SELECT * FROM user";
db.query(query, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("查询所有用户：------------------");
    // 正常输出查询结果
    console.log(result);
})


// 占位符查询
const name = "罗邓";
const query2 = "SELECT * FROM user WHERE name =?";
db.query(query2, [name], (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("占位符查询：-----------------");
    console.log(result);
})

//模糊查询
const keyword = "罗";
const query3 = "SELECT * FROM user WHERE name LIKE ?";
db.query(query3, [`%${keyword}%`], (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("模糊查询：------------------");
    console.log(result);
})




/*
//排序查询
const query4 = "SELECT * FROM user ORDER BY id DESC";
db.query(query4, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("排序查询：------------------");
    console.log(result);
})*/



/*

//分页查询
const page = 2;
const pageSize = 5;
const query5 = `SELECT * FROM user LIMIT ${(page - 1) * pageSize}, ${pageSize}`;
db.query(query5, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("分页查询：------------------");
    console.log(result);
})
*/


/*

//聚合查询
const query6 = "SELECT COUNT(*) as total FROM user";
db.query(query6, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    console.log("聚合查询：------------------");
    console.log(result);
})*/
