import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StorePhotoAlbumProps, StorePhotoAlbumState } from './index.interface'
import styles from './StorePhotoAlbum.module.less'
import { BASEURL } from '../../config/index'
import { HomeImages } from '../../assets/img/load'

@connect(({ Store }) => ({
    ...Store,
}))
class StorePhotoAlbum extends Component<StorePhotoAlbumProps, StorePhotoAlbumState> {
    config: Config = {
        navigationBarTitleText: '门店相册',
    }
    constructor(props: StorePhotoAlbumProps) {
        super(props)
        this.state = {
            shopId: 0,
            photoAlbum: [],
            editStatus: false,
            uploadImages: [],
            uploadImagesLength: 0,
        }
    }

    componentDidMount() {
        this.getShopDetails()
    }

    getShopDetails = () => {
        let { shopId } = this.$router.params
        if (shopId) {
            this.props.dispatch({
                type: 'Store/getShopDetails',
                payload: {
                    shopId,
                },
                cb: (data) => {
                    const { id, photoImage } = data
                    if (photoImage) {
                        const list: any = []
                        JSON.parse(photoImage).map((item) => {
                            list.push({
                                selected: false,
                                url: item.file,
                                original: item.original,
                                size: item.size,
                                state: item.state,
                                title: item.title,
                            })
                        })
                        this.setState({
                            photoAlbum: list,
                        })
                    }
                    this.setState({
                        shopId: id,
                    })
                },
            })
        }
    }

    selectedPhoto = (index) => {
        let { photoAlbum, editStatus } = this.state
        if (editStatus) {
            photoAlbum[index].selected = !photoAlbum[index].selected
            this.setState({
                photoAlbum,
            })
        } else {
            const imgUrls: any = []
            photoAlbum.map((item) => {
                imgUrls.push(BASEURL + item.url)
            })
            Taro.previewImage({
                current: imgUrls[index],
                urls: imgUrls,
            })
        }
    }

    isShowDelete = () => {
        let { photoAlbum } = this.state
        photoAlbum.map((item, index) => {
            photoAlbum[index].selected = false
        })
        this.setState({
            editStatus: true,
            uploadImages: [],
            photoAlbum,
        })
    }

    isHideDelete = () => {
        this.setState({
            editStatus: false,
            uploadImages: [],
        })
    }

    deleteImages = () => {
        Taro.showModal({
            title: '',
            content: '确认退删除这些图片么？',
            confirmColor: '#B365B7',
            success: (res) => {
                if (res.confirm) {
                    let { uploadImages, photoAlbum } = this.state
                    photoAlbum.map((item) => {
                        if (!item.selected) {
                            uploadImages.push({
                                file: item.url,
                                original: item.original,
                                size: item.size,
                                state: item.state ? item.state : '',
                                title: item.title,
                            })
                        }
                    })
                    this.setState(
                        {
                            uploadImages,
                        },
                        () => {
                            this.updatePhotoImage()
                        },
                    )
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail: () => {},
        })
    }

    chooseImage = () => {
        this.setState({
            uploadImages: [],
        })
        Taro.showLoading({
            title: '选择图片',
            mask: true,
        })
        Taro.chooseImage({
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                this.setState(
                    {
                        uploadImagesLength: tempFilePaths && tempFilePaths.length,
                    },
                    () => {
                        if (tempFilePaths.length > 0) {
                            tempFilePaths.map((item) => {
                                this.updateImage(item)
                            })
                        }
                    },
                )
            },
            fail: (res) => {
                Taro.hideLoading()
            },
            complete: (res) => {
                Taro.hideLoading()
            },
        })
    }

    updateImage = (url) => {
        let { uploadImages, uploadImagesLength } = this.state
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
                if (!res.data) return
                const { url, original, size, state, title } = JSON.parse(res.data)
                uploadImages.push({
                    file: url,
                    original,
                    size,
                    state,
                    title,
                })
                this.setState(
                    {
                        uploadImages,
                    },
                    () => {
                        let { uploadImages, photoAlbum } = this.state
                        if (uploadImages.length === uploadImagesLength) {
                            photoAlbum.map((item) => {
                                uploadImages.push({
                                    file: item.url,
                                    original: item.original,
                                    size: item.size,
                                    state: item.state ? item.state : '',
                                    title: item.title,
                                })
                            })
                            this.setState(
                                {
                                    uploadImages,
                                },
                                () => {
                                    this.updatePhotoImage()
                                },
                            )
                        }
                    },
                )
            },
            fail: () => {
                this.setState({
                    uploadImages: [],
                })
            },
        })
    }

    updatePhotoImage = () => {
        const { shopId, uploadImages, uploadImagesLength } = this.state
        console.log(shopId, uploadImages)
        this.props.dispatch({
            type: 'StoreInfo/updatePhoto',
            payload: {
                imageModels: uploadImages,
            },
            cb: (data) => {
                this.getShopDetails()
                Taro.showToast({
                    title: `${uploadImagesLength > 0 ? '已上传' + uploadImagesLength + '张图片' : '删除成功'}`,
                    mask: true,
                    icon: 'none',
                })
                this.setState({
                    uploadImages: [],
                    uploadImagesLength: 0,
                    editStatus: false,
                })
            },
        })
    }

    render() {
        const { photoAlbum, editStatus } = this.state
        return (
            <View className={styles.StorePhotoAlbumMain}>
                <View className={styles.photoWrapper}>
                    {photoAlbum && photoAlbum.length > 0 && (
                        <View className={styles.photoList}>
                            {photoAlbum.map((item, index) => {
                                return (
                                    <View
                                        className={styles.photoListItem}
                                        key={item.title}
                                        onClick={() => {
                                            this.selectedPhoto(index)
                                        }}
                                    >
                                        <Image src={BASEURL + item.url} mode="widthFix" className={styles.photo} />
                                        {editStatus && (
                                            <View className={styles.dot}>
                                                {item.selected && (
                                                    <Image
                                                        src={HomeImages.maskSelect}
                                                        mode="widthFix"
                                                        className={styles.selectedImg}
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </View>
                <View className={styles.optionBottom}>
                    {editStatus && (
                        <View className={styles.editBtn} onClick={this.isHideDelete}>
                            取消
                        </View>
                    )}
                    {editStatus ? (
                        <View className={styles.editBtn} onClick={this.deleteImages}>
                            删除
                        </View>
                    ) : (
                        <View className={styles.editBtn} onClick={this.isShowDelete}>
                            编辑
                        </View>
                    )}
                    <View className={styles.uploadBtn} onClick={this.chooseImage}>
                        上传照片
                    </View>
                </View>
            </View>
        )
    }
}

export default StorePhotoAlbum
