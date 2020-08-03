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

interface LineBox12 {
  props: moduleProps;
  state: StateType;
}

class LineBox12 extends React.Component<moduleProps> {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.wrapper}>
        <Toy className={styles.toy1BG} data={data[0]} />
        <div className={styles.toy2BG}>
          <Toy data={data[1]} />
          <Toy data={data[2]} />
        </div>
      </div>
    );
  }
}

export default LineBox12;
