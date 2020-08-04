import Taro from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'
import 'taro-ui/dist/style/index.scss'
import Home from './pages/Home/index'
import dva from './utils/dva'
import models from './models/index'
import './app.less'

const dvaApp = dva.createApp({
    initialState: {},
    models: models,
})

const store = dvaApp.getStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== "production" && process.env.TARO_ENV === "h5") {
//   console.log("NODE_ENV:", process.env.NODE_ENV);
//   require("nerv-devtools");
// }

class App extends Taro.Component {
    componentWillMount() {
        // Taro.checkSession({
        //     success() {},
        //     fail() {
        //         console.log('code已过期需要重新获取')
        //         return Taro.login()
        //             .then((response) => {
        //                 Taro.setStorage({ key: 'code', data: response.code }).then((rst) => {
        //                     //将用户信息存入缓存中
        //                     console.log('rst', rst)
        //                     // Taro.navigateBack()
        //                 })
        //             })
        //             .catch((err) => {
        //                 console.log(err)
        //                 Taro.showToast({
        //                     title: '发生错误，请重试!',
        //                     icon: 'none',
        //                 })
        //             })
        //     },
        // })
    }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Taro.Config = {
        pages: [
            'pages/Home/index',
            'pages/LoginAgreement/index',
            'pages/AddComment/index',
            'pages/AboutUs/index',
            'pages/AddressEdit/index',
            'pages/AddressManage/index',
            'pages/ArticleDetails/index',
            'pages/Cart/index',
            'pages/EditInfo/index',
            'pages/EditProfile/index',
            'pages/FixPhoneNumber/index',
            'pages/GoodsDetail/index',
            'pages/HealthRecordsSetting/index',
            'pages/HealthRecords/index',
            'pages/HelpCenter/index',
            'pages/HelpCenterDetail/index',
            'pages/JoinInNotice/index',
            // 'pages/LocateList/index',
            'pages/MyCollection/index',
            'pages/MyPackage/index',
            'pages/MyPackageDetail/index',
            'pages/MyPointsScores/index',
            'pages/OrderConfirm/index',
            'pages/OrderDetail/index',
            'pages/OrderList/index',
            'pages/PackageDetail/index',
            'pages/PackageSelect/index',
            'pages/PayResult/index',
            'pages/Personal/index',
            'pages/PhysicalSelfTest/index',
            'pages/SetUserInfo/index',
            'pages/ShopMall/index',
            // 'pages/ShopMap/index',
            'pages/ShopSearch/index',
            'pages/StoreDetail/index',
            'pages/Subscribe/index',
            'pages/SuitStore/index',
            'pages/UpdateRecords/index',
            'pages/UserLogin/index',
            'pages/UserSetting/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#b55fb2',
            navigationBarTitleText: '荣月',
            navigationBarTextStyle: 'white',
        },
        tabBar: {
            backgroundColor: 'white',
            list: [
                {
                    pagePath: 'pages/Home/index',
                    text: '首页',
                    iconPath: './assets/img/home.png',
                    selectedIconPath: './assets/img/homed.png',
                },
                {
                    pagePath: 'pages/ShopMall/index',
                    text: '商城',
                    iconPath: './assets/img/shop.png',
                    selectedIconPath: './assets/img/shoped.png',
                },
                {
                    pagePath: 'pages/Subscribe/index',
                    text: '预约',
                    iconPath: './assets/img/subscribe.png',
                    selectedIconPath: './assets/img/subscribed.png',
                },
                {
                    pagePath: 'pages/Personal/index',
                    text: '我的',
                    iconPath: './assets/img/personal.png',
                    selectedIconPath: './assets/img/personaled.png',
                },
            ],
            color: '#999',
            selectedColor: '#B365B7',
            borderStyle: 'white',
        },
        permission: {
            'scope.userLocation': {
                desc: '你的位置信息将用于寻找附近商户',
            },
        },
    }

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        )
    }
}

Taro.render(<App />, document.getElementById('app'))
