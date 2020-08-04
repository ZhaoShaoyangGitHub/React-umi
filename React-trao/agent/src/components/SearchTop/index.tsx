import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { SearchTopProps, SearchTopState } from './index.interface'
import styles from './index.module.less'
import { publicImages } from '../../assets/img/load'

class SearchTop extends Component<SearchTopProps, SearchTopState> {
    constructor(props: SearchTopProps) {
        super(props)
        this.state = {
            searchText: props.searchText,
        }
    }
    static defaultProps: SearchTopProps = {
        searchText: '',
        placeholder: '请输入搜索内容',
        isShowBack: true,
        onSearchHandle: () => {},
    }

    handleSearchChange = (value) => {
        this.setState({
            searchText: value,
        })
    }

    onConfirmHandle = () => {
        this.props.onSearchHandle(this.state.searchText)
    }

    resetSearchText = () => {
        this.setState({
            searchText: '',
        })
    }
    backPage = () => {
        Taro.navigateBack()
    }

    render() {
        const { searchText, placeholder, isShowBack, style } = this.props
        return (
            <View className={styles.searchMain} style={{ ...style }}>
                <View className={styles.searchWrapper}>
                    <View className={styles.iconWrapper} onClick={this.onConfirmHandle}>
                        <Image src={publicImages.searchIcon} className={styles.searchIcon} />
                    </View>
                    <Input
                        type="text"
                        placeholder={placeholder}
                        className={styles.searchText}
                        value={searchText}
                        onInput={(e: any) => this.handleSearchChange(e.detail.value)}
                        onConfirm={this.onConfirmHandle}
                        confirm-type="search"
                    />
                    {searchText && (
                        <View className={styles.iconWrapper} onClick={this.resetSearchText}>
                            <Image src={publicImages.deleteIcon} className={styles.deleteIcon} />
                        </View>
                    )}
                </View>
                {isShowBack && (
                    <View className={styles.cancel} onClick={this.backPage}>
                        取消
                    </View>
                )}
            </View>
        )
    }
}

export default SearchTop
