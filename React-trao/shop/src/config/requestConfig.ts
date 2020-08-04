interface Objects {
  [key: string]: string;
}

/**
 * 公共请求参数
 */
export const commonParame: Objects = {
    // platform: "wap",
    // rent_mode: 2
};

/**
 * 请求映射文件
 */
export const requestConfig: Objects = {
    loginUrl: "/api/user/wechat-auth" // 微信登录...
};
