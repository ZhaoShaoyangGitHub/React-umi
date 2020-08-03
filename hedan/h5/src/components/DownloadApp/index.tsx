import React from "react";
import Avatar from "@/components/Avatar";
import { withRouter } from "react-router-dom";
import { getUrlParam, openApp } from "@/utils/utils";

import styles from "./index.module.scss";
import OpenApp from "@/components/OpenApp";

interface moduleProps {
  isOpenApp: boolean;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface DownloadApp {
  props: moduleProps;
  state: StateType;
}

class DownloadApp extends React.Component<any> {
  static defaultProps: moduleProps = {
    isOpenApp: true,
  };

  componentDidMount() {
    const { isOpenApp } = this.props;
    if (isOpenApp) {
      openApp();
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.logBox}>
            <img
              className={styles.logo}
              src={require("./img/logo.svg").default}
              alt=""
            />
          </div>
          <div className={styles.des}>
            <img
              className={styles.logoText}
              src={require("./img/hedan.svg").default}
              alt=""
            />
            <div className={styles.appDesc}>盒DAN APP 你买玩具的好帮手</div>
          </div>
        </div>
        <OpenApp isDown={true} className={styles.download}>
          下载APP
        </OpenApp>
      </div>
    );
  }
}

export default withRouter(DownloadApp);
