function 柱状图() {
    /*
    基于准备好的dom，初始化echarts实例->加入 'dark', {
           renderer: 'canvas',
         useDirtyRect: false
      }就是暗黑主题
      */
    var bar = echarts.init(document.getElementById('barmain'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '柱状图示例'
        },
        //提示框
        tooltip: {},
        //图例
        legend: {
            data: ['销量']
        },
        // x轴
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        // y轴
        yAxis: {},//Y轴自动适应
        // 图表数据
        series: [
            {
                // 系列名称
                name: '销量',
                // 类型为柱状图
                type: 'bar',
                // 数据
                data: [5, 20, 36, 10, 10, 50]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。

    //柱状图的英语是：bar chart，所以我们可以用柱状图来形容这个图表。
    bar.setOption(option);
}


function 价格区间柱状图() {

    var bar = echarts.init(document.getElementById('JiaGeMain'));

    function getOption(data) {
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '价格区间柱状图示例'
            },
            //提示框
            tooltip: {},
            //图例
            legend: {
                data: ['个数（单位：个）']
            },
            // x轴
            xAxis: {
                data: data.keys
            },
            // y轴
            yAxis: {},//Y轴自动适应
            // 这里的series是一个数组，可以有多个系列，表示柱状图的
            series: [
                {
                    // 系列名称
                    name: '个数（单位：个）',
                    // 类型为柱状图
                    type: 'bar',
                    // 数据
                    data: data.values
                }
            ]
        };
        return option;
    }

    axios.get("http://127.0.0.1:8000/getpricedata/").then((response) => {
        option = getOption(response.data)
        // 使用刚指定的配置项和数据显示图表。
        //柱状图的英语是：bar chart，所以我们可以用柱状图来形容这个图表。
        console.log(response.data)
        bar.setOption(option);
    }).catch((error) => {
        console.log(error);
    })
}


function 不同颜色的柱状图() {

    var chartDom = document.getElementById('defferentColorMain');
    var myChart = echarts.init(chartDom);
    var option;

    function getOption(data) {
        let itemStyledata = []
        data.valuesList.forEach((item, index) => {
            itemStyledata.push({
                value: item,
                itemStyle: {
                    color: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
                }
            })
        });

        option = {
            xAxis: {
                type: 'category',
                // x轴标题，与series中的data中的值对应
                data: data.keysList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: itemStyledata,
                    type: 'bar'
                }
            ]
        };
        return option;
    }

    axios.get("http://127.0.0.1:8000/getPingpaidata/").then((response) => {

        console.log("不同颜色的柱状图")

        console.log(response.data)
        option = getOption(response.data)

        console.log(option)
        option && myChart.setOption(option);
    }).catch((error) => {
        console.log(error);
    })


}


function 动态柱状图() {

    var dynamicChart = echarts.init(document.getElementById('dynamicMain'));
    var option;

    var data = [];
    for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
    }

    option = {
        xAxis: {
            max: 'dataMax'
        },
        yAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 2 // only the largest 3 bars will be displayed
        },
        series: [
            {
                realtimeSort: true,
                name: 'X',
                type: 'bar',
                data: data,
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                }
            }
        ],
        legend: {
            show: true
        },
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    function update() {
        var data = option.series[0].data;
        for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
            } else {
                data[i] += Math.round(Math.random() * 200);
            }
        }
        dynamicChart.setOption(option);
    }

    setInterval(()=>{
        update();
    }, 3000);
}
