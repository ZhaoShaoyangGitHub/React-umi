import React from "react";
import Avatar from "@/components/Avatar";

//路由模式切换
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { HashRouter as Router,  Route } from 'react-router-dom';
//路由模式切换 -- end

//路由组件
import { RouterView, findRoute } from "@/utils/RouterView";
//路由组件 -- end

//请求设置
import { $axios_set_default } from "@/utils/http"; //设定请求

//请求设置 -- end

// Mobx
import { Provider } from "mobx-react";
import * as store from "@/store/index";

import { getUrlParam, localStore, openApp } from "@/utils/utils";

import { isLink_outwx } from "@/config/constants";
// Mobx -- end

$axios_set_default();

//浏览器视口的高度
function getWindowHeight() {
  let windowHeight = 0;
  if (document.compatMode === "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

class BaseRouter extends React.Component<props> {
  //全局的路由变化监听
  componentDidMount() {
    const { token } = getUrlParam(); // 接收token参数.进行存储
    if (token) {
      localStore.set("token", token);
    }
    this.watchRouter();
    this.showMastFooter();

    //去除loding
    const Elem: any = document.getElementById("load_public");
    if (Elem) {
      Elem.parentNode.removeChild(Elem);
    }
  }

  timer: any = null;

  showMastFooter = () => {
    const _this = this;
    const rootElm: any = window.document.getElementById("root");
    rootElm.onscroll = () => {
      const top = rootElm.scrollTop;
      const elemHeight = rootElm.clientHeight;
      const scrollHeight = rootElm.scrollHeight;
      clearTimeout(_this.timer);
      _this.timer = setTimeout(() => {
        const isFooterNum = scrollHeight - top - elemHeight;
        setFooterMaskElm(isFooterNum);
      }, 100);
    };

    function setFooterMaskElm(isFooterNum: number) {
      const footerMaskElm: any = document.getElementById("footerMask");
      if (footerMaskElm) {
        if (isFooterNum < 30) {
          footerMaskElm.style.opacity = 1;
        } else {
          footerMaskElm.style.opacity = 0;
        }
      }
    }
  };

  UNSAFE_componentWillReceiveProps() {
    this.watchRouter();
  }

  watchRouter = () => {
    this.setTitle();
  };

  setTitle = () => {
    const { pathname } = this.props.history.location;
    const route = findRoute(pathname);
    if (route && route.title) {
      window.document.title = route.title;
    }
  };

  /*
    在这里你完全可以采用两种路由管理模式:
    使用 `RouterView` 组件并将配置文件写在 `src/pages/routes.ts`:
  */
  render() {
    return <RouterView path="" />;
  }
  // 或者采用传统方式:
  // render() {
  //   return (
  //     <Switch>
  //       <Route
  //         exact={true}
  //         path="/"
  //         component={require("@/pages/index").default}
  //       />
  //       <Route
  //         exact={true}
  //         path="/detail"
  //         component={require("@/pages/detail").default}
  //       />
  //       <Route
  //         exact={true}
  //         path="/demo/hello_ts"
  //         component={require("@/pages/demo/hello_ts").default}
  //       />
  //       <Route
  //         exact={true}
  //         path="*"
  //         component={require("@/pages/404").default}
  //       />
  //     </Switch>
  //   );
  // }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact component={BaseRouter} />
        </Router>
      </Provider>
    );
  }
}
export default App;
