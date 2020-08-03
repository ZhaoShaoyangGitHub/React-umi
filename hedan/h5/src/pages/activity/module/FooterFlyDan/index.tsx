import React from "react";
import styles from "./index.module.scss";

interface moduleProps {
  className?: any;
}

type StateType = {
  [propsName: string]: any;
};

interface FooterFlyDan {
  props: moduleProps;
  state: StateType;
}

class FooterFlyDan extends React.Component<moduleProps> {
  componentDidMount() {}

  render() {
    const {className} = this.props;
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <img
          className={`${styles.dan_fly} ${styles.jump_5}`}
          src={require("../../guardians/img/dan_fly.png").default}
          alt=""
        />
        <img
          className={styles.cloud_1}
          src={require("../../guardians/img/cloud_1.svg").default}
          alt=""
        />
        <img
          className={styles.cloud_2}
          src={require("../../guardians/img/cloud_2.svg").default}
          alt=""
        />
        <img
          className={styles.cloud_3}
          src={require("../../guardians/img/cloud_3.svg").default}
          alt=""
        />
        <img
          className={styles.cloud_4}
          src={require("../../guardians/img/cloud_4.svg").default}
          alt=""
        />
      </div>
    );
  }
}
export default FooterFlyDan;
