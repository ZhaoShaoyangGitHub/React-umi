import Taro, { Component } from '@tarojs/taro'
import * as echarts from '../ec-canvas/echarts'

function setChartData(chart, data) {
    let option = {
        color: ['#FCBAFF'],
        tooltip: {
            show: true,
        },
        grid: {
            left: 20,
            right: 45,
            bottom: 10,
            top: 40,
            containLabel: true,
        },
        xAxis: [
            {
                name: '日期',
                type: 'category',
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#999999',
                    },
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: 'KG',
                axisLine: {
                    lineStyle: {
                        color: '#999999',
                    },
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#cccccc',
                    },
                },
            },
        ],
        series: [],
    }

    if (data && data.dimensions && data.measures) {
        option.dataZoom = data.dataZoom
        option.xAxis[0].data = data.dimensions.dataX
        option.yAxis[0].data = data.dimensions.dataY
        option.series = data.measures.map((item) => {
            return {
                ...item,
                type: 'line',
                smooth: true,
                symbolSize: 8,
                label: {
                    show: true,
                },
            }
        })
    }
    chart.setOption(option)
}

export default class LineChart extends Component {
    config = {
        usingComponents: {
            'ec-canvas': '../ec-canvas/ec-canvas',
        },
    }

    constructor(props) {
        super(props)
    }

    state = {
        ec: {
            lazyLoad: true,
        },
    }

    refresh(data) {
        setTimeout(() => {
            this.init_echarts(data)
        }, 0)
    }

    init_echarts = (data) => {
        this.Chart.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
            })
            setChartData(chart, data)
            return chart
        })
    }

    refChart = (node) => (this.Chart = node)

    render() {
        return <ec-canvas ref={this.refChart} canvas-id="mychart-area" ec={this.state.ec} />
    }
}
