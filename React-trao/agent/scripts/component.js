/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-05 14:03:32
 * @LastEditTime: 2019-08-07 10:11:44
 */
/* eslint-disable indent */
/* eslint-disable import/no-commonjs */
/* create by tiger */
const fs = require('fs')

// console.log('process.argv', process.argv)
const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run com test')
    process.exit(0)
}

//页面模板
const indexTep = `import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ${capPirName}Props, ${capPirName}State } from "./index.interface";
import styles from "./index.module.less";

class ${dirName} extends Component<${capPirName}Props, ${capPirName}State> {
    constructor(props: ${capPirName}Props) {
        super(props);
        this.state = {};
    }
    static defaultProps: ${capPirName}Props = {};

    render() {
        return <View className={styles.${dirName}Main}>组件-${dirName.toUpperCase()}</View>;
    }
}

export default ${dirName};
`

// less文件模版
const lessTep = `
.${dirName}Main {
    width: 100%;
 }
`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/components/${dirName}`) // mkdir $1
process.chdir(`./src/components/${dirName}`) // cd $1

fs.writeFileSync(`index.tsx`, indexTep) //tsx
fs.writeFileSync(`index.module.less`, lessTep) // less
fs.writeFileSync(`index.interface.ts`, interfaceTep) // interface
// 打印信息
console.info(`component模版 ${dirName} 已创建, DateNow: ${getNowTime()}`)

/**处理大小写 */
function titleCase(str) {
    const array = str.toLowerCase().split(' ')
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length)
    }
    const string = array.join(' ')
    return string
}
/** 时间 */
function getNowTime() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

// close进程
process.exit(0)
