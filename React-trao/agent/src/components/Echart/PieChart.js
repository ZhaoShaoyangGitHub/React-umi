import Taro, { Component } from '@tarojs/taro'
import * as echarts from '../ec-canvas/echarts'

function setChartData(chart, data) {
    let option = {
        series: [
            {
                name: '访问来源',
                type: 'pie',
                center: ['50%', '50%'],
                data: data,
                label: {
                    normal: {
                        fontSize: 14,
                    },
                },
                type: 'pie',
                radius: ['30%', '60%'],
                backgroundColor: '#ffffff',
                color: ['#45c3f2', '#ffca1b', '#B365B7'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
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
            this.Chart.init((canvas, width, height) => {
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                })
                setChartData(chart, data)
                return chart
            })
        }, 200)
    }

    refChart = (node) => (this.Chart = node)

    render() {
        return <ec-canvas ref={this.refChart} canvas-id="mychart-area" ec={this.state.ec} />
    }
}
