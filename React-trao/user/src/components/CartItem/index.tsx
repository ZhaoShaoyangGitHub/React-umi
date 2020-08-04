import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import { AtInputNumber } from 'taro-ui'
import { CartItemProps, CartItemState } from './index.interface'
import Price from '../Price'
import styles from './index.module.less'

class CartItem extends Component<CartItemProps, CartItemState> {
    constructor(props: CartItemProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: CartItemProps = {
        cartId: 0,
        goodsId: 0,
        goodsName: '精油spa按压',
        price: 139,
        amount: 2,
        imgSrc: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
        inventory: 1000,
        isValid: true,
        handleQuantityChange: () => {},
        handleShowInventoryToast: () => {},
        type: 'cart',
    }
    handleAmountChange = (value: number) => {
        console.log('handleAmountChange', value)
        const { cartId, handleQuantityChange, inventory, handleShowInventoryToast } = this.props
        if (value >= 1) {
            if (value > inventory) {
                handleShowInventoryToast()
                handleQuantityChange(cartId, inventory)
            } else {
                handleQuantityChange(cartId, value)
            }
        }
    }
    componentDidMount() {
        // TODO: 重置购物车数量
    }
    render() {
        const { isValid, imgSrc, goodsName, price, amount, inventory, type } = this.props
        if (!isValid) {
            return (
                <View className={styles.CartItemMain}>
                    <View className={classNames(styles.item, styles.invalidItem)}>
                        <View className={styles.imgWrapper}>
                            <Image src={imgSrc} className={styles.img} />
                        </View>
                        <View className={styles.content}>
                            <View className={styles.top}>{goodsName}</View>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View className={styles.CartItemMain}>
                <View className={classNames(styles.item, styles.validItem)}>
                    <View className={styles.imgWrapper}>
                        <Image src={imgSrc} className={styles.img} />
                    </View>
                    <View className={styles.content}>
                        <View className={styles.top}>
                            <View className={styles.title}>{goodsName}</View>
                        </View>
                        <View className={styles.bottom}>
                            <View className={styles.left}>
                                <Price value={price} />
                            </View>
                            <View className={styles.right}>
                                {type === 'order' && <View className={styles.amount}>x{amount}</View>}
                                {type === 'cart' && (
                                    <AtInputNumber
                                        min={1}
                                        max={inventory}
                                        step={1}
                                        value={amount}
                                        type="number"
                                        onChange={(value) => this.handleAmountChange(value)}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CartItem
