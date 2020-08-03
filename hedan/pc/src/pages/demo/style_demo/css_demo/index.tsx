import React, { Component } from "react";
import styles from "./index.module.css";
import image14 from "@/assets/image/14.jpg";

export default class CssDemo extends Component {
  render() {
    return (
      <div>
        <h1>这里是 css_demo ,这里是三级路由</h1>
        img标签引用:
        <img src={require("@/assets/image/13.jpg").default} alt="" />
        xxx
        <img src={image14} alt="image14" />
        css使用
        <div className={styles.cover} />
        less 函数单位计算
        <div className={styles.lessBox}>
          <div className={styles.font}>这里是文字测试</div>
        </div>
        <div className={styles.fontOverflow_1}>
          文字超出的css文本测试,正阿斯蒂芬卡死阿斯蒂芬教案设计按时交付拉萨大家阿拉斯加阿萨
        </div>
        <div className={styles.fontOverflow_multi}>
          文字超出的css文本测试,正阿斯蒂芬卡死阿斯蒂芬教案设计按时交付拉萨大家阿拉斯加阿萨
        </div>
        <div className={styles.margin_1}>margin的测试xxxxxxx</div>
        <div className={styles.margin_2}>margin的测试xxxxxxx</div>
        <div className={styles.padding}>padding的测试xxxxxxx</div>
      </div>
    );
  }
}
