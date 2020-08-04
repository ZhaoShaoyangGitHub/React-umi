/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-17 13:17:55
 * @LastEditTime: 2019-08-17 13:19:32
 */
export const countDown = (time: any): string => {
    const date = new Date()
    const dateDiff = date.getTime() - time.getTime()
    return (dateDiff / 1000).toFixed(0)
}
export const timestampToTime = (timestamp) => {
    const _now = new Date(timestamp)
    const year = _now.getFullYear()
    const month = _now.getMonth() + 1
    const date = _now.getDate()
    const hour = _now.getHours()
    const minute = _now.getMinutes()
    // const second = _now.getSeconds()
    return (
        year +
        '-' +
        (month > 10 ? month : '0' + month) +
        '-' +
        (date > 10 ? date : '0' + date) +
        ' ' +
        (hour > 10 ? hour : '0' + hour) +
        ':' +
        (minute > 10 ? minute : '0' + minute)
    )
}

/**
 * 获取时间
 */
export const getToday = (time?: string) => {
    const date: any = time ? new Date(time) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return (year > 9 ? year : '0' + year) + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
}

/**
 * 获取时分秒
 */
export const getTime = (time?: any) => {
    const date: any = time ? new Date(time) : new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return (
        (hour > 9 ? hour : '0' + hour) +
        ':' +
        (minute > 9 ? minute : '0' + minute) +
        ':' +
        (second > 9 ? second : '0' + second)
    )
}

/**
 * 获取时分
 */
export const getHoursMin = (time?: any) => {
    const date: any = time ? new Date(time) : new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
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

export const flatten = (array: Array<any>) => {
    if (Array.isArray(array)) {
        return array.reduce((acc, val) => {
            return acc.concat(val)
        }, [])
    } else {
        throw Error('格式错误')
    }
}

export const addComma = (num: number, fixed = 0) => {
    let input = 0
    switch (typeof num) {
        case 'string':
            input = parseInt(num, 10)
            break
        case 'number':
            input = num
            break
        default:
            input = NaN
    }
    if (Number.isNaN(input)) return NaN
    let arr = input.toFixed(fixed).split('.')
    let fractionStr = arr[1] ? '.' + arr[1] : ''
    let integerStr = arr[0]
    let count = 0
    let commaInt = ''
    for (let i = integerStr.length - 1; i >= 0; i--) {
        commaInt += integerStr[i]
        count++
        if (count >= 3 && i !== 0) {
            commaInt += ','
            count = 0
        }
    }
    commaInt = commaInt.split('').reverse().join('')
    return commaInt + fractionStr
}

/**
 * 验证手机号11位有效数字
 */
export const isPoneAvailable = (input) => {
    const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
    if (!reg.test(input)) {
        return false
    } else {
        return true
    }
}
