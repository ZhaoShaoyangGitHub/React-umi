import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AddPackageProps, AddPackageState } from './index.interface'
import styles from './AddPackage.module.less'
import { BASEURL } from '../../config/index'
import { publicImages } from '../../assets/img/load'

@connect(({ MyPackage }) => ({
    ...MyPackage,
}))
class AddPackage extends Component<AddPackageProps, AddPackageState> {
    config: Config = {
        navigationBarTitleText: '添加套餐',
    }
    constructor(props: AddPackageProps) {
        super(props)
        this.state = {
            categoryId: 0, // 套餐分类
            packageAmount: '', // 套餐价格
            packageEfficacy: '', // 套餐简介
            packageImage: [
                // {
                //     file: '',
                //     original: '',
                //     size: '',
                //     state: '',
                //     title: '',
                // },
            ],
            packageName: '', //套餐名称
            shopIds: [], //可销售门店
            shopList: [],
            storeProjectForms: [
                //服务项目集合
                // {
                //     projectId: 0, //服务项目id
                //     projectNumber: 0, //服务项目次数
                // },
            ],
            storeProjectList: [],
        }
    }

    componentDidShow() {
        try {
            var storeIds = Taro.getStorageSync('storeIds')
            if (storeIds) {
                const data = JSON.parse(storeIds)
                this.setState({
                    shopList: data,
                })
            }
        } catch (e) {
            console.log(e)
            // Do something when catch error
        }

        try {
            var projectIds = Taro.getStorageSync('projectIds')
            if (projectIds) {
                const data = JSON.parse(projectIds)
                let storeProjectList: any = []
                data.map((item) => {
                    storeProjectList.push({
                        projectName: item.name,
                        projectId: item.id,
                        projectNumber: 1,
                    })
                })
                this.setState({
                    storeProjectList,
                })
            }
        } catch (e) {
            // Do something when catch error
        }
    }

    handleChange = (key, val): void => {
        this.setState({
            [key]: val,
        })
    }

