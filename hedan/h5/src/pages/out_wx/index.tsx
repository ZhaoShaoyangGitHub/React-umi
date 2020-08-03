import React from "react";
import styles from "./index.module.scss";
import {decodeUnicode, getUrlParam, openApp} from "@/utils/utils";
import {isLink_outwx} from "@/config/constants";
import {getAppDownUrl} from "@/utils/getDownLoadUrl";

const win: any = window;

type StateType = {
  [propsName: string]: any;
};

class Page extends React.Component<props> {
  state: StateType = {
    isWeChat: "",
    text: "浏览器",
  };

  componentDidMount() {
    const _this = this;
    _this.init();
  }

  init = () => {
    const {url, open} = getUrlParam();

    const browserType = win.markComm.browserType();
    if (isLink_outwx()) {
      // 微信内部 , 什么都不干
    } else {
      if (open === "store") {
        //这里应该是直接打开下载链接
        getAppDownUrl().then((res) => {
          window.location.href = res;
        });
      }
      //微信外部,跳往首页
      if (url) {
        const decode = decodeUnicode(String(url));
        openApp(decode);
        setTimeout(() => {
          window.location.href = decode;
        }, 500);
      } else {
        this.props.history.push("/");
      }
    }
    if (browserType.isIOS) {
      this.setState({
        text: "Safari ",
      });
    }
  };

  render() {
    const {text} = this.state;
    document.title = "";
    return (
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: `url(${require("./img/bg.png").default})`,
        }}
      >
        <div className={styles.titleBox}>
          <div className={styles.content}>
            <div>点击右上角“...”</div>
            <div>选择使用 {text} 打开</div>
          </div>
          <img
            className={styles.titleCover}
            src={require("./img/title.png").default}
            alt=""
          />
        </div>
        <img
          className={styles.logo}
          src={require("./img/logo.png").default}
          alt=""
        />
      </div>
    );
  }
}
export default Page;
