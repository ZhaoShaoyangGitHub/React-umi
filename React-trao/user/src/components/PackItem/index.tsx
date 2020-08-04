import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { PackItemProps, PackItemState } from './index.interface'
import styles from './index.module.less'

class PackItem extends Component<PackItemProps, PackItemState> {
    constructor(props: PackItemProps) {
        super(props)
        this.state = {}
    }
    handleClickBtn = (e): any => {
        e.stopPropagation()
        const { btnObj, orderId } = this.props
        btnObj.cb(orderId)
    }
    render() {
        const {
            imgSrc,
            title,
            showObj,
            propsStyles,
            onHandleSuitClick,
            btnObj,
            packageStatus,
            isShowStatus,
            efficacy,
            isShowDetail,
        } = this.props
        return (
            <View
                className={styles.PackItemMain}
                style={propsStyles}
                onClick={() => {
                    onHandleSuitClick && onHandleSuitClick()
                }}
            >
                <View className={styles.fitShop}>
                    <View className={styles.fitimgSrc}>
                        {imgSrc && <Image className={styles.fitimg} src={imgSrc} />}
                    </View>
                    <View className={styles.shopInfo}>
                        <View className={styles.title}>{title}</View>
                        {/* {!efficacy && (
                            <View className={styles.descrition}>
                                项目名称 ：
                                {showObj &&
                                    showObj.map((item) => {
                                        return item.projectName
                                    })}
                            </View>
                        )} */}

                        <View className={styles.efficacy}>{efficacy}</View>

                        <View className={styles.buttonList}>
                            {isShowDetail && (
                                <View
                                    className={styles.shopPhone}
                                    onClick={() => {
                                        onHandleSuitClick && onHandleSuitClick()
                                    }}
                                >
                                    套餐详情
                                </View>
                            )}
                            {!isShowStatus && packageStatus.value === 1 && (
                                <View className={styles.shopPhone} onClick={this.handleClickBtn}>
                                    {btnObj.title}
                                </View>
                            )}
                        </View>

                        {isShowStatus && <View className={styles.packageStatus}>{packageStatus.description}</View>}
                    </View>
                </View>
            </View>
        )
    }
}

export default PackItem
