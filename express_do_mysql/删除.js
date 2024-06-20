const db = require("./connection");

// 1.单条删除
const delete_user_by_id = (id) => {
    db.query("DELETE FROM user WHERE id =?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if (result.affectedRows === 1) {
                console.log("删除成功");
            } else {
                console.log("删除失败");
            }
        }
    });
}


// 2.批量删除 -> ${idsToDelete.join(",")} 将 id 数组转换为逗号分隔的字符串
const delete_users_by_id = (idsToDelete) => {
    db.query(`DELETE FROM user WHERE id IN (${idsToDelete.join(",")})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if (result.affectedRows > 0) {
                console.log("批量删除成功");
            } else {
                console.log("批量删除失败");
            }
        }

    });
}

/*
// 3.测试--删除单条数据
delete_user_by_id(19);*/


/*

// 4.测试--删除批量数据
delete_users_by_id([21, 23]);
*/



