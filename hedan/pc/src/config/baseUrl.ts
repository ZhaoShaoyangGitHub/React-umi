//baseUrl
// let url = 'https://xcx.joywaygym.com'; //生产服
const url = "http://ip-29-shanhusecurity-app.coralcodes.com"; //测试服
// let url = 'http://ip-29-shanhusecurity-app.coralcodes.com'; //UAT

export const baseUrl = url;

// 版本信息管理
export const versionList: versionList = [
  {
    code: "0.4.1",
    describe: "加入下载链接",
    author: "Mark",
    time: "2020年3月13日 18点20分",
  },
  {
    code: "0.4.0",
    describe: "PC端优化,生产环境发布",
    author: "Mark",
    time: "2020年3月10日 16点50分",
  },
  {
    code: "0.3.0",
    describe: "生产环境发布",
    author: "Mark",
    time: "2020年2月7日 06点21分",
  },
  {
    code: "0.2.0",
    describe: "添加scss支持",
    author: "Mark",
    time: "2019-06-18 00:03:43",
  },
  {
    code: "0.1.0",
    describe: "Public_React_WebApp_TS",
    author: "Mark",
    time: "2019年6月18日 00点03分",
  },
];

export const printVersion = () => {
  const version = versionList[0];
  console.groupCollapsed(
    `%c version -- ${version.code}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c describe -- ${version.describe}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info(
    `%c user -- ${version.author}`,
    "font-size:10;color:green;font-weight:bold;",
  );
  console.info("调试请把窗口调节至 960*540");
  console.groupEnd();
};
