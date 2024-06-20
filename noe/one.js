// 打印测试
console.log("hello None.js")
// 引入mysql模块
const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: '网址'
});

// 连接到数据库
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    // 执行查询
    connection.query('SELECT * FROM usertable', (err, results, fields) => {
        if (err) throw err;
        console.log('Query results: ', results);
    });

    // 关闭连接
    connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL database');
    });
});
