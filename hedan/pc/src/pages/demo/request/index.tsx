import React from "react";
import { getRecommendList } from "@/api/demo";

export default class RequireDemo extends React.Component {
  getRecommendList = async () => {
    const data: any = await getRecommendList({
      count: 5,
      only_unfollowed: true,
    });
    if (data.code === "OK") {
      console.info(data);
      // eslint-disable-next-line no-alert
      alert("请求成功");
    } else {
      // eslint-disable-next-line no-alert
      alert("请求失败");
    }
  };

  render() {
    return (
      <div>
        <h2>这里是 TypeScript 演示 , 二级路由</h2>
        <button onClick={this.getRecommendList}>发送请求</button>
      </div>
    );
  }
}
