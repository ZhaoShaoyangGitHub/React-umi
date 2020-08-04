<!--
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-05 14:03:32
 * @LastEditTime: 2019-08-22 16:25:18
 -->

# 基于 taro + dva + ts 深度定制小程序脚手架

## 命令相关

/_安装_/
`npm i`

/_启动_/
`npm run dev:weapp`

/_打包_/
`npm run build:weapp`

/_代码风格检查_/
`npm run lint`

/_代码风格修复(部分修复)_/
`npm run fix`

/_一键生成页面 page_/
`npm run page xxx`

/_一键生成组件 component_/
`npm run com xxx`

## vscode 相关插件推荐

- ESlint
- Prettier

## 目录相关

- config taro 配置目录
- dist 整体打包目录
- script 自动脚本目录
  > script/template.js 一键生成 page 的脚本
  > script/component.js 一键生成 component 的脚本
- src/assets 静态资源
- src/components 公众可复用组件
- src/config 项目配置相关
  > config/index.ts 环境配置相关 测试环境/正式环境/是否输出日志信息等
  > config/requestConfig.ts 请求配置相关 公共请求参数/请求映射文件相关
  > config/taroConfig.ts taro 配置相关 改写 taro 方法/Component 挂载分享方法等
- src/models 全局 models 管理
  > models/index.ts 引入每个 page 的 model 并导出，供 app.tsx 使用
- src/pages 页面目录
  > pages/xxx/apis.ts 页面所有 API 相关
  > pages/xxx/index.interface.ts 页面所有类型定义相关
  > pages/xxx/index.tsx 主页面
  > pages/xxx/model.ts 页面 model 相关
  > pages/xxx/xxx.modules.less 页面样式
- src/types 定义全局模块类型声明相关
- src/utils 项目工具类相关
  > utils/common.ts 项目所用到的公众函数
  > utils/dva.ts 配置 dva 相关 是否打印 redux 日志等
  > utils/request.ts 全局请求相关
- app.less 全局样式
- app.tsx app 入口 配置小程序全局样式
- index.html 根 html 文件

* global.d.ts 声明全局引入文件后缀类型/声明判断环境类型
* tsconfig.json 解析 tsx 的配置文件

## 优化点

- 通过运行脚本 npm run page xxx 一键生成页面 page

  > 省去手写 page 目录以及 5 个文件
  > 省去在入口 app.tsx 文件引入相关 page 到 config/pages 数组中（taro 自带路由）
  > 省去在 src/models/index.ts 中引入相关 page 的 model 并导出

- 通过运行脚本 npm run com xxx 一键生成组件 component

  > 省去手写 component 目录以及 3 个文件

- 代码 commmit 之前会进行 eslint 检测，有报错禁止提交（警告可以提交）

  - 解决办法
    > A. 执行命令 `npm run fix` 自动代码修正<部分修正>
    > B. `git commit -m'描述' --no-verify（或者-n）`忽略代码检查<极其不推荐>

- 引入 taroUI

  - 使用方法
    > import { AtButton } from "taro-ui";
    > <AtButton ... />

- 配置别名 alias
  > config/index.js 引入 path 添加 alias 选项
  > tsconfig.json 中配置 paths 避免别名报错

## 相关文档

> Taro https://taro-docs.jd.com/taro/docs/README.html

> Taro 端能力 https://nervjs.github.io/taro/docs/native-api.html

> TaroUI https://taro-ui.jd.com/#/docs/introduction

> Dva https://dvajs.com/api/

> TS https://www.tslang.cn/docs/handbook/compiler-options.html

> ESLint http://eslint.cn/docs/rules/

## 相关问题记录供参考

- 开发环境且没有配置请求路径情况下请求接口报错
  `http://127.0.0.1:3001不在以下 request 合法域名列表中 request:fail url not in domain list`

  > 解决 在根目录 project.config.json 中修改 urlCheck 为 false

- 编译报警告 在 eslint 插件 react 设置中未指定 react 版本
  `Warning: React version not specified in eslint-plugin-react settings. See https://github.com/yannickcr/eslint-plugin-react#configuration .`

  > 解决 .eslintrc 中需配置 react 版本

- 已配置 eslint，运行 npm run lint 后终端报错，而编辑器却不报红

  > 解决 原因是 eslint 插件配置问题，默认不检查 tsx。重新配置 eslint 插件
  > 打开设置 - 工作区 - 搜索 eslint - Eslint:Validate - 编辑 setting.json

  ```js
    {
    "eslint.autoFixOnSave": true,
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            {
            "language": "typescript",
            "autoFix": true
            },
            {
            "language": "typescriptreact",
            "autoFix": true
            }
        ]
    }
  ```

- 运行 npm run dev:weapp 报错`使用循环的 index 变量作为 key 是一种反优化。参考：https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md`

  > 无需解决 这是 taro 自身问题（在 map 中使用了 index 下标做为 key 导致）

- 父组件无法通过 props 向子组件传值的问题
  > 1. 检查在子组件中是否定义了属性类型 和 父组件中子组件属性是否报错
  > 2. 优先查看@tarojs/cli 版本 是否和@tarojs/xxx 相匹配
