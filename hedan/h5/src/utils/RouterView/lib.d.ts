/*
 * @LastEditors: Mark
 * @Description: RouterView 用的声明文件
 *
 * 命名规范:
 *
 * routes 指用户填写的对应的列表
 *
 * route 指代其中的元素
 *
 * path 指代对应的而页面路由
 *
 * routeData 指代 'react-router-dom' 中抽象出来的 Route
 *
 *
 * @Author: Mark
 * @Date: 2019-07-02 20:19:47
 * @LastEditTime: 2019-07-02 20:20:55
 */

declare interface route {
  name: string;
  component?: ReactNode;
  title?: string;
  describe?: string;
  routes?: routes;
}

declare interface routes {
  [propName: string]: route;
}

declare interface routeData {
  exact: boolean;
  path: string;
  component: ReactNode;
}
