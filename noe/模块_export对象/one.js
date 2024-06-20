const name = "罗邓";
const age = 28;

const add = (a, b) => a + b;
const sayHello = (name) => {
    console.log("Hello, " + name + "!");
}

//导入模块时，会执行模块中的代码，然后导出模块中的变量和函数
console.log("加载了数据！");

module.exports.name = name;
module.exports.age = age;
module.exports.sayHelloName = sayHello;


//默认只能在当前模块中使用，不能在其他模块中使用，需要导出才能在其他模块中使用


// 会覆盖掉其他模块的 exports 对象 ,导入的结果只以module.exports指向的对象为准
module.exports = {
    name: "陈洁梅",
    age: 22,
    Jian: (a, b) => a - b,
}
