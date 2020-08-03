import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

interface moduleProps {
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
  static defaultProps: moduleProps = {};

  state: StateType = {};

  UNSAFE_componentWillMount() {
    // const { list } = this.props;
  }

  render() {
    return <div className={styles.wrapper}>xxx Module xxx</div>;
  }
}
export default Module;
