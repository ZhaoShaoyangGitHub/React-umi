import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StoreCoverProps, StoreCoverState } from './index.interface'
import styles from './StoreCover.module.less'
import { BASEURL } from '../../config/index'

@connect(({ StoreInfo }) => ({
    ...StoreInfo,
}))
class StoreCover extends Component<StoreCoverProps, StoreCoverState> {
    config: Config = {
        navigationBarBackgroundColor: '#242424',
        navigationBarTitleText: '门店封面',
        navigationBarTextStyle: 'white',
    }
    constructor(props: StoreCoverProps) {
        super(props)
        this.state = {
            imgUrl: '',
            shopId: 5,
            saveLayerStatue: false,
            moreOptionLayerStatue: false,
        }
    }

    componentDidMount() {
        const { imgUrl, shopId } = this.$router.params
        if (imgUrl) {
            this.setState({
                imgUrl,
            })
        }
        if (shopId) {
            this.setState({
                shopId: +shopId,
            })
        }
    }

    moreOption = () => {
        this.setState({
            saveLayerStatue: false,
            moreOptionLayerStatue: true,
        })
    }

    onLongPress = () => {
        this.setState({
            saveLayerStatue: true,
            moreOptionLayerStatue: false,
        })
    }

    hideOption = () => {
        this.setState({
            saveLayerStatue: false,
            moreOptionLayerStatue: false,
        })
    }

    chooseImage = (type: string) => {
        Taro.showLoading({
            title: '选择图片',
            mask: true,
        })
        let sourceTypeOption: ('album' | 'camera' | 'user' | 'environment')[] | undefined = ['album']
        if (type === 'camera') {
            sourceTypeOption = ['camera']
        }
        Taro.chooseImage({
            count: 1,
            sourceType: sourceTypeOption,
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                this.updateShopImage(tempFilePaths[0])
            },
            fail: (res) => {
                Taro.hideLoading()
            },
            complete: (res) => {
                Taro.hideLoading()
            },
        })
    }

    updateShopImage = (url) => {
        Taro.uploadFile({
            url: `${BASEURL}/api/ueditor`,
            header: {
                'content-type': 'multipart/form-data',
            },
            filePath: url,
            name: 'upfile',
            formData: {
                action: 'uploadimage',
                encode: 'utf-8',
            },
            success: (res) => {
                const { url, original, size, state, title } = JSON.parse(res.data)
                const imageModels = [
                    {
                        file: url,
                        original,
                        size,
                        state,
                        title,
                    },
                ]
                this.props.dispatch({
                    type: 'StoreInfo/updateShopImage',
                    payload: {
                        imageModels,
                    },
                    cb: (data) => {
                        this.setState(
                            {
                                imgUrl: url,
                            },
                            () => {
                                Taro.hideLoading()
                                Taro.showToast({
                                    title: '更新成功',
                                })
                                this.hideOption()
                            },
                        )
                    },
                })
            },
        })
    }

    // 长按保存图片
    saveImg(e) {
        const { imgUrl } = this.state
        // 用户需要授权
        Taro.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    Taro.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: () => {
                            // 同意授权
                            this.saveToLocal(BASEURL + imgUrl)
                        },
                        fail: (res) => {},
                    })
                } else {
                    // 已经授权了
                    this.saveToLocal(BASEURL + imgUrl)
                }
            },
            fail: (res) => {},
        })
    }
    // 保存图片到本地
    saveToLocal(url) {
        Taro.getImageInfo({
            src: url,
            success: (res) => {
                let path = res.path
                Taro.saveImageToPhotosAlbum({
                    filePath: path,
                    success: (res) => {
                        Taro.showToast({
                            title: '保存成功',
                            mask: true,
                        })
                        this.hideOption()
                    },
                    fail: (res) => {},
                })
            },
            fail: (res) => {},
        })
    }

    render() {
        const { imgUrl, saveLayerStatue, moreOptionLayerStatue } = this.state
        return (
            <View className={styles.StoreCoverMain}>
                <View className={styles.moreOption} onClick={this.moreOption}>
                    更多
                </View>
                <View className={styles.StoreCover} onLongPress={this.onLongPress}>
                    {imgUrl && <Image src={BASEURL + imgUrl} mode="widthFix" className={styles.coverImage} />}
                </View>
                {(saveLayerStatue || moreOptionLayerStatue) && <View className={styles.model}></View>}
                {saveLayerStatue && (
                    <View className={styles.layerSave}>
                        <View className={styles.box} onClick={this.saveImg}>
                            保存图片
                        </View>
                        <View className={styles.marginBottom}></View>
                        <View className={styles.box} onClick={this.hideOption}>
                            取消
                        </View>
                    </View>
                )}
                {moreOptionLayerStatue && (
                    <View className={styles.layerSave}>
                        <View
                            className={styles.box}
                            onClick={() => {
                                this.chooseImage('camera')
                            }}
                        >
                            拍照
                        </View>
                        <View
                            className={styles.box}
                            onClick={() => {
                                this.chooseImage('album')
                            }}
                        >
                            从手机相册选择
                        </View>
                        <View className={styles.box} onClick={this.saveImg}>
                            保存图片
                        </View>
                        <View className={styles.marginBottom}></View>
                        <View className={styles.box} onClick={this.hideOption}>
                            取消
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default StoreCover
