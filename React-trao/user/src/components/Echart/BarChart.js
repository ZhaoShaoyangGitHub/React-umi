import Taro, { Component } from '@tarojs/taro'
import * as echarts from '../ec-canvas/echarts'

function setChartData(chart, data) {
    let option = {
        tooltip: {},
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
                axisTick: {
                    lineStyle: {
                        color: '#999999',
                    },
                    alignWithLabel: true,
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
                axisTick: {
                    lineStyle: {
                        color: '#FFFFFF',
                    },
                },
                splitLine: {
                    show: false,
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(255, 255, 255, 0)', 'rgba(238, 238, 238, 0.22)'],
                    },
                },
            },
        ],
        dataZoom: [],
        series: [],
    }
    if (data && data.measures) {
        option.dataZoom = data.dataZoom
        if (data.dimensions) {
            option.xAxis[0].data = data.dimensions.dataX
            option.yAxis[0].data = data.dimensions.dataY
        }
        if (data.xAxis) {
            option.xAxis = data.xAxis
        }
        if (data.xAxis) {
            option.yAxis = data.yAxis
        }
        option.series = data.measures.map((item) => {
            return {
                ...item,
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: data.label ? data.label.show : true,
                            position: 'top',
                            textStyle: {
                                color: '#999999',
                                fontSize: 12,
                            },
                        },
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#B972BC',
                            },
                            {
                                offset: 1,
                                color: '#FCBAFF',
                            },
                        ]),
                    },
                },
            }
        })
    }
    chart.setOption(option)
}

export default class PieChart extends Component {
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
        }, 200)
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
