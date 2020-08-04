import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { OrderOperationProps, OrderOperationState } from './index.interface'
import styles from './index.module.less'
enum Status {
    Closed = -2, // 已关闭
    Canceled = -1, // 已取消
    WaitPay = 1, // 待支付
    WaitDeliver = 2, // 待发货
    WaitRecieve = 3, // 待收货
    Finished = 4, // 交易完成
}
class OrderOperation extends Component<OrderOperationProps, OrderOperationState> {
    constructor(props: OrderOperationProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: OrderOperationProps = {
        status: 0,
        trade: {},
        handlePay: () => {},
        handleCancel: () => {},
        handleRecieve: () => {},
        gotoExpress: () => {},
        handleRefund: () => {},
    }
    render() {
        const { status, trade, handlePay, handleCancel, handleRecieve, gotoExpress, handleRefund } = this.props
        if (status === Status.WaitPay) {
            return (
                <View className={styles.buttonsWrapper}>
                    {/* <View className={styles.normalButton} onClick={() => handleCancel(trade)}>
                        取消订单
                    </View> */}
                    <View className={styles.primaryButton} onClick={() => handlePay(trade)}>
                        去支付
                    </View>
                </View>
            )
        }
        // if (status === Status.WaitDeliver) {
        //     return (
        //         <View className={styles.buttonsWrapper}>
        //             <View className={styles.normalButton} onClick={() => handleRefund(trade)}>
        //                 申请售后
        //             </View>
        //         </View>
        //     )
        // }
        // if (status === Status.WaitRecieve) {
        //     return (
        //         <View className={styles.buttonsWrapper}>
        //             <View className={styles.normalButton} onClick={() => gotoExpress(trade)}>
        //                 查看物流
        //             </View>
        //             <View className={styles.primaryButton} onClick={() => handleRecieve(trade)}>
        //                 确认收货
        //             </View>
        //         </View>
        //     )
        // }
        return <View />
    }
}

export default OrderOperation
