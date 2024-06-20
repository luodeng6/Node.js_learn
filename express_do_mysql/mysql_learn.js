const db = require("./connection");



//2.数据库插入
const insertsql = "INSERT INTO user (username, password,name) VALUES ('Tom', 123456, 'Tom')";
db.query(insertsql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    // 正常输出插入结果:
    /**
     OkPacket {
     fieldCount: 0,
     affectedRows: 1,
     insertId: 5,
     serverStatus: 2,
     warningCount: 0,
     message: '',
     protocol41: true,
     changedRows: 0
     }
     * */
    console.log(result);
})

//2.1 批量插入
const insertsql = "INSERT INTO user (username, password,name) VALUES ?";
const values = [
    ['Tom', 123456, 'Tom'],
    ['Jerry', 654321, 'Jerry'],
    ['Lily', 987654, 'Lily']
];
db.query(insertsql, [values], (err, result) => {
    if (err) {
        console.log(err.message);
    }
    // 正常输出插入结果:
    /**
     OkPacket {
     fieldCount: 0,
     affectedRows: 3,
     insertId: 0,
     serverStatus: 2,
     warningCount: 0,
     message: '',
     protocol41: true,
     changedRows: 0
     }
     * */
    console.log(result);
})

/*
//3.数据库更新
const updatesql = "UPDATE user SET age = 26 WHERE name = 'Tom'";
db.query(updatesql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    // 正常输出更新结果
    console.log(result);
})*/

/*

//4.数据库删除
const deletesql = "DELETE FROM user WHERE name = 'Tom'";
db.query(deletesql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
    // 正常输出删除结果
    console.log(result);
})
*/
