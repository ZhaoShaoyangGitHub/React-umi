import React from "react";
import styles from "./index.module.scss";
import { observer, inject } from "mobx-react";
import { APPSTORE_LINK } from "@/config/constants";

interface moduleProps {
  className?: any;
  type: "black" | "white";
  [propsName: string]: any;
}
const win: any = window;

interface Module {}

@inject("store") // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class Module extends React.Component<moduleProps> {
  static defaultProps = {
    type: "black",
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  downLoadApp = (type: string) => {
    const { indexStore } = this.props.store;
    const { androidUrl, iosUrl } = indexStore;
    if (type === "ios") {
      win.open(iosUrl);
    } else {
      win.open(androidUrl);
    }
  };

  render() {
    const { className, type, ...other } = this.props;
    const { indexStore } = this.props.store;
    // const { androidUrl, iosUrl } = indexStore;
    // console.log(indexStore);

    return (
      <div className={`${styles.wrapper} ${className}`} {...other}>
        <div
          className={`${styles.Btn} ${styles.ios} ${styles[type]}`}
          onClick={() => {
            this.downLoadApp("ios");
          }}
        >
          <img src={require("./img/ios.png").default} alt="" />
          <span>iPhone版下载</span>
        </div>
        <div
          className={`${styles.Btn} ${styles.android} ${styles[type]}`}
          onClick={() => {
            this.downLoadApp("android");
          }}
        >
          <img src={require("./img/android.png").default} alt="" />
          <span>Android版下载</span>
        </div>
        {/* <div
          className={`${styles.Btn} ${styles.code} ${styles[type]}`}
          onClick={() => {
            this.downLoadApp("code");
          }}
        >
          <img src={require("./img/code.png").default} alt="" />
          <span>二维码下载</span>
        </div> */}
      </div>
    );
  }
}
export default Module;
