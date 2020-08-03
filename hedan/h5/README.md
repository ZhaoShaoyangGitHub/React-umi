# quick-work-react-app 项目说明

基层脚手架仓库地址 <https://github.com/facebook/create-react-app>

React-TypeScript 文档 <https://typescript.bootcss.com/tutorials/react.html>

TypeScript 文档 <https://www.tslang.cn/docs/handbook/basic-types.html>

## 运行方式

```bash
#更新和安装依赖
npm ci

#本地查看与开发
npm run start

#生产环境打包发布
npm run build

#打包之后的本地测试
npm run local-serve

```

## 项目 ESlint 风格指南 , 以及 `VSCode` 编辑器配置建议

### VSCode 插件

- ESlint

美化辅助插件

- Prettier

## 脚手架定制化

基于 `react-creat-app` 做了如下个性化定制

- 添加 TypeScript 支持

- 修改 `package.json`中的`browserslist`

- 添加 `.env` 设定环境变量

- 修改 `public\index.html`

  - 新增 meta

- css 预处理器配置

  - 配置 scss , css 的模块化设置
  - 支持 scss

- eslint 配置

  - 定制了基于团队最优的 eslint 配置

## 状态管理和页面通信

Mobx

文档地址
<https://cn.mobx.js.org/>

定义方法参见 `/store` 目录

使用方法参见 `/pages/mobx` 目录

## 演示 demo

基础页面建设

主路由渲染规划

子路由渲染规划

多级路由渲染规划

样式演示模块

请求模块

## 客户端本地存储

store.js

文档地址
<https://github.com/marcuswestin/store.js>

使用方式:

```js
import { localStore } from "@/utils/utils.js";

// Store current user
localStore.set("user", { name: "Marcus" });

// Get current user
localStore.get("user");

// Remove current user
localStore.remove("user");

// Clear all keys
localStore.clearAll();

// Loop over all stored values
localStore.each(function(value, key) {
  console.info(key, "==", value);
});
```

## 实用工具库

Lodash

文档地址
<https://www.lodashjs.com/>

引用官方推荐命名

```js
import _ from "lodash";
import _ from "lodash/core";
import fp from "lodash/fp";
import array from "lodash/array";
import object from "lodash/fp/object";
import at from "lodash/at";
import curryN from "lodash/fp/curryN";
```

注:不建议使用 `React-lodash`
原因: 会降低可读性,增加复杂性

数据处理和视图尽量分开,数据处理完毕之后再进入视图

## style

新增浏览器差异化处理文件

normalize.css

样式模块化和组件局部作用域

```js
import styles from "./index.module.less";
<h2 className={styles.title}>Demo</h2>;
```

如果要像这样模块化使用样式类 , 则 less 或者 css 或者 scss 文件必须以 `xxx.module.less/css/scss` 的形式命名 , 文件名中间必须包含 `.module.`

## js 模块引用的路径别名配置 `Webpack alias`

建议别名使用 @/ 开头而非仅用 @ 开头，因为有小概率会与某些 scoped 形式的 npm 包（如：@babel/core）产生命名冲突。

因此简化配置如下:

```js

  "@": path.resolve("src"),

```

js 中使用:

```js
import { userLogin, getBannerList, getTestToken } from "@/api/Demo";

import routes from "@/pages/routes";
```

css 中使用需要添加 `~` 为前缀:

```css
@import "~@/assets/style/resize.less";
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "experimentalDecorators": true,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src"]
}
```

> 如果遇到第三方库的 @types 声明文件有问题或者干脆没有的 请把 `noImplicitAny` 改为 `false`

## 路由配置"

参见 `/src/pages/routes.ts` 文件

## sitemap 页面

routerView 默认自动生成路由为 `/sitemap` 的页面 , 用于展示项目相关的信息

## docker 发布

修改 `/deploy` 目录下的 `deploy.sh` 文件的内容 ， 然后运行

```bash

npm run deploy

```
