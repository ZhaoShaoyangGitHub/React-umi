import routes from "@/pages/routes";

export const splitPath = (path: string): Array<string> => {
  const pathArr: Array<string> = [];
  const split_chars = "/";
  const arr = path.split(split_chars);
  let str = "";
  arr.forEach((item) => {
    if (item) {
      str += `${split_chars}${item}`;
      pathArr.push(str);
    }
  });
  if (path === "/") {
    return ["/"];
  }
  return pathArr;
};

export const findRoute = (path: string): route | undefined => {
  const pathArr = splitPath(path);
  let returnRoute: any = routes;
  pathArr.forEach((item, index) => {
    if (index === 0) {
      returnRoute = returnRoute[item];
    } else {
      returnRoute = returnRoute.routes[item];
    }
  });
  return returnRoute;
};

export const getRouterList = (path = ""): Array<routeData> | undefined => {
  let routeDataList: Array<routeData> | undefined;
  if (path) {
    const route = findRoute(path);
    if (route && route.routes) {
      const routes = route.routes;
      routeDataList = formatRouteList(routes);
    }
  } else {
    routeDataList = formatRouteList(routes);
  }
  return routeDataList;
};

//utils
function formatRouteList(routes: routes): Array<routeData> {
  const routeList = [];
  // 这里判断例外条件
  for (const key in routes) {
    const el = routes[key];
    if (key !== "/" && key !== "*") {
      const router = filterRouter(key, el);
      routeList.push(router);
    }
  }
  //优先进行精确查找
  routeList.sort((a, b) => {
    return Number(b.exact) - Number(a.exact);
  });
  if (routes["/"]) {
    routeList.unshift(filterRouter("/", routes["/"]));
  }
  if (routes["*"]) {
    routeList.push(filterRouter("*", routes["*"]));
  }
  return routeList;
}

function filterRouter(path: string, el: route): routeData {
  let module = null;
  if (el.component) {
    module = el.component;
  } else {
    //
    let module_path = path;
    if (path === "/") {
      module_path = "/index";
    }
    if (path === "*") {
      module_path = "/404";
    }
    module_path = module_path.replace("/*", "/404");
    module = require(`@/pages${module_path}`);
    //
  }

  if (module && module.default) {
    //Do something
  } else {
    console.error(`页面组件出现了问题,请检查: ${path}`);
  }
  let exact = true;
  if (el.routes && Object.keys(el.routes)) {
    exact = false;
  }
  const obj = {
    exact,
    path,
    component: module.default,
  };
  return obj;
}

export const isChildRoute = ({
  father,
  child,
}: {
  father: string;
  child: string;
}) => {
  if (child.includes(father)) {
    return true;
  } else {
    return false;
  }
};
