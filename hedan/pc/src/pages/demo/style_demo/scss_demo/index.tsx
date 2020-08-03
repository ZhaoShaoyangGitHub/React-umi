import React, { Component } from "react";
import styles from "./index.module.scss";
import image14 from "@/assets/image/14.jpg";

export default class ScssDemo extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>这里是 scss_demo ,这里是三级路由</h1>
        <div>
          演示各种像素的缩放模式:
          <div className={styles.pxfunc}> px(1920) </div>
          <div className={styles.px}> 1920px </div>
        </div>
        img标签引用:
        <img src={require("@/assets/image/13.jpg").default} alt="" />
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
