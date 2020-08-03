/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */
import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

type StateType = {
  [propsName: string]: any;
};

class Page extends React.Component {
  state: StateType = {};

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>帮助与反馈</h1>
        <hr />
        <div>页面开发中</div>
      </div>
    );
  }
}
export default Page;
