/*
* :description: 插入数据
* :author: <NAME>
:date: 2021-08-16 14:55:00
* :last_author: <NAME>
:last_edit_time: 2021-08-16 14:55:00
* :description: 各种插入数据的方法，包括单条插入、批量插入、插入并返回主键等
* **/

const db = require("./connection");


/*
// 插入单条数据
db.query(
    "INSERT INTO user(name, username, password) VALUES(?,?,?)",
    ["John Doe", "222", "password123"],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("单条数据插入:------------------");
            console.log("单条数据插入成功");
        }
    }
);*/
const Chance = require('chance');

const chance = new Chance();
// 插入多条数据
const insert_rows = (num = 20) => {
    const values = [];

    for (let i = 0; i < num; i++) {
        values.push([chance.name(), chance.integer({min: 100000000, max: 999999999}).toString(), chance.string({
            length: 8,
            symbols: true
        })])
    }
    db.query("INSERT INTO user (name, username,password) VALUES ?", [values], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        console.log(result);
    })
}


/*
// 插入并返回主键
db.query(
    "INSERT INTO user(name, username, password) VALUES(?,?,?)",
    ["John Doe", "johndoe", "password123"],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("插入并返回主键:---------------------");
            console.log(`1 record inserted with ID: ${result.insertId}`);
        }
    }
);*/

module.exports = {
    insert_rows
};
