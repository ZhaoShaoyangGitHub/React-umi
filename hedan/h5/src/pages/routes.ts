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
  "/out_wx": {
    name: "微信中转页",
    title: "盒DAN",
    describe: "参数: @url - 要打开的页面地址",
  },
  "/help": {
    name: "帮助与反馈",
    title: "帮助与反馈 - 盒DAN",
    describe: "参数:无",
  },
  "/help_detail": {
    name: "帮助与反馈详情",
    title: "帮助与反馈 - 盒DAN",
    describe: "参数:@id",
  },
  "/help_submit": {
    name: "帮助与反馈",
    title: "帮助与反馈 - 盒DAN",
    describe: "参数:无",
  },
  "/invite": {
    name: "邀请码说明页",
    title: "邀请码说明 - 盒DAN",
    describe: "参数:无",
  },
  "/agreement": {
    name: "用户协议",
    title: "用户协议 - 盒DAN",
    describe: "参数:无",
  },
  "/privacy": {
    name: "隐私协议",
    title: "隐私协议 - 盒DAN",
    describe: "参数:无",
  },
  "/specification": {
    name: "社区规范",
    title: "社区规范 - 盒DAN",
    describe: "参数:无",
  },
  "/faq": {
    name: "常见问题",
    title: "常见问题 - 盒DAN",
    describe: "参数:无",
  },
  "/user": {
    name: "个人主页",
    title: "个人主页 - 盒DAN",
    describe: "参数: @userId ",
  },
  "/source": {
    name: "分享来源落地页",
    title: "机器人资讯 - 盒DAN",
    describe: "参数: @toySeriesId ",
  },
  "/exhibition": {
    name: "展会捕捉设置主页落地页",
    title: "展会资讯主页 - 盒DAN",
    describe: "参数: @detailId ",
  },
  "/dynamic_user": {
    name: "用户动态落地页",
    title: "用户动态 - 盒DAN",
    describe: "参数: @commentId ",
  },
  "/topic": {
    name: "话题落地页",
    title: "话题 - 盒DAN",
    describe: "参数: @topicId ",
  },
  "/local": {
    name: "地理位置",
    title: "位置 - 盒DAN",
    describe: "参数: @locationId ",
  },
  "/brand": {
    name: "玩具品牌",
    title: "玩具品牌 - 盒DAN",
    describe: "参数: @brandId ",
  },
  "/toy_detail": {
    name: "玩具落地页",
    title: "玩具 - 盒DAN",
    describe: "参数: @toySeriesId ",
  },
  "/toy_chest": {
    name: "玩具柜",
    title: "玩具柜 - 盒DAN",
    describe: "参数: @userId ",
  },
  "/hunter": {
    name: "Hunter",
    title: "关于ToysHunter",
    describe: "参数: 无 ",
  },
  "/sticker": {
    name: "玩具贴纸库",
    title: "玩具贴纸库 - 盒DAN",
    describe: "参数: 无 ",
  },
  "/sticker_detail": {
    name: "玩具贴纸库详情",
    title: "玩具贴纸库详情 - 盒DAN",
    describe: "参数: 无 ",
  },
  "/activity": {
    name: "活动",
    title: "盒DAN",
    describe: "参数:token ",
    routes: {
      /*
        该页面子路由配置已经转移到 `src/pages/activity/index.tsx`
        本处的子路由配置已废弃
       */
      "/activity/guardians": {
        component: require("@/pages/activity/guardians"),
        title: "盒DAN - 玩具守护者",
        name: "玩具守护者",
      },
      "/activity/task": {
        component: require("@/pages/activity/task"),
        title: "玩具守护者 - 盒DAN",
        name: "玩具守护者",
      },
      "/activity/progress_check": {
        component: require("@/pages/activity/progress_check"),
        title: "玩具守护者 - 任务进度",
        name: "玩具守护者",
      },
      "/activity/draw": {
        component: require("@/pages/activity/draw"),
        title: "抽奖 - 盒DAN",
        name: "玩具抽奖守护者",
      },
    },
  },
  // "/demo": {
  //   name: "demo页面",
  //   title: "演示页面",
  //   describe: "演示demo",
  //   routes: {
  //     "/demo/hello_ts": {
  //       name: "TS 基础功能 演示",
  //     },
  //     "/demo/img_color": {
  //       name: "img取色演示",
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
