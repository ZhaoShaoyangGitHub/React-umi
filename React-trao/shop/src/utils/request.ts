import Taro from '@tarojs/taro'
import { BASEURL, noConsole } from '../config'
import { commonParame } from '../config/requestConfig'

// 相关类型
declare type Methods = 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

declare type Headers = {
    [key: string]: string
}

declare type Params = {
    [key: string]: any
}

declare type Datas = {
    [key: string]: any
}

// 定义Options接口
interface Options {
    url: string
    host?: string
    method?: Methods
    headers?: Headers
    params?: Params
    data?: Datas
}

interface RequestOpt {
    url: string
    method: Methods
    header: Headers
    // params?: Params;
    data: Datas
}

interface Objects {
    [propsName: string]: any
}

export default async (options: Options): Promise<any> => {
    const token = Taro.getStorageSync('token')

    const _options: RequestOpt = {
        url: BASEURL + options.url,
        data: {
            ...commonParame,
            ...options.data,
        },
        header: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: (options.method ? options.method.toUpperCase() : 'GET') as Methods,
    }
    const response: { [key: string]: any } = await Taro.request(_options)
    if (response.statusCode >= 200 && response.statusCode < 300) {
        if (!noConsole) {
            console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, response)
        }
        if (response.data.code !== 'OK') {
            Taro.showToast({
                title: `${response.data.message}` || response.data.error.code || '请求出错啦',
                icon: 'none',
                mask: true,
                duration: 1500,
            })
        }
        // Taro.showToast({
        //   title: "请求成功",
        //   icon: "none",
        //   mask: true,
        //   duration: 1500
        // });
        return response.data
    } else {
        const errorInfo = {
            ...response.data,
            error: (response.data && response.data.message) || '网络出错！',
        }
        Taro.showToast({
            title: errorInfo.error,
            icon: 'none',
            mask: true,
            duration: 1500,
        })
        throw new Error(`网络请求错误，状态码${response.statusCode}`)
    }
}

// 拦截器
const interceptor = async (chain: Objects) => {
    const { requestParams } = chain

    const res = await chain.proceed(requestParams)
    if (!noConsole) {
        console.log(`from 拦截器:: result:`, res.data.code)
        if (res.data.code === 'Unauthorized') {
            Taro.clearStorageSync()
            Taro.showToast({
                title: '登录过期!',
                icon: 'none',
                duration: 2000,
            })
            Taro.reLaunch({ url: '/pages/UserLogin/index' })
        }
    }
    return res
}

Taro.addInterceptor(interceptor)
