import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ModifyPasswordProps, ModifyPasswordState } from './index.interface'
import styles from './ModifyPassword.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ ModifyPassword }) => ({
    ...ModifyPassword,
}))
class ModifyPassword extends Component<ModifyPasswordProps, ModifyPasswordState> {
    config: Config = {
        navigationBarTitleText: '修改密码',
    }
    constructor(props: ModifyPasswordProps) {
        super(props)
        this.state = {
            inputPassword: true,
            oldPassword: '',
            newPassword: '',
            status: false,
        }
    }

    componentDidMount() {}

    handleChangeInput = (val: string, key: string) => {
        this.setState({
            [key]: val,
        })
    }

    isShowPassword = () => {
        this.setState({
            inputPassword: !this.state.inputPassword,
        })
    }

    verifyPassword = () => {
        if (!this.state.oldPassword) return
        this.props.dispatch({
            type: 'ModifyPassword/verifyPassword',
            payload: {
                newPassword: this.state.oldPassword,
            },
            cb: () => {
                Taro.showToast({
                    title: '验证成功',
                    mask: true,
                    duration: 1000,
                    success: () => {
                        let timer: any = setTimeout(() => {
                            clearInterval(timer)
                            timer = null
                            this.setState({
                                status: true,
                                inputPassword: true,
                            })
                        }, 1000)
                    },
                })
            },
        })
    }

    setNewPassword = () => {
        if (!this.state.newPassword) return
        this.props.dispatch({
            type: 'ModifyPassword/updatePassword',
            payload: {
                newPassword: this.state.newPassword,
            },
            cb: () => {
                Taro.showToast({
                    title: '修改成功',
                    mask: true,
                    success: () => {
                        let timer: any = setTimeout(() => {
                            clearInterval(timer)
                            timer = null
                            Taro.navigateBack()
                        }, 1500)
                    },
                })
            },
        })
    }

    render() {
        const { inputPassword, oldPassword, newPassword, status } = this.state
        return (
            <View className={styles.ModifyPasswordMain}>
                {!status ? (
                    <View className={styles.inputGroup}>
                        <View className={styles.title}>请输入旧密码</View>
                        <Input
                            type={'number'}
                            password={inputPassword}
                            value={oldPassword}
                            className={styles.inputBox}
                            onInput={(e: any) => this.handleChangeInput(e.target.value, 'oldPassword')}
                            placeholder={'请输入旧密码'}
                            placeholderStyle={'color: #999999'}
                        />
                        <View className={styles.eyeIcon} onClick={this.isShowPassword}>
                            <Image className={styles.img} src={publicImages.eye} mode="widthFix" />
                        </View>
                    </View>
                ) : (
                    <View className={styles.inputGroup}>
                        <View className={styles.title}>请输入新密码</View>
                        <Input
                            type="number"
                            password={inputPassword}
                            value={newPassword}
                            className={styles.inputBox}
                            onInput={(e: any) => this.handleChangeInput(e.target.value, 'newPassword')}
                            placeholder={'请输入新密码'}
                            placeholderStyle={'color: #999999'}
                        />
                        <View className={styles.eyeIcon}>
                            <Image className={styles.img} src={publicImages.eye} mode="widthFix" />
                        </View>
                    </View>
                )}
                {!status ? (
                    <View
                        className={`${styles.confirmBtn} ${!oldPassword && styles.disable}`}
                        onClick={this.verifyPassword}
                    >
                        下一步
                    </View>
                ) : (
                    <View
                        className={`${styles.confirmBtn} ${!newPassword && styles.disable}`}
                        onClick={this.setNewPassword}
                    >
                        完成
                    </View>
                )}
            </View>
        )
    }
}

export default ModifyPassword
