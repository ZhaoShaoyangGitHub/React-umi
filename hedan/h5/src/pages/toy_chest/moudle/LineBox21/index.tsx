import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";

import Toy from "../Toy";

interface moduleProps {
  data: any;
  [propsName: string]: any;
}

type StateType = {
  data: any;
};

interface LineBox21 {
  props: moduleProps;
  state: StateType;
}

class LineBox21 extends React.Component<moduleProps> {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.toy2BG}>
          <Toy data={data[0]} />
          <Toy data={data[1]} />
        </div>
        <Toy className={styles.toy1BG} data={data[2]} />
      </div>
    );
  }
}

export default LineBox21;
