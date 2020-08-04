import Taro, { Component } from "@tarojs/taro";

/**
 * 改写navigateTo方法
 * navigateTo 超过8次之后 强行进行redirectTo 否则会造成页面卡死
 */
const nav = Taro.navigateTo;
Taro.navigateTo = data => {
    if (Taro.getCurrentPages().length > 8) {
        return Taro.redirectTo(data);
    }
    return nav(data);
};

/**
 * Component挂载分享方法 全局的分享信息
 */
const SHAREINFO = {
    title: "分享标题",
    path: "路径",
    imageUrl: "图片"
};
Component.prototype.onShareAppMessage = function() {
    return SHAREINFO;
};
