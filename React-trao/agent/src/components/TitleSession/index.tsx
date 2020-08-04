import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { TitleSessionProps, TitleSessionState } from './index.interface'
import { publicImages } from '../../assets/img/load'
import styles from './index.module.less'

class Titlesession extends Component<TitleSessionProps, TitleSessionState> {
    constructor(props: TitleSessionProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: TitleSessionProps = { title: '查看更多' }

    render() {
        const { title, handleMore, handelAdd } = this.props
        console.log('handleMore', handleMore)
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
                            <Image className={styles.findMoreImg} src={publicImages.jumpIcon} />
                        </View>
                    )}
                    {handelAdd !== undefined && (
                        <View
                            className={styles.add}
                            onClick={() => {
                                handelAdd()
                            }}
                        >
                            添加物品
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default Titlesession
