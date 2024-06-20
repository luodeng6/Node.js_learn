//导入http模块
const http = require('http');

//创建http服务器
const server = http.createServer();

//为服务器绑定request事件处理函数
server.on('request', (req, res) => {
    console.log('收到请求!url:'+req.url+" method:"+req.method.toUpperCase());
    console.log(req.url);

    //根据请求url设置响应内容
    if(req.url === '/index.html'){
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('<h1 style="color:red">Hello, Node.js!</h1>');
    }else{
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('Hello, Node.js!');
    }

  /*
   //请求头信息： console.log(req.headers);
    //设置响应头  text/html;charset=utf-8：表示响应内容为html格式，字符集为utf-8
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    //设置响应内容
    res.end('Hello, Node.js!');
    */
});



// 监听端口 并启动服务器
const port = 80;
server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`);
});



