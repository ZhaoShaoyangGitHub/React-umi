import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { SelectToScrollProps, SelectToScrollState } from './index.interface'
import styles from './index.module.less'

class SelectToScroll extends Component<SelectToScrollProps, SelectToScrollState> {
    constructor(props: SelectToScrollProps) {
        super(props)
        this.state = {}
    }

    render() {
        const { selectScrollHidden, handleSelectScroll, titleArr } = this.props
        return (
            <View className={styles.SelectToScrollMain}>
                {!selectScrollHidden && titleArr && titleArr.length && (
                    <View className={styles.selectScroll}>
                        {titleArr.map(item => {
                            return (
                                <View
                                    key={item.id}
                                    className={styles.left}
                                    onClick={() => {
                                        handleSelectScroll(item.id)
                                    }}
                                >
                                    {item.title}
                                </View>
                            )
                        })}
                    </View>
                )}
            </View>
        )
    }
}

export default SelectToScroll
