import Qs from "qs";
import store from "store";

export const localStore = store;

export const getUrlParam = (url = "") => {
  /**
   * @description: 获取当前页面的参数或者指定字符串的参数
   * @param null
   * @return: {*}
   */
  const search: string = url || window.location.search;

  return Qs.parse(search, { ignoreQueryPrefix: true });
};

export const moneyNum = (num: string | number): string => {
  if (Number(num)) {
    return Number(num).toFixed(2);
  } else {
    return "0.00";
  }
};

export const gzipImg = (url: string, w: number | string = 200): string => {
  return `${url}?imageView2/2/w/${w}`;
};
