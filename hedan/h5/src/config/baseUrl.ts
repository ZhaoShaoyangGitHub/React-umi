//baseUrl
// let url = 'https://xcx.joywaygym.com'; //生产服
const url = "http://ip-29-shanhusecurity-app.coralcodes.com"; //测试服
// let url = 'http://ip-29-shanhusecurity-app.coralcodes.com'; //UAT

export const baseUrl = url;

// 版本信息管理
export const versionList: versionList = [
  {
    code: "1.4",
    describe: "组件级别的热更新",
    author: "Mark",
    time: "2020-05-11 15:51:39",
  },
  {
    code: "1.3",
    describe: "清除多余分支",
    author: "Mark",
    time: "2020-05-11 12:52:55",
  },
  {
    code: "1.2",
    describe: "玩具守护者第三期BUG修复",
    author: "Mark",
    time: "2020-05-09 13:45:344",
  },
  {
    code: "1.1",
    describe: "玩具守护者第三期",
    author: "Mark",
    time: "2020-05-08 15:44:04",
  },
  {
    code: "1.0",
    describe: "玩具守护者第二期",
    author: "Mark",
    time: "2020-05-07 14:31:39",
  },
  {
    code: "0.99",
    describe: "帮助中心的提交，和ios的事件交互",
    author: "Mark",
    time: "2020-04-27 16:09:37",
  },
  {
    code: "0.9.9.1",
    describe: "图片替换发一版生产~",
    author: "Mark",
    time: "2020年3月13日 16点53分",
  },
  {
    code: "0.9.9",
    describe: "展会类型的资讯跳转至展会主页",
    author: "Mark",
    time: "2020年3月13日 15点33分",
  },
  {
    code: "0.9.8",
    describe: "66说的,发版",
    author: "Mark",
    time: "2020年3月11日 16点18分",
  },
  {
    code: "0.9.7",
    describe: "活动完成",
    author: "Mark",
    time: "2020年3月11日 11点42分",
  },
  {
    code: "0.9.6",
    describe: "主要是更换了一下午的图片",
    author: "Mark",
    time: "2020年3月10日 19点43分",
  },
  {
    code: "0.9.5",
    describe: "玩具守护者修改细节,等待切图",
    author: "Mark",
    time: "2020年3月4日 16点59分",
  },
  {
    code: "0.9.4",
    describe: "玩具守护者完成",
    author: "Mark",
    time: "2020年3月4日 16点59分",
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
  console.groupEnd();
};
