import React from "react";
import styles from "./index.module.scss";
import OpenApp from "@/components/OpenApp";

interface moduleProps {
  color?: "white" | "black";
  className?: any;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface ActivityHeader {
  props: moduleProps;
  state: StateType;
}

class ActivityHeader extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    color: "white",
  };

  state: StateType = {};

  UNSAFE_componentWillMount() {
    // const { list } = this.props;
  }

  render() {
    const { color, className } = this.props;

    let logoUrl = require("./img/hedan_fff.png").default;
    if (color === "black") {
      logoUrl = require("./img/hedan_000.png").default;
    }

    return (
      <div className={`${styles.wrapper} ${styles[color || 0]} ${className}`}>
        <img className={styles.logo} src={logoUrl} alt="" />
        <OpenApp isDown={true} className={styles.openApp}>
          <img
            className={styles.icon}
            src={require("@/assets/image/logo.svg").default}
            alt=""
          />
          <span>立即下载APP</span>
        </OpenApp>
      </div>
    );
  }
}
export default ActivityHeader;
