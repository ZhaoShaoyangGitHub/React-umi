import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";
interface moduleProps {
  desc?: string;
  img?: any;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface DownloadApp {
  props: moduleProps;
  state: StateType;
}

class DownloadApp extends React.Component<moduleProps> {
  state: StateType = {};

  componentDidMount() {}

  render() {
    const { desc, img } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.centerBox}>
          <img
            className={styles.icon}
            src={img ? img : require("./img/boxnilicon.svg").default}
            alt=""
          />
          <div className={styles.str}>{desc ? desc : "空无一「DAN」"}</div>
        </div>
      </div>
    );
  }
}

export default DownloadApp;
