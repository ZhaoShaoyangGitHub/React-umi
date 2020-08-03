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

interface LineBox3 {
  props: moduleProps;
  state: StateType;
}

class LineBox3 extends React.Component<moduleProps> {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.wrapper}>
        {data.map((item: any, index: any) => {
          return <Toy data={item} key={index} />;
        })}
      </div>
    );
  }
}

export default LineBox3;
