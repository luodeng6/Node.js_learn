const name = "蔡徐坤"
const age = 26
const sex = "男"
const height = 175
const width = 175

const SayHello = () => {
    console.log(`now, it's time to say hello, my name is ${name}, I am ${age} years old, I am a ${sex}, my height is ${height}cm, my width is ${width}cm.`)
}

//导出对象
module.exports = {
    name,
    age,
    sex,
    height,
    width,
    SayHello

};

/*
下面是错误的写法
exports={
    name,
    age,
    sex,
    height,
    width,
    SayHello
}*/

