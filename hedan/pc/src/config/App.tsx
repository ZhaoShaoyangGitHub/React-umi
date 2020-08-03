import React from "react";

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

import { getUrlParam, localStore } from "@/utils/utils";
// Mobx -- end

$axios_set_default();

class BaseRouter extends React.Component<props> {
  //全局的路由变化监听
  componentDidMount() {
    const { token } = getUrlParam(); // 接收token参数.进行存储
    if (token) {
      localStore.set("token", token);
    }
    this.watchRouter();

    //去除loding
    const Elem: any = document.getElementById("load_public");
    if (Elem) {
      Elem.parentNode.removeChild(Elem);
    }
  }

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
