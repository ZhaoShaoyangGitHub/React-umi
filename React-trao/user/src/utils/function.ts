/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-17 13:17:55
 * @LastEditTime: 2019-08-26 14:25:56
 */
import moment from 'moment'
import Taro from '@tarojs/taro'
/**
 * 验证手机号11位有效数字
 */
export const isPoneAvailable = (input) => {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(input)) {
        return false
    } else {
        return true
    }
}

/**
 * 获取今天日期
 */
export const getToday = (time?: string) => {
    //获取时间
    const date: any = time ? new Date(time) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + '-' + month + '-' + day
}

/**
 * 检测中文
 */
export const IsChn = (str: string): any => {
    const len = str.length
    const _hArr = str.match(/[^\x00-\x80]/g) || []
    if (len !== _hArr.length) {
        return false
    } else {
        return true
    }
}

export const countDown = (time: any): string => {
    const date = new Date()
    const dateDiff = date.getTime() - time.getTime()
    return (dateDiff / 1000).toFixed(0)
}
export const flatten = (array: Array<any>) => {
    if (Array.isArray(array)) {
        return array.reduce((acc, val) => {
            return acc.concat(val)
        }, [])
    } else {
        throw Error('格式错误')
    }
}
/**
 * 计算距离现在的剩余时间 显示到秒
 * @param startTime 开始时间 ms时间戳
 * @param duration 持续时间 ms数
 * @param showSecond 是否显示秒数 boolean
 * @return {Promise<any>}
 */
export const getRestTime = (startTime, duration, showSecond = true) => {
    const countMs = Number(startTime) + Number(duration) - moment().valueOf() // ms
    if (countMs < 0) return ''
    const count = countMs / 1000
    const day = parseInt(String(count / 60 / 60 / 24), 10)
    let remainTime = count - day * 60 * 60 * 24
    const hour = parseInt(String(remainTime / 60 / 60), 10)
    const hourStr = hour < 10 ? `0${hour}` : hour
    remainTime = remainTime - hour * 60 * 60
    const minute = parseInt(String(remainTime / 60), 10)
    const minuteStr = minute < 10 ? `0${minute}` : minute
    remainTime = remainTime - minute * 60
    const second = parseInt(String(remainTime), 10)
    const secondStr = second < 10 ? `0${second}` : second
    const dd = day === 0 ? '' : `${day}天`
    const hh = hourStr === '00' ? '' : `${hourStr}小时`
    const ss = showSecond ? `${secondStr}秒` : ''
    const restTime = `${dd}${hh}${minuteStr}分${ss}`
    return restTime
}
