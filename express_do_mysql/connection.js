//导入mysql模块
const mysql = require('mysql');
// 建立与mysql服务器的连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
    port: 3306,
    database: 'node_mysql'
});

/*// 连接数据库
connection.connect((err) => {
    if (err) {
        console.error('error connecting:'+ err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});*/


// 导出连接对象
module.exports = connection;
