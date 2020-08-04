import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { PriceProps, PriceState } from './index.interface'
import styles from './index.module.less'

class Price extends Component<PriceProps, PriceState> {
    constructor(props: PriceProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: PriceProps = {
        value: 0,
    }

    render() {
        const { value } = this.props
        return (
            <View className={styles.price}>
                ¥
                {Number(value)
                    .toFixed(2)
                    .toString()
                    .split('')
                    .map(char => 
                        <Text className={styles.priceChar} key={char}>
                            {char}
                        </Text>)}
            </View>
        )
    }
}

export default Price
