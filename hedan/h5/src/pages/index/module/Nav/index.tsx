import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

interface moduleProps {
  screenTop: Function;
  downLoadApp: Function;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Module {
  props: moduleProps;
  state: StateType;
}

class Module extends React.Component<moduleProps> {
  state: StateType = {};

  UNSAFE_componentWillMount() {
    // const { list } = this.propss;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cont}>
          <div
            className={styles.btn}
            onClick={() => {
              this.props.screenTop(0);
            }}
          >
            首页
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              this.props.screenTop(1);
            }}
          >
            智能捕捉
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              this.props.screenTop(2);
            }}
          >
            摄影达人
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              this.props.screenTop(3);
            }}
          >
            特好玩的玩具柜
          </div>
          <div
            className={`${styles.btn} ${styles.downBtn}`}
            onClick={() => {
              this.props.downLoadApp();
            }}
          >
            下载
          </div>
        </div>
      </div>
    );
  }
}
export default Module;
