export const PROJECT_DETAIL = {name: process.env.REACT_APP_PROJECT_NAME};
export const HTML_FONTSIZE = process.env.REACT_APP_HTML_FONTSIZE;
export const APPSTORE_LINK =
  "https://itunes.apple.com/cn/app/id1490979774?mt=8";

export const ANDROID_LINK = "http://file.hedan.art/app-IPSIT-release.apk";

export const URLCHEME = "hedan:/";

export const USER_DESC = "这个人一心盘娃，无心写签名 ( •̅_•̅ )";

const win: any = window;

export const isLink_outwx = () => {
  const browserType = win.markComm.browserType();
  console.info(browserType);
  let isLink_outwx = false;
  if (browserType.isWeibo || browserType.isWeChat || browserType.isQQ) {
    isLink_outwx = true;
  }
  return isLink_outwx;
};

//默认用户主页背景
export const DefaultUserBg = "http://file.hedan.art/mybg.svg";

//机器人资讯
export const DefaultRobotImg = require("@/assets/image/robotdefault.svg")
  .default;

//分享卡占位图

export const DefaultShareImg = require("@/assets/image/default_share_img.svg")
  .default;

//话题头像占位图

export const DefaultTopicAvatar = require("@/assets/image/default_topic.svg")
  .default;

// 品牌背景默认占位图

export const DefaultTopicCard = require("@/assets/image/default_topic_card.svg")
  .default;
