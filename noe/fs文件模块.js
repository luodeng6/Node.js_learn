const fs = require('fs');

// 读取文件内容
fs.readFile('test.txt', 'utf8', function (err, dataStr)  {
    console.log(dataStr);//输出文件内容 如果错误，则为undefined
    console.log(err);//没有错误的话，err为null
});

//或者用箭头函数
fs.readFile('test.txt', 'utf8', (err, dataStr)  => {

    console.log(err);//没有错误的话，err为null
    if (err) {
        console.error("文件读取失败:");
        console.error(err);
        console.error(err.message);
    }else{
        console.log('文件读取成功:');
        console.log(dataStr);//输出文件内容
    }

});

setTimeout(() => {
    // 写入文件内容 文件不存在则创建
    fs.writeFile('write1.txt', 'Hello Node.js!', "utf-8",function (err) {
       if (err){
         return  console.error(err);
       }else {
         return  console.log("文件写入成功!");
       }
    });
}, 1000)

