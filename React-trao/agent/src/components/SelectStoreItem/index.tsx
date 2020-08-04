import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { SelectStoreItemProps, SelectStoreItemState } from './index.interface'
import styles from './index.module.less'
import { publicImages } from '../../assets/img/load'

class SelectStoreItem extends Component<SelectStoreItemProps, SelectStoreItemState> {
    constructor(props: SelectStoreItemProps) {
        super(props)
        this.state = {}
    }

    static defaultProps: {
        showSelect: true
    }

    render() {
        const { item, onHandleClick, showSelect } = this.props
        return (
            <View
                className={styles.storeListItem}
                onClick={() => {
                    onHandleClick && onHandleClick()
                }}
            >
                <View className={styles.storeName}>{item.name}</View>
                {showSelect && (
                    <View className={styles.selectDot}>
                        {item.selected && (
                            <Image
                                src={publicImages.selectedIcon}
                                mode="widthFix"
                                className={styles.selectedIcon}
                            ></Image>
                        )}
                    </View>
                )}
            </View>
        )
    }
}

export default SelectStoreItem
