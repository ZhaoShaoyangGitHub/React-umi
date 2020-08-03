import React from "react";
import Avatar from "@/components/Avatar";
import { withRouter } from "react-router-dom";

import styles from "./index.module.scss";

interface moduleProps {
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface AtCont {
  props: moduleProps;
  state: StateType;
}

class AtCont extends React.Component<any> {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.wrapper} id="footerMask">
        <div className={styles.white}></div>
        <div className={styles.footerCont}>
          <img
            className={styles.songIcon}
            src={require("@/assets/image/song.svg").default}
            alt=""
          />
          <div className={styles.footerStr}>更多内容请下载APP查看哦~</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(AtCont);
