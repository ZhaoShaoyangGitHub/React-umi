
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { OverviewGoodsProps, OverviewGoodsState } from './index.interface'
import styles from './OverviewGoods.module.less'
// import { } from '../../components'

@connect(({ OverviewGoods }) => ({
    ...OverviewGoods
}))
class OverviewGoods extends Component<OverviewGoodsProps, OverviewGoodsState > {
    config: Config = {
        navigationBarTitleText: "标题"
    };
    constructor(props: OverviewGoodsProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <View className={styles.OverviewGoodsMain}>OVERVIEWGOODS</View>;
    }
}

export default OverviewGoods;
