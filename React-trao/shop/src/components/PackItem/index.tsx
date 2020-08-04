import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { PackItemProps, PackItemState } from './index.interface'
import styles from './index.module.less'

class PackItem extends Component<PackItemProps, PackItemState> {
    constructor(props: PackItemProps) {
        super(props)
        this.state = {}
    }
    handleClickBtn = (e, item): any => {
        e.stopPropagation()
        const { orderId } = this.props
        item.cb(orderId)
    }
    render() {
        const {
            imgSrc,
            title,
            showObj,
            propsStyles,
            onHandleSuitClick,
            btnList,
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
                            {!isShowStatus &&
                                btnList &&
                                btnList.map((item) => (
                                    <View className={styles.shopPhone} onClick={(e) => this.handleClickBtn(e, item)}>
                                        {item.title}
                                    </View>
                                ))}
                        </View>

                        {isShowStatus && <View className={styles.packageStatus}>{packageStatus.description}</View>}
                    </View>
                </View>
            </View>
        )
    }
}

export default PackItem
