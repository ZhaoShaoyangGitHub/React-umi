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
            'pages/ApplyRefund/index',
            'pages/TransferPackage/index',
            'pages/EditScheduling/index',
            'pages/BusinessSituation/index',
            'pages/OverviewStore/index',
            'pages/OverviewMember/index',
            'pages/OverviewGoods/index',
            'pages/OverviewEmployee/index',
            'pages/SaleOrderList/index',
            'pages/TechnicianDetail/index',
            'pages/TechnicianOperation/index',
            'pages/TechnicianList/index',
            'pages/StockList/index',
            'pages/AppointmentList/index',
            'pages/TechnicianScheduling/index',
            'pages/StartScheduling/index',
            'pages/StartPackage/index',
            'pages/SelectPackage/index',
            'pages/PackageSelect/index',
            'pages/PackageSchedul/index',
            'pages/PayResult/index',
            'pages/SchedulSelectUser/index',
            'pages/OrderDetail/index',
            'pages/MyAchievement/index',
            'pages/ArticleDetails/index',
            'pages/AttendanceCalendar/index',
            'pages/AttendanceStatistics/index',
            'pages/AttendanceTime/index',
            'pages/DateDetail/index',
            'pages/EditInfo/index',
            'pages/EditProfile/index',
            'pages/EndServeies/index',
            'pages/GoodList/index',
            'pages/LearningCenter/index',
            'pages/LoginAgreement/index',
            'pages/MemberConsumption/index',
            'pages/MemberDetails/index',
            'pages/MemberInformation/index',
            'pages/MemberSearch/index',
            'pages/MemberServicesDetails/index',
            'pages/Message/index',
            'pages/ModifyMobileNumber/index',
            'pages/ModifyPassword/index',
            'pages/MyCollection/index',
            'pages/MySubscribe/index',
            'pages/OrderConfirm/index',
            'pages/OrderDetails/index',
            'pages/OrderSearch/index',
            'pages/Personal/index',
            'pages/PersonalData/index',
            'pages/RegisterUser/index',
            'pages/SelectUser/index',
            'pages/SetUserInfo/index',
            'pages/ServiceRecord/index',
            'pages/ServiceDetails/index',
            'pages/Shop/index',
            'pages/StoreCover/index',
            'pages/StoreInfo/index',
            'pages/StorePhotoAlbum/index',
            'pages/UserLogin/index',
            'pages/UserSetting/index',
            'pages/WriteOff/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#b55fb2',
            navigationBarTitleText: '荣月',
            navigationBarTextStyle: 'white',
        },
        tabBar: {
            list: [
                {
                    pagePath: 'pages/Home/index',
                    text: '首页',
                    iconPath: './assets/img/bottomBar/home-iconed.png',
                    selectedIconPath: './assets/img/bottomBar/home-icon.png',
                },
                {
                    pagePath: 'pages/Message/index',
                    text: '消息',
                    iconPath: './assets/img/bottomBar/message-iconed.png',
                    selectedIconPath: './assets/img/bottomBar/message-icon.png',
                },
                {
                    pagePath: 'pages/Shop/index',
                    text: '门店',
                    iconPath: './assets/img/bottomBar/shop-iconed.png',
                    selectedIconPath: './assets/img/bottomBar/shop-icon.png',
                },
                {
                    pagePath: 'pages/Personal/index',
                    text: '我的',
                    iconPath: './assets/img/bottomBar/personal-iconed.png',
                    selectedIconPath: './assets/img/bottomBar/personal-icon.png',
                },
            ],
            color: '#999',
            selectedColor: '#B365B7',
            backgroundColor: 'white',
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
