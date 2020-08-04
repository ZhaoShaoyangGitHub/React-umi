import Taro, { Component, Config } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AboutUsProps, AboutUsState } from './index.interface'
import styles from './AboutUs.module.less'

@connect(({ AboutUs }) => ({
    ...AboutUs,
}))
class AboutUs extends Component<AboutUsProps, AboutUsState> {
    config: Config = {
        navigationBarTitleText: '关于我们',
    }
    constructor(props: AboutUsProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    render() {
        return <WebView src="https://mp.weixin.qq.com/s/Pem-i6LwNIzwEtm041FawQ" />
    }
}

export default AboutUs
