import React from "react";
import styles from "./index.module.scss";

interface moduleProps {
  className?: any;
}

type StateType = {
  [propsName: string]: any;
};

interface QRcode {
  props: moduleProps;
  state: StateType;
}

class QRcode extends React.Component<moduleProps> {
  render() {
    const { className } = this.props;
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.title}>如果你是玩具品牌方</div>
        <div className={`${styles.desc} ${styles.des1}`}>
          也想加入「玩具守护者」进行助棒接力，请将你的玩具品牌名、玩具品牌介绍以及你的微信号（或微信二维码），发送至以下邮箱：
          <br />
          <b>
            <a href="mailto:BD@hedan.art" className={styles.blue}>
              BD@hedan.art
            </a>
          </b>
        </div>
        {/* <img
          className={styles.wxCode}
          src={require("./img/wx66.svg").default}
          alt=""
        /> */}
        <div className={styles.title}>如果你是盒DAN用户</div>
        <div className={styles.desc}>
          想要加入盒DAN官方用户群（群内有时会有红包和福利掉落哦~），和其他盒DAN用户共同玩耍，请联系
          <span className={styles.blue}>
            <b>0号孵蛋员</b>（微信号：heDANkefu）
          </span>
        </div>
        <img
          className={styles.wxCode}
          src={require("./img/wxhedan.png").default}
          alt=""
        />
      </div>
    );
  }
}
export default QRcode;
