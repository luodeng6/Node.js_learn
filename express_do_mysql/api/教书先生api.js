const express = require('express');
// 创建路由
const JiaoShuApi = express.Router();

// 导入axios
const axios = require('axios');


/**
 * 返回格式：{
 {
 "code": 200,
 "result": {
 "start": "222.84.14.8",
 "end": "222.84.19.105",
 "addr": [
 "广西南宁市西乡塘区",
 "电信"
 ],
 "disp": "广西南宁市西乡塘区 电信"
 },
 "msg": "success"
 }
 * :param ipaddress 要查询的ip地址
 * :return 查询到的ip地址信息
 * ip地址查询api
 * */
async function getapi(ipaddress) {
    try {
        const response = await axios.get("https://api.oioweb.cn/api/ip/ipaddress?ip=" + ipaddress);
        console.log("ip地址查询成功：");
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return {msg: "数据获取失败！"};
    }
}

/*
:返回格式：
    {
      "code": 200,
      "result": {
        "areaCode": "0771",
        "provCode": "450000",
        "city": "南宁市",
        "cityCode": "450100",
        "num": 1919587,
        "name": "电信",
        "postCode": "530000",
        "type": 2,
        "prov": "广西"
      },
      "msg": "success"
    }
* :param phoneNumber 要查询的手机号码
* :return 查询到的手机号码归属地信息
* 手机号码归属地查询api:
* **/
async function getphoneapi(phoneNumber) {
    try {
        const response = await axios.get("https://api.oioweb.cn/api/common/teladress?mobile=" + phoneNumber)
        console.log("手机号码归属地查询成功：");
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return {msg: "数据获取失败！", result: false, code: 500};
    }
}

// 路由配置
JiaoShuApi.get('/ipaddress', async (req, res) => {
    const ipaddress = req.query.ipaddress;
    const result = await getapi(ipaddress);
    res.send(result);
});

JiaoShuApi.get('/phone', async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const result = await getphoneapi(phoneNumber);
    res.send(result);
});


// 导出路由
module.exports = JiaoShuApi;
