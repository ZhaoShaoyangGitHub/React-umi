/* eslint-disable import/no-duplicates */

import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Picker, Input, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CartItem from '../../components/CartItem/index'
import Price from '../../components/Price'
import { OrderConfirmProps, OrderConfirmState } from './index.interface'
import styles from './OrderConfirm.module.less'
import { Icons, order } from '../../assets/img/load'

@connect(({ OrderConfirm }) => ({
    ...OrderConfirm,
}))
class OrderConfirm extends Component<OrderConfirmProps, OrderConfirmState> {
    config: Config = {
        navigationBarTitleText: '订单确认',
    }
    constructor(props: OrderConfirmProps) {
        super(props)
        this.state = {
            isFirstPay: false,
            deliveryType: 2, // 自提为2，送货为1
        }
    }

    componentDidShow() {
        const { currentAddress, needAddress } = this.props
        if (needAddress && JSON.stringify(currentAddress) === '{}') {
            this.getDefaultAddress()
        }
        const personalInfo = Taro.getStorageSync('personalInfo')
        const isFirstPay: boolean = personalInfo && Number(JSON.parse(personalInfo).userType) === 1
        this.setState({
            isFirstPay,
        })
    }
    getDefaultAddress = () => {
        this.props.dispatch({
            type: 'OrderConfirm/getDefaultAddress',
            payload: {
                type: 1,
            },
        })
    }
    gotoAddress = () => {
        Taro.navigateTo({
            url: '/pages/AddressManage/index?from=OrderConfirm',
        })
    }
    gotoPay = () => {
        console.log('调起支付')

        const { currentAddress, cartIds, goods, selectedSource, payType, recommend, needAddress, shopId } = this.props
        const { isFirstPay, deliveryType } = this.state
        const data: any = {
            addressId: currentAddress.id,
            tradeFrom: 2, // wap
            amount: this.getPayPrice(),
            refererPhone: selectedSource === 0 ? recommend : '', // 不是会员推荐就不传了
            source: selectedSource + 1, // 下标 + 1
            payType: payType === 'wechat' ? 1 : 3, // 1:线上支付,2:对公,3:扫码,4:pos,5:现金
        }
        // 首次支付 清空相关字段
        if (!isFirstPay) {
            data.source = ''
            data.refererPhone = ''
        }
        // 不需要地址 清空相关字段
        if (!needAddress) {
            data.addressId = ''
        }
        // 检查地址
        if (needAddress && deliveryType === 1 && !currentAddress.id) {
            Taro.showToast({
                title: '请选择收货地址',
                icon: 'none',
            })
            return
        }
        // 检查推荐人账号
        if (isFirstPay && selectedSource === 0 && !recommend) {
            Taro.showToast({
                title: '请输入推荐人手机号',
                icon: 'none',
            })
            return
        }
        Taro.login({
            success: (codeRes) => {
                console.log(codeRes)
                // 购物车入口
                if (cartIds && cartIds.length) {
                    data.cartIds = cartIds
                    data.deliveryType = deliveryType
                    console.log('购物车结算,', data)
                    this.props.dispatch({
                        type: 'OrderConfirm/confirm',
                        payload: data,
                        confirmCallback: () => {
                            Taro.showToast({
                                title: '请联系技师确认',
                                duration: 2000,
                            }).then(() => {
                                setTimeout(() => {
                                    Taro.navigateTo({
                                        url: `/pages/OrderList/index`,
                                    })
                                }, 2000)
                            })
                        },
                        payCallback: (id: number) => {
                            this.props.dispatch({
                                type: 'OrderConfirm/getPayParam',
                                payload: {
                                    tradeId: id,
                                    jsCode: codeRes.code,
                                },
                                callback: (params) => {
                                    Taro.requestPayment({
                                        timeStamp: params.timeStamp,
                                        nonceStr: params.nonceStr,
                                        package: params.packageValue,
                                        signType: params.signType,
                                        paySign: params.sign,
                                        success() {
                                            Taro.redirectTo({
                                                url: `/pages/PayResult/index?id=${id}`,
                                            })
                                        },
                                        fail() {},
                                    })
                                },
                            })
                        },
                    })
                }
                // 直接结算入口
                if (goods && goods.goodsId) {
                    data.goodsForm = {
                        goodsId: goods.goodsId,
                        number: 1,
                        type: goods.goodsType,
                    }
                    data.shopId = shopId
                    data.deliveryType = deliveryType
                    console.log('直接结算,', data)
                    this.props.dispatch({
                        type: 'OrderConfirm/goodsConfirmAndPay',
                        payload: data,
                        callback: (id: number, res) => {
                            if (payType === 'wechat') {
                                // 线上支付
                                this.props.dispatch({
                                    type: 'OrderConfirm/getPayParam',
                                    payload: {
                                        tradeId: id,
                                        jsCode: codeRes.code,
                                    },
                                    callback: (params) => {
                                        Taro.requestPayment({
                                            timeStamp: params.timeStamp,
                                            nonceStr: params.nonceStr,
                                            package: params.packageValue,
                                            signType: params.signType,
                                            paySign: params.sign,
                                            success() {
                                                Taro.redirectTo({
                                                    url: `/pages/PayResult/index?id=${id}`,
                                                })
                                            },
                                            fail() {
                                                Taro.showToast({
                                                    title: '支付失败',
                                                    icon: 'none',
                                                    duration: 2000,
                                                })
                                                setTimeout(() => {
                                                    Taro.redirectTo({
                                                        url: `/pages/OrderList/index`,
                                                    })
                                                }, 2000)
                                            },
                                        })
                                    },
                                })
                            } else {
                                // 线下支付
                                Taro.showToast({
                                    title: '请联系技师确认',
                                    duration: 2000,
                                }).then(() => {
                                    setTimeout(() => {
                                        Taro.navigateTo({
                                            url: `/pages/OrderList/index`,
                                        })
                                    }, 2000)
                                })
                            }
                        },
                    })
                }
            },
        })
    }
    handlePointUseChange = () => {
        this.props.dispatch({
            type: 'OrderConfirm/save',
            payload: {
                usePoint: !this.props.usePoint,
            },
        })
    }
    handlePayTypeChange = (payType: string) => {
        this.props.dispatch({
            type: 'OrderConfirm/save',
            payload: {
                payType,
            },
        })
    }
    handleSourceChange = (e: any) => {
        this.props.dispatch({
            type: 'OrderConfirm/save',
            payload: {
                selectedSource: Number(e.detail.value),
            },
        })
    }
    handleRecommendChange = (e: any) => {
        this.props.dispatch({
            type: 'OrderConfirm/save',
            payload: {
                recommend: e.detail.value,
            },
        })
    }
    getTotalNum = () => {
        const { goodsList } = this.props
        return goodsList.reduce((sum, el) => {
            return (sum = sum + (el.amount || 0))
        }, 0)
    }
    getPayPrice = () => {
        const { totalPrice, useablePoint } = this.props
        // return totalPrice - useablePoint * 0.01
        return totalPrice
    }
    // 选择送货方式
    handleDeliveryTypeChange = (type: number) => {
        this.setState({
            deliveryType: type,
        })
    }
    render() {
        const {
            currentAddress,
            goodsList,
            useablePoint,
            usePoint,
            payType,
            sourceArray,
            selectedSource,
            shopName,
            totalPrice,
            needAddress,
        } = this.props
        const {
            id: addressId,
            province = '',
            city = '',
            district = '',
            address = '',
            phone = '',
            name = '',
            isDefault,
        } = currentAddress
        const { isFirstPay, deliveryType } = this.state
        return (
            <View className={styles.OrderConfirmMain}>
                <View className={styles.goodsWrapper}>
                    <View className={styles.itemsWrapper}>
                        <View className={styles.itemsTitle}>{shopName}</View>
                        <View className={styles.itemsChildren}>
                            {goodsList.map((item: any) => {
                                return (
                                    <View className={styles.itemWrapper} key={item.cartId}>
                                        <View className={styles.cartItemWrapper}>
                                            <CartItem
                                                type="order"
                                                cartId={item.cartId}
                                                goodsId={item.goodsId}
                                                goodsName={item.goodsName}
                                                price={item.price}
                                                amount={item.amount}
                                                imgSrc={item.imageUrl}
                                                isValid
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                            <View className={styles.itemsStatistic}>
                                共{this.getTotalNum()}件, 合计：
                                <Price value={totalPrice} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* 暂时先不显示积分 */}
                {/* <View className={styles.pointWrapper}  onClick={this.handlePointUseChange}>
                    <View className={styles.left}>
                        可用{useablePoint}积分抵用{useablePoint * 0.01}元
                    </View>
                    <View className={styles.right}>
                        <View className={styles.checkboxWrapper}>
                            {usePoint ? <Image src={checkedIcon} className={styles.checkedIcon} /> : <View className={styles.uncheckedIcon} />}
                        </View>

                    </View>
                </View> */}
                {/**收货方式 */}
                {needAddress && (
                    <View className={styles.deliveryType}>
                        <View className={styles.titleBox}>
                            <View className={styles.left}>
                                <View className={styles.leftBorder} />
                                <View className={styles.title}>收货方式</View>
                            </View>

                            <View className={styles.receiveType}>
                                <Text
                                    className={deliveryType === 2 ? styles.active : ''}
                                    onClick={() => this.handleDeliveryTypeChange(2)}
                                >
                                    自提
                                </Text>
                                <Text
                                    className={deliveryType === 1 ? styles.active : ''}
                                    onClick={() => this.handleDeliveryTypeChange(1)}
                                >
                                    送货
                                </Text>
                            </View>
                        </View>

                        {/* 地址 如果全是套餐 就不显示地址 */}
                        {deliveryType === 1 && (
                            <View className={styles.addressWrapper}>
                                <View className={styles.address} onClick={() => this.gotoAddress()}>
                                    <View className={styles.left}>
                                        <Image src={order.locate} className={styles.addressIcon} />
                                    </View>
                                    {addressId ? (
                                        <View className={styles.center}>
                                            <View className={styles.centerTop}>
                                                <Text className={styles.ellipsis}>{name}</Text>
                                                <Text className={styles.light}>{phone}</Text>
                                                {isDefault && isDefault.value === 1 ? '(默认)' : ''}
                                            </View>
                                            <View className={styles.centerBottom}>
                                                <Text className={styles.ellipsis}>
                                                    {province} {city} {district} {address}
                                                </Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <View className={styles.center}>请选择收货地址</View>
                                    )}
                                    <View className={styles.right}>
                                        <Image src={Icons.findMore} className={styles.arrowIcon} />
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                <View className={styles.payTypeWrapper}>
                    <View className={styles.blockTitle}>选择支付方式</View>
                    <View className={styles.payTypeItemWrapper}>
                        <View className={styles.payTypeItem} onClick={() => this.handlePayTypeChange('wechat')}>
                            <Image src={order.wechat} className={styles.payTypeIcon} />
                            <View className={styles.text}>微信支付</View>
                            <View className={styles.checkboxWrapper}>
                                {payType === 'wechat' ? (
                                    <Image src={Icons.selected} className={styles.checkedIcon} />
                                ) : (
                                    <View className={styles.uncheckedIcon} />
                                )}
                            </View>
                        </View>
                        <View className={styles.payTypeItem} onClick={() => this.handlePayTypeChange('offline')}>
                            <Image src={order.offline} className={styles.payTypeIcon} />
                            <View className={styles.text}>线下支付</View>
                            <View className={styles.checkboxWrapper}>
                                {payType === 'offline' ? (
                                    <Image src={Icons.selected} className={styles.checkedIcon} />
                                ) : (
                                    <View className={styles.uncheckedIcon} />
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* 来源渠道 只有第一次支付才显示 */}
                {isFirstPay && (
                    <View className={styles.sourceWrapper}>
                        <View className={styles.blockTitle}>选择来源渠道</View>
                        <View className={styles.sourceItemWrapper}>
                            <View className={styles.sourcePicker}>
                                <View className={styles.text}>来源渠道</View>
                                <View className={styles.content}>
                                    <Picker
                                        mode="selector"
                                        range={sourceArray}
                                        onChange={this.handleSourceChange}
                                        value={selectedSource}
                                    >
                                        <View className="picker">{sourceArray[selectedSource]}</View>
                                    </Picker>
                                </View>
                                <View className={styles.right}>
                                    <Image src={Icons.findMore} className={styles.arrowIcon} />
                                </View>
                            </View>
                            {selectedSource === 0 && (
                                <View className={styles.sourceItem}>
                                    <View className={styles.text}>推荐人手机号</View>
                                    <View className={styles.inputWrapper}>
                                        <Input
                                            type="number"
                                            placeholder="请输入推荐人手机号"
                                            className={styles.sourceInput}
                                            placeholderClass={styles.placeholder}
                                            onInput={this.handleRecommendChange}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                )}

                <View className={styles.bottom}>
                    <View className={styles.totalprice}>
                        合计: <Price value={this.getPayPrice()} />
                    </View>
                    <View className={styles.confirm} onClick={this.gotoPay}>
                        去支付
                    </View>
                </View>
            </View>
        )
    }
}

export default OrderConfirm
