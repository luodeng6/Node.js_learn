function 饼图(dackmode = false) {
    //饼图的英文是Pie Chart，中文可以翻译为“饼状图”，它是一种常见的图表类型。
    var Pie;
    if (dackmode) {
        Pie = echarts.init(document.getElementById('Piemain', 'dark'));
        console.log('使用了暗色主题！！！');
    } else {
        Pie = echarts.init(document.getElementById('Piemain'));
    }
    Pie = echarts.init(document.getElementById('Piemain', 'dark'));
    option = {
        title: {
            text: '站点访问来源',
            subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '站点用于来自',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: '搜索引擎'},
                    {value: 735, name: '直接访问'},
                    {value: 580, name: '邮件营销'},
                    {value: 484, name: '联盟广告'},
                    {value: 300, name: '视频广告'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]

    };
    Pie.setOption(option);
}


function 可滚动的饼图(dackmode = false) {

    function getOption(data) {
        option = {
            title: {
                text: '药品类别图',
                subtext: '京东药品',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }

    var chartDom = document.getElementById('Pie2main');
    var myChart = echarts.init(chartDom);
    var option;
    console.log("数据：");
    axios.get("http://127.0.0.1:8000/getbingdata").then(res => {
        console.log("成功获取数据：");
        console.log(res.data);
        option = getOption(res.data);
        console.log(option);
        option && myChart.setOption(option);
    }).catch(err => {
        console.log(err);
    });
}


/*
{
    "legendData": [
    "康毕米",
    "何孙黄",
    "滕黄",
    "米和袁"...
],
    "seriesData": [
    {
        "name": "康毕米",
        "value": 63978
    },
    {
        "name": "何孙黄",
        "value": 38025
    },
    {
        "name": "滕黄",
        "value": 14359
    }...
]
}*/


function 不同颜色的饼图() {

    var chartDom = document.getElementById('defferentColorMainBingTu');
    var myChart = echarts.init(chartDom);
    var option;

    function getOption(data) {
        let so_data = []

        for (let i = 0; i < data.keysList.length; i++) {
            so_data.push({
                value: data.valuesList[i],
                name: data.keysList[i]
            })
        }

        option = {
            title: {
                text: '京东品牌统计饼图',
                subtext: '京东品牌',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '京东品牌统计饼图',
                    type: 'pie',
                    radius: '50%',
                    data: so_data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        };
        return option;
    }

    axios.get("http://127.0.0.1:8000/getPingpaidata/").then((response) => {

        option = getOption(response.data)
        console.log("成功获取数据：hahha")
        console.log(response.data)
        console.log(option)
        option && myChart.setOption(option);
    }).catch((error) => {
        console.log(error);
    })


}
