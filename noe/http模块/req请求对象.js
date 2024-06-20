/*
* 以下是一些常见的req对象的属性和方法：
    req.url: 获取请求的URL。
    req.method: 获取HTTP请求方法，例如GET、POST、PUT、DELETE等。
    req.headers: 获取请求头部信息，可以使用req.headers[‘headerName’]的方式获取特定的头部信息。
    req.params: 获取路由参数，例如在Express框架中，可以通过req.params来获取路由中定义的参数。
    req.query: 获取URL中的查询参数，例如在URL中出现的?key1=value1&key2=value2，可以通过req.query来获取这些参数。
* **/

const http = require('http');

// createServer方法接受一个回调函数作为参数，该回调函数将在每个HTTP请求到达服务器时被调用。
const server = http.createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);
  console.log('req.headers:', req.headers);
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  // 获取请求的coookie信息
  console.log('req.headers.cookie:', req.headers.cookie);
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('运行在端口3000: http://localhost:3000/');
});
