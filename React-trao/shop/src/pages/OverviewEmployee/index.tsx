
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { OverviewEmployeeProps, OverviewEmployeeState } from './index.interface'
import styles from './OverviewEmployee.module.less'
// import { } from '../../components'

@connect(({ OverviewEmployee }) => ({
    ...OverviewEmployee
}))
class OverviewEmployee extends Component<OverviewEmployeeProps, OverviewEmployeeState > {
    config: Config = {
        navigationBarTitleText: "标题"
    };
    constructor(props: OverviewEmployeeProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <View className={styles.OverviewEmployeeMain}>OVERVIEWEMPLOYEE</View>;
    }
}

export default OverviewEmployee;
