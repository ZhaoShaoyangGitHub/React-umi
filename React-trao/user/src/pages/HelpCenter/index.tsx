import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { HelpCenterProps, HelpCenterState } from './index.interface'
import styles from './HelpCenter.module.less'

class HelpCenter extends Component<HelpCenterProps, HelpCenterState> {
    config: Config = {
        navigationBarTitleText: '帮助中心',
    }

    constructor(props: HelpCenterProps) {
        super(props)
        this.state = {
            helpList: [
                {
                    id: 0,
                    title: '问题一：如何购买？',
                },
            ],
        }
    }

    goDetailPage = (id) => {
        Taro.navigateTo({
            url: `/pages/HelpCenterDetail/index?id=${id}`,
        })
    }

    render() {
        const { helpList } = this.state
        return (
            <View className={styles.container}>
                <View className={styles.listQuestion}>
                    {helpList.map((item) => {
                        return (
                            <View
                                className={styles.listItem}
                                key={item.id}
                                onClick={() => {
                                    this.goDetailPage(item.id)
                                }}
                            >
                                {item.title}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default HelpCenter
