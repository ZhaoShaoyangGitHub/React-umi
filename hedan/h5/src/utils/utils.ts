/* eslint-disable no-useless-escape */
import Qs from "qs";
import store from "store";
const win: any = window;

export const localStore = store;

export const getUrlParam = (url = "") => {
  /**
   * @description: 获取当前页面的参数或者指定字符串的参数
   * @param null
   * @return: {*}
   */
  const search: string = url || window.location.search;

  return Qs.parse(search, {ignoreQueryPrefix: true});
};

export const moneyNum = (num: string | number): string => {
  if (Number(num)) {
    return Number(num).toFixed(2);
  } else {
    return "0.00";
  }
};

export const pureData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export const doubleDigit = (num: any) => {
  if (Number(num) > 9) {
    return num;
  } else {
    return `0${num}`;
  }
};

export const formatDate = (time: any) => {
  const nowYear = new Date().getFullYear();

  const _time = new Date(time);
  const _year = _time.getFullYear();

  const _month = _time.getMonth() + 1;
  const _day = _time.getDate();
  const _hour = _time.getHours();
  const _minutes = _time.getMinutes();
  let originalTime = `${doubleDigit(_month)}.${doubleDigit(_day)} ${doubleDigit(
    _hour,
  )}:${doubleDigit(_minutes)}`;

  if (nowYear - _year > 0) {
    originalTime = `${_year}.${originalTime}`;
  }

  if (_month && _day) {
    return originalTime;
  } else {
    return "";
  }
};

// 转为unicode 编码
export const encodeUnicode = (str: string) => {
  const res = [];
  for (let i = 0; i < str.length; i++) {
    res[i] = `00${str.charCodeAt(i).toString(16)}`.slice(-4);
  }
  return `\\u${res.join("\\u")}`;
};

// 解码
export const decodeUnicode = (str: string) => {
  const Str = str.replace(/\\/g, "%");
  return unescape(Str);
};

export const parseUrl = (Url: string) => {
  let url: any = Url;
  const r: any = {
    protocol: /([^\/]+:)\/\/(.*)/i,
    host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
    port: /\:?([^\/]*)(\/?.*)/,
    pathname: /([^\?#]+)(\??[^#]*)(#?.*)/,
  };

  let tmp: any;
  const res: any = {};
  res["href"] = url;
  for (const p in r) {
    tmp = r[p].exec(url);
    res[p] = tmp[1];
    url = tmp[2];
    if (url === "") {
      url = "/";
    }
    if (p === "pathname") {
      res["pathname"] = tmp[1];
      res["search"] = tmp[2];
      res["hash"] = tmp[3];
    }
  }
  return res;
};

export const openApp = (Url?: string) => {
  const {test} = getUrlParam();
  const browserType = win.markComm.browserType();

  let urlObj: any = {};
  if (Url) {
    urlObj = parseUrl(Url as any);
  } else {
    urlObj = window.location;
  }
  const {search, pathname} = urlObj;
  const AppLink = `hedan:/${pathname}${search}`;
  openLink();

  function openLink() {
    if (test) {
      //
    } else {
      console.info("打开了APP", AppLink);
      window.location.href = AppLink;
    }
  }
};

export const gzipImg = (url: string, w: number | string = 200): string => {
  return `${url}?imageView2/2/w/${w}`;
};

export const diffDays = (value: number) => {
  //计算出相差天数
  const days = Math.floor(value / (24 * 3600 * 1000));

  //计算出小时数

  const leave1 = value % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);

  return `${days}天${hours}小时${minutes}分钟${seconds}秒`;
};

// 随机整数
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isPoneAvailable = (input: any) => {
  const reg: any = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (reg.test(input)) {
    return true;
  } else {
    return false;
  }
};
