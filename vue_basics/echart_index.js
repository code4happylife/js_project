import * as echarts from 'echarts';

export default {
    chart1(chartDom,datas){
        //var chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        // var option;

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data:datas
                }
            ]
        };

        myChart.setOption(option);

    }
}


    // [
    // { value: 1048, name: 'Search Engine' },
    //     { value: 735, name: 'Direct' },
    //     { value: 580, name: 'Email' },
    //     { value: 484, name: 'Union Ads' },
    //     { value: 300, name: 'Video Ads' }
    // ]
