import React from "react";
import routes from "@/pages/routes";
import { Link } from "react-router-dom";

import { versionList } from "./baseUrl";

interface moduleProps {
  list: routes;
}

const Navigation = (props: moduleProps) => {
  const { list } = props;
  return (
    <ul>
      {Object.keys(list).map((key) => {
        return (
          <li key={key}>
            <h3>
              <Link to={key}>{list[key].name}</Link>
            </h3>
            <h4>title: {list[key].title}</h4>
            <h4>
              path: &nbsp;&nbsp;
              {key}
            </h4>
            <p>{list[key].describe}</p>
            {list[key].routes && (
              <Navigation list={list[key].routes as routes} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default class Sitemap extends React.Component {
  render() {
    return (
      <div>
        <h1>该项目路由信息预览</h1>
        <p>当前版本号：{versionList[0].code}</p>
        <p>当前版本更新内容：{versionList[0].describe}</p>
        <p>当前版本开发者：{versionList[0].author}</p>
        <p>更新时间：{versionList[0].time}</p>
        <Navigation list={routes} />
      </div>
    );
  }
}
