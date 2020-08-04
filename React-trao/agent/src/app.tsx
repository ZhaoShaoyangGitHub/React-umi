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
            'pages/StoreBalance/index',
            'pages/Recharge/index',
            'pages/StoreBalanceDetail/index',
            'pages/AddPackage/index',
            'pages/ApplyExchangeGoods/index',
            'pages/AppointmentList/index',
            'pages/ArticleDetails/index',
            'pages/BusinessSituation/index',
            'pages/Cart/index',
            'pages/ChooseStore/index',
            'pages/GoodList/index',
            'pages/JoinOrderList/index',
            'pages/LearningCenter/index',
            'pages/LoginAgreement/index',
            'pages/MemberConsumption/index',
            'pages/MemberDetails/index',
            'pages/MemberInformation/index',
            'pages/MemberSearch/index',
            'pages/MemberServicesDetails/index',
            'pages/MyCollection/index',
            'pages/MyPackage/index',
            'pages/MyStore/index',
            'pages/ModifyPassword/index',
            'pages/OrderConfirm/index',
            'pages/OrderList/index',
            'pages/OverviewEmployee/index',
            'pages/OverviewGoods/index',
            'pages/OverviewMember/index',
            'pages/OverviewStore/index',
            'pages/PackageDetails/index',
            'pages/PackageSelect/index',
            'pages/PayResult/index',
            'pages/Personal/index',
            'pages/SaleOrderList/index',
            'pages/ServiceRecord/index',
            'pages/StockList/index',
            'pages/ShopSearch/index',
            'pages/StoreCover/index',
            'pages/Store/index',
            'pages/StoreInfo/index',
            'pages/StoreManagement/index',
            'pages/StorePhotoAlbum/index',
            'pages/TechnicianScheduling/index',
            'pages/TechnicianList/index',
            'pages/TechnicianDetail/index',
            'pages/TechnicianOperation/index',
            'pages/UserLogin/index',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#FFFFFF',
            navigationBarTitleText: '荣月',
            navigationBarTextStyle: 'black',
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
                    pagePath: 'pages/StoreManagement/index',
                    text: '门店管理',
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
