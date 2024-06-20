function 基础面积图() {
    var chartDom = document.getElementById('mainjiTu');
    var mianChart = echarts.init(chartDom);
    var option;
    function getOption(data) {
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.keysList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data.valuesList,
                    type: 'line',
                    areaStyle: {}
                }
            ]
        };
        return option;
    }


    axios.get("http://127.0.0.1:8000/getPingpaidata/").then((response) => {
        console.log("基础面积图数据获取成功：")
        console.log(response.data)

        // 调用getOption方法，传入数据，得到option
        option = getOption(response.data)
        console.log("基础面积图option：")
        console.log(option)
        // 调用setOption方法，渲染图表
        option && mianChart.setOption(option);
    }).catch((error) => {
        console.log(error);
    })

}
