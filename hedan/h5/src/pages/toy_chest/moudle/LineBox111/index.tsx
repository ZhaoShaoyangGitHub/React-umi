import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";
import Toy from "../Toy";

interface moduleProps {
  data: any;
  [propsName: string]: any;
}

type StateType = {
  data: {
    [propsName: string]: any;
  };
};

interface LineBox111 {
  props: moduleProps;
  state: StateType;
}

class LineBox111 extends React.Component<moduleProps> {
  render() {
    const { data } = this.props;

    return (
      <div className={styles.wrapper}>
        {data.map((item: any, index: any) => {
          return <Toy className={styles.toy1BG} data={item} key={index} />;
        })}
      </div>
    );
  }
}

export default LineBox111;
