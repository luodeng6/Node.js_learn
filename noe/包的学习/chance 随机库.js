// 安装 npm install chance --save
const Chance = require('chance');
const chance = new Chance();
console.log("随机生成一个随机数:"+chance.integer()); // 随机生成一个随机数
console.log("随机生成一个名字:"+chance.name()); // 随机生成一个名字

console.log("随机生成一个年龄:"+chance.age()); // 随机生成一个年龄

console.log("随机生成一个生日日期:"+chance.birthday()); // 随机生成一个生日日期

console.log("随机生成一个信用卡类型："+chance.cc()); // 随机生成一个信用卡类型

console.log("随机生成一个货币代码："+chance.currency()); // 随机生成一个货币代码

console.log("随机生成一个美元金额："+chance.dollar()); // 随机生成一个美元金额

console.log("随机生成一个性别："+chance.gender()); // 随机生成一个性别

console.log("随机生成一个GUID："+chance.guid()); // 随机生成一个GUID

console.log("随机生成一个哈希值："+chance.hash()); // 随机生成一个哈希值

console.log("随机生成一个IP地址："+chance.ip()); // 随机生成一个IP地址

console.log("随机生成一个Klout评分："+chance.klout()); // 随机生成一个Klout评分
console.log("随机生成一个密码："+chance.string({ length: 8, symbols: true }))// 随机生成一个密码
console.log("随机生成一个职业:"+chance.profession()); // 随机生成一个职业

/*console.log("随机"chance.email()); // 随机生成一个邮箱地址
console.log(chance.address()); // 随机生成一个地址
console.log(chance.phone()); // 随机生成一个手机号码
console.log(chance.age()); // 随机生成一个年龄
console.log(chance.birthday()); // 随机生成一个生日日期
console.log(chance.cc()); // 随机生成一个信用卡类型
console.log(chance.currency()); // 随机生成一个货币代码
console.log(chance.dollar()); // 随机生成一个美元金额
console.log(chance.gender()); // 随机生成一个性别
console.log(chance.guid()); // 随机生成一个GUID
console.log(chance.hash()); // 随机生成一个哈希值
console.log(chance.ip()); // 随机生成一个IP地址
console.log(chance.klout()); // 随机生成一个Klout评分
console.log(chance.password()); // 随机生成一个密码
console.log(chance.profession()); // 随机生成一个职业
console.log(chance.sentence()); // 随机生成一句话
console.log(chance.tld()); // 随机生成一个顶级域名
console.log(chance.url()); // 随机生成一个URL*/
