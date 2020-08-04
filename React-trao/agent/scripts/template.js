/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-05 14:03:32
 * @LastEditTime: 2019-08-07 10:27:05
 */
/* eslint-disable indent */
/* eslint-disable import/no-commonjs */
/* create by tiger */
const fs = require('fs')

const HOMEPAGE = 'Home'
const HEADERINFO = `/* \n * create by tiger \n * Time:${getNowTime()} \n */ \n`

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run tep test')
    process.exit(0)
}

//页面模板
const indexTep = `
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { ${capPirName}Props, ${capPirName}State } from './index.interface'
import styles from './${dirName}.module.less'
// import { } from '../../components'

@connect(({ ${dirName} }) => ({
    ...${dirName}
}))
class ${dirName} extends Component<${capPirName}Props, ${capPirName}State > {
    config: Config = {
        navigationBarTitleText: "标题"
    };
    constructor(props: ${capPirName}Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <View className={styles.${dirName}Main}>${dirName.toUpperCase()}</View>;
    }
}

export default ${dirName};
`

// less文件模版
const lessTep = `
.${dirName}Main {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
// const configTep = `
// export default {
//   test: '/wechat/perfect-info', //xxx接口
// }
// `;
// 接口请求模板
const apisTep = `
import Request from "../../utils/request";

export const demo = data =>
    Request({
        url: "/api/demo",
        method: "GET",
        data
    });
`

//model模板

// const modelTep = `
// // import Taro from '@tarojs/taro';
// import * as ${dirName}Api from './service';

// export default {
//   namespace: '${dirName}',
//   state: {
//   },

//   effects: {},

//   reducers: {}

// }
// `;
const modelTep = `import * as ${dirName}Api from './apis';

export default {
    namespace: '${dirName}',
    state: {
        ${dirName}DataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ${dirName}DataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(${dirName}Api.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};`
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
export interface ${capPirName}Props {
  dispatch?: any;
}


`

fs.mkdirSync(`./src/pages/${dirName}`) // mkdir $1
process.chdir(`./src/pages/${dirName}`) // cd $1

fs.writeFileSync(`index.tsx`, indexTep) //tsx
fs.writeFileSync(`${dirName}.module.less`, lessTep) // less
// fs.writeFileSync("config.ts", configTep); // config
fs.writeFileSync('apis.ts', apisTep) // service
fs.writeFileSync('model.ts', modelTep) // model
fs.writeFileSync(`index.interface.ts`, interfaceTep) // interface

/*
 * 处理app.tsx
 * from [/src/pages/..] to [/src/..]
 */
process.chdir('../../')
let appStr = fs.readFileSync('app.tsx', 'utf-8')
let pagesDir = fs.readdirSync('./pages', 'utf-8')
pagesDir = pagesDir.filter(item => {
    return item !== '.DS_Store' && item !== 'Home'
})
// home组件
pagesDir.unshift(HOMEPAGE)
let setPagesDir = []
pagesDir.forEach(item => {
    // get all pages name from /pages/...
    setPagesDir.push('pages/' + item + '/index')
})
// 以防万一 转字符串
setPagesDir = JSON.stringify(setPagesDir)
// console.log("setPagesDir", setPagesDir);
// reg规则
// 无空格匹配任意字母
// let appReg = /pages:\s+\[([\s\S]+?)\]/;
// 多行匹配 整体替换
// let appReg = /"pages\/[\s\S]+[^\]\,]/im;
// 仅支持一行匹配
// let appReg = /pages\:.*\]\,/g;
// 匹配空格/s
const appReg = /pages:\s+\[([\s\S]+?)\]/

// replace
appStr = appStr.replace(appReg, () => {
    return `pages: ${setPagesDir}`
})

// 写入app.tsx
fs.writeFileSync('app.tsx', appStr)
// fs.writeFileSync("app.tsx", HEADERINFO + appStr);

/* 处理model */
let modelsDir = fs.readdirSync('./pages', 'utf-8')
// 过滤
modelsDir = modelsDir.filter(item => {
    return item !== '.DS_Store'
})
let newModelStr = ''
modelsDir.forEach((item, index) => {
    // 处理换行
    newModelStr +=
        index === modelsDir.length - 1
            ? `import ${item} from "../pages/${item}/model";\n\n`
            : `import ${item} from "../pages/${item}/model";\n`
})

const exportStr = `export default [${modelsDir}];`
// 拼接
const finalExportStr = HEADERINFO + newModelStr + exportStr
// 写入
fs.writeFileSync('./models/index.ts', finalExportStr)

// 打印信息
console.info(`page模版${dirName}已创建,入口app.tsx和models/index.ts已重新配置.DateNow: ${getNowTime()}`)

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
