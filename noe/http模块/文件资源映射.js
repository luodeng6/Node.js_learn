const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
    /*
     console.log("获取当前目录如下：");
     console.log(__dirname);
     */

    // 设置响应头
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    let return_content;
    let fpath = path.join(__dirname, 'view/404.html');

    if (req.url === '/' || req.url === '/index.html' || req.url === '/index') {
        fpath = path.join(__dirname, 'view/yuzhou.html');
        return_content = fs.readFileSync(fpath, 'utf-8');
        res.end(return_content);
    } else {
        return_content = fs.readFileSync(fpath, 'utf-8');
        res.end(return_content);
    }


});

const port = 8084;
server.listen(port, () => {
    console.log(`服务器启动成功，监听端口${port}，请访问 http://localhost:${port}/`);
});
