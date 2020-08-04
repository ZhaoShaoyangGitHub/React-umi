
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { OverviewMemberProps, OverviewMemberState } from './index.interface'
import styles from './OverviewMember.module.less'
// import { } from '../../components'

@connect(({ OverviewMember }) => ({
    ...OverviewMember
}))
class OverviewMember extends Component<OverviewMemberProps, OverviewMemberState > {
    config: Config = {
        navigationBarTitleText: "标题"
    };
    constructor(props: OverviewMemberProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <View className={styles.OverviewMemberMain}>OVERVIEWMEMBER</View>;
    }
}

export default OverviewMember;
