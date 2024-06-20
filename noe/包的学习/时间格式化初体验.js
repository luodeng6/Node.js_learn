
const moment = require('moment');
// 获取时间
const date = moment('2021-08-15 12:00:00', 'YYYY-MM-DD HH:mm:ss');
//获取当前时间
const now = moment();
console.log(now) // 输出：Moment<2024-06-01T10:36:39+08:00>

// 格式化时间
console.log(date.format('YYYY-MM-DD HH:mm:ss')); // 2021-08-15 12:00:00

console.log("当前时间："+now.format('YYYY-MM-DD HH:mm:ss'));