    chooseImage = () => {
        Taro.showLoading({
            title: '选择图片',
            mask: true,
        })
        Taro.chooseImage({
            count: 1,
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
                let { packageImage } = this.state
                const { url, original, size, state, title } = JSON.parse(res.data)
                packageImage.push({
                    file: url,
                    original,
                    size,
                    state,
                    title,
                })
                this.setState({
                    packageImage,
                })
            },
        })
    }

    confirmAdd = () => {
        let {
            shopIds,
            packageAmount,
            packageEfficacy,
            packageName,
            storeProjectForms,
            shopList,
            storeProjectList,
            packageImage,
        } = this.state
        storeProjectList.map((item) => {
            storeProjectForms.push({
                projectId: item.projectId,
                projectNumber: item.projectNumber,
            })
        })
        shopIds = []
        shopList.map((item) => {
            shopIds.push(item.id)
        })
        if (!packageName) {
            Taro.showToast({
                title: '项目名不能为空',
                mask: true,
                icon: 'none',
            })
            return
        }
        this.props.dispatch({
            type: 'MyPackage/addGoodsPackage',
            payload: {
                categoryId: 2,
                shopIds,
                packageAmount,
                packageEfficacy,
                packageName,
                storeProjectForms,
                packageImage,
            },
            cb: (data) => {
                Taro.navigateTo({
                    url: '/pages/MyPackage/index',
                })
            },
        })
    }

    goPackageSelectPage = (status) => {
        Taro.navigateTo({
            url: `/pages/PackageSelect/index?status=${status}`,
        })
    }

    addProjectNumber = (index) => {
        const { storeProjectList } = this.state
        storeProjectList[index].projectNumber++
        this.setState(storeProjectList)
    }

    subProjectNumber = (index) => {
        const { storeProjectList } = this.state
        if (storeProjectList[index].projectNumber == 1) {
            Taro.showToast({
                title: '最少是1',
                mask: true,
                icon: 'none',
            })
        } else {
            storeProjectList[index].projectNumber--
            this.setState(storeProjectList)
        }
    }

    render() {
        const { packageImage, packageAmount, packageEfficacy, packageName, shopList, storeProjectList } = this.state
        return (
            <View className={styles.AddPackageMain}>
                <View className={styles.AddPackageWrapper}>
                    <View className={styles.comTitle}>套餐详情</View>
                    <View className={styles.packageContent}>
                        <View className={styles.packageInfoItem}>
                            <View className={styles.left}>套餐图片</View>
                            <View onClick={this.chooseImage}>
                                <View className={styles.uploadImg}>
                                    {packageImage.length && packageImage[0].file ? (
                                        <Image
                                            src={BASEURL + packageImage[0].file}
                                            mode="widthFix"
                                            className={styles.upImage}
                                        />
                                    ) : (
                                        <View>上传图片</View>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View className={styles.packageInfoItem}>
                            <View className={styles.left}>套餐名称</View>
                            <View className={styles.baseInfo}>
                                <Input
                                    type="text"
                                    value={packageName}
                                    className={styles.inputBox}
                                    onInput={(e) => this.handleChange('packageName', e.detail.value)}
                                    placeholder="请输入"
                                />
                            </View>
                        </View>
                        <View className={styles.packageInfoItem}>
                            <View className={styles.left}>套餐价格</View>
                            <View className={styles.baseInfo}>
                                <Input
                                    type="digit"
                                    value={packageAmount}
                                    className={styles.packagePrice}
                                    placeholder={'¥0.00'}
                                    onInput={(e) => this.handleChange('packageAmount', e.detail.value)}
                                />
                            </View>
                        </View>
                        <View className={styles.packageInfoItem}>
                            <View className={styles.left}>套餐简介</View>
                            <View className={styles.baseInfo}>
                                <Input
                                    type="text"
                                    value={packageEfficacy}
                                    className={styles.inputBox}
                                    onInput={(e) => this.handleChange('packageEfficacy', e.detail.value)}
                                    placeholder="请输入"
                                />
                            </View>
                        </View>
                        <View className={styles.packageInfoItem}>
                            <View className={styles.left}>门店选择</View>
                            <View className={styles.infoListItem} onClick={() => this.goPackageSelectPage(1)}>
                                {shopList.length > 0 ? (
                                    <View>
                                        {shopList.map((item) => {
                                            return <Text key={item.id}>{item.name},</Text>
                                        })}
                                    </View>
                                ) : (
                                    <Text className={styles.left}>请选择</Text>
                                )}
                                <Image className={styles.setIcon} src={publicImages.jumpIcon} />
                            </View>
                        </View>
                    </View>
                    <View className={styles.projectContent}>
                        <View className={styles.comTitle}>项目详情</View>
                        <View className={styles.selectProject} onClick={() => this.goPackageSelectPage(2)}>
                            添加服务项目
                        </View>
                        {storeProjectList.length > 0 && (
                            <View className={styles.projectList}>
                                {storeProjectList.map((item, index) => {
                                    return (
                                        <View className={styles.projectListItem} key={item.projectId}>
                                            <View className={styles.infoName}>
                                                <View className={styles.infoLeft}>服务项目</View>
                                                <View className={styles.infoRight}>{item.projectName}</View>
                                            </View>
                                            <View className={styles.infoNumber}>
                                                <View className={styles.infoLeft}>服务次数</View>
                                                <View className={styles.changeNumber}>
                                                    <View
                                                        className={styles.subtraction}
                                                        onClick={() => this.subProjectNumber(index)}
                                                    >
                                                        -
                                                    </View>
                                                    <View className={styles.number}>{item.projectNumber}</View>
                                                    <View
                                                        className={styles.addition}
                                                        onClick={() => this.addProjectNumber(index)}
                                                    >
                                                        +
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                    </View>
                </View>
                <View className={styles.addBtn} onClick={this.confirmAdd}>
                    确定
                </View>
            </View>
        )
    }
}

export default AddPackage
