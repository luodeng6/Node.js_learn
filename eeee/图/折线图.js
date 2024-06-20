function 基础折现图(darkMode = false) {
    // 准备数据->折线图的英文是line chart
    var lineChart;
    console.log(darkMode);
    var chartDom = document.getElementById('lineChartmain');
    if (darkMode) {
        lineChart = echarts.init(chartDom, 'dark');
        console.log("使用了暗黑主题")
    } else {
        lineChart = echarts.init(chartDom);
    }


    // 绘制图表
    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };
    lineChart.setOption(option);
}

function 动态折线(darkMode = false) {
    var chartDom = document.getElementById('DynamicLineChart');
    var myChart = echarts.init(chartDom);
    var option;

    function getdata(data) {
        /* new Date().toLocaleString()是JavaScript中用于获取当前日期和时间的方法。
         它返回一个表示当前本地时间的字符串，通常以特定地区的日期和时间格式进行显示*/
        data.push([new Date().toLocaleString(), Math.random() * 400]);
        return data;
    }

    /*  数据格式： [["2000-06-05", 116]...]*/

    let data = [["2000-06-05", 116]]

    setInterval(() => {
        // 将data数组中每个元素的第一个值提取出来，形成一个新的数组
        const dateList = data.map(function (item) {
            return item[0];
        });
        const valueList = data.map(function (item) {
            return item[1];
        });

        data=getdata(data)

        option = {
            // Make gradient line here
            visualMap: [
                {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 400
                },
                {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    dimension: 0,
                    min: 0,
                    max: dateList.length - 1
                }
            ],
            title: [
                {
                    left: 'center',
                    text: '你的心跳图'
                },
                {
                    top: '55%',
                    left: 'center',
                    text: '你的心跳图'
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    data: dateList
                },
                {
                    data: dateList,
                    gridIndex: 1
                }
            ],
            yAxis: [
                {},
                {
                    gridIndex: 1
                }
            ],
            grid: [
                {
                    bottom: '60%'
                },
                {
                    top: '60%'
                }
            ],
            series: [
                {
                    type: 'line',
                    showSymbol: false,
                    data: valueList
                },
                {
                    type: 'line',
                    showSymbol: false,
                    data: valueList,
                    xAxisIndex: 1,

                    yAxisIndex: 1
                }
            ]
        };
        option && myChart.setOption(option);
    }, 200);


}
