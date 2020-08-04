import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AttendanceTabBarProps, AttendanceTabBarState } from './index.interface'
import styles from './index.module.less'

class AttendanceTabBar extends Component<AttendanceTabBarProps, AttendanceTabBarState> {
    constructor(props: AttendanceTabBarProps) {
        super(props)
        this.state = {
            backgroundColor: 'white',
            color: '#999999',
            selectedColor: '#B365B7',
        }
    }
    componentDidMount() {
        let { backgroundColor, color, selectedColor } = this.state
        const tabBar = this.props.tabBar
        backgroundColor = tabBar.backgroundColor ? tabBar.backgroundColor : backgroundColor
        color = tabBar.color ? tabBar.color : color
        selectedColor = tabBar.selectedColor ? tabBar.selectedColor : selectedColor
        this.setState({
            backgroundColor,
            color,
            selectedColor,
        })
    }

    handleTavBar = (id, path) => {
        if (this.props.tabBar && this.props.tabBar.currentId === id) return
        Taro.navigateTo({
            url: '/' + path,
        })
    }

    render() {
        const { backgroundColor, color, selectedColor } = this.state
        const { tabBar } = this.props

        return (
            <View className={styles.tarBarMain} style={{ backgroundColor: backgroundColor }}>
                {tabBar &&
                    tabBar.list &&
                    tabBar.list.map((item) => {
                        return (
                            <View
                                className={styles.tarBarListItem}
                                key={item.id}
                                onClick={() => {
                                    this.handleTavBar(item.id, item.pagePath)
                                }}
                            >
                                <View className={styles.iconWrapper}>
                                    <Image
                                        src={tabBar.currentId === item.id ? item.selectedIconPath : item.iconPath}
                                        mode="widthFix"
                                        className={styles.icon}
                                    />
                                </View>
                                <View
                                    className={`${tabBar.currentId === item.id ? styles.texted : styles.text}`}
                                    style={{ color: tabBar.currentId === item.id ? selectedColor : color }}
                                >
                                    {item.text}
                                </View>
                            </View>
                        )
                    })}
            </View>
        )
    }
}

export default AttendanceTabBar
