import React from "react";
import Avatar from "@/components/Avatar";
import { Link } from "react-router-dom";

import { RouterView, findRoute } from "@/utils/RouterView";

export default class Demo extends React.Component<props> {
  linkList = () => {
    const { match } = this.props;
    const route = findRoute(match.path);
    const routes = route && route.routes;
    const linkList = [];
    for (const key in routes) {
      const el = routes[key];
      linkList.push(
        <Link
          to={key}
          key={key}
          style={{
            display: "block",
            margin: "10px",
          }}
        >
          {el.name}
        </Link>,
      );
    }
    return linkList;
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h2>这里是 样式演示 页面 , 二级路由</h2>
        <button
          onClick={() => {
            return this.props.history.push("/demo");
          }}
        >
          跳转回 demo
        </button>
        {this.linkList()}
        <RouterView path={match.path} />
      </div>
    );
  }
}
