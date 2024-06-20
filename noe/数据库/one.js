
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
    if (err) {
        console.error('数据库连接失败: ' + err.stack);
        return;
    }
    console.log('链接成功! ID: ' + connection.threadId);
});

// 执行查询操作
connection.query('SELECT * FROM usertable', (error, results, fields) => {
    if (error) throw error;
    console.log('解决查询结果: ', results);
});

// 关闭数据库连接
connection.end((err) => {
    if (err) {
        console.error('关闭数据库连接失败: ' + err.stack);
        return;
    }
    console.log('数据库连接已关闭.');
});
