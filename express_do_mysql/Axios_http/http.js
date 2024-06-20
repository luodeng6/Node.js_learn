const axios = require('axios');

/*
 在 Node.js 中发送 GET 请求通常使用内置的 http 或 https 模块，
 或者使用更方便的第三方模块如 axios 或 node-fetch。
 */
axios.get("https://api.oioweb.cn/api/common/yiyan")

    .then(res => {
        console.log(res.data);
    }).catch(err => {
    console.log(err);
})

//axios携带请求头
/*

axios.get("https://api.oioweb.cn/api/common/weibo", {
    headers: {
        'Authorization': 'Bearer '
    }
}).then(res => {
    console.log(res.data);
}).catch(err => {
    console.log(err);
})
*/

//axios发送POST请求
const formData = new FormData();
formData.append('usertext', "888");
formData.append('passwordtext', "123");
formData.append('isBaoCunSession', "1");

axios.post("https://www.dengeilish.top/do/loginDO.php", formData).then(res => {
    console.log(res.data);
}).catch(err => {
    console.log(err);
})

