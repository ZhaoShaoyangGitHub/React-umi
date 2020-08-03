/*
  注意: 目前 RouterView 组件路径不支持 *通配符* 写法
  如: "/message/:id" 这种写法是不被支持的 , 将来也不打算支持 😜
  只能支持 "/目录/目录/目录" 的写法
  (ps:因为支持通配符部分的代码写起来比较繁琐)
*/

const routes: routes = {
  "/": {
    name: "落地页",
    title: "盒DAN",
    describe: "参数: @id  用于接收邀请码并存储",
  },
  // "/out_wx": {
  //   name: "微信中转页",
  //   title: "盒DAN",
  //   describe: "参数: @url - 要打开的页面地址",
  // },

  // "/demo": {
  //   name: "demo页面",
  //   title: "演示页面",
  //   describe: "演示demo",
  //   routes: {
  //     "/demo/hello_ts": {
  //       name: "TS 基础功能 演示",
  //     },
  //     "/demo/mobx": {
  //       name: "mobx 演示",
  //       title: "mobx 演示",
  //     },
  //     "/demo/request": {
  //       name: "ajax 异步请求以及 Promise + await 演示",
  //     },
  //     "/demo/style_demo": {
  //       name: "style 演示 + 三级路由渲染测试",
  //       routes: {
  //         "/demo/style_demo/css_demo": {
  //           name: "css module 演示",
  //           component: require("@/pages/demo/style_demo/css_demo"),
  //         },
  //         "/demo/style_demo/scss_demo": {
  //           name: "scss module 演示",
  //         },
  //       },
  //     },
  //   },
  // },
  "*": {
    name: "404",
    title: "NotFound",
    describe: "404页面",
  },
};

export default routes;
