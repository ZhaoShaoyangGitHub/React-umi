import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { TitleSessionProps, TitleSessionState } from './index.interface'
import findMoreArrow from '@assets/img/find_more.png'
import styles from './index.module.less'

class Titlesession extends Component<TitleSessionProps, TitleSessionState> {
    constructor(props: TitleSessionProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: TitleSessionProps = { title: '查看更多' }

    render() {
        const { title, handleMore } = this.props
        return (
            <View className={styles.TitleSessionMain}>
                <View className={styles.titleSession}>
                    <View className={styles.titleBox}>
                        <View className={styles.leftBorder} />
                        <View className={styles.title}>{title}</View>
                    </View>

                    {handleMore !== undefined && (
                        <View
                            className={styles.findMore}
                            onClick={() => {
                                handleMore()
                            }}
                        >
                            <View className={styles.findMoreInfo}>查看更多</View>
                            <Image className={styles.findMoreImg} src={findMoreArrow} />
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default Titlesession
