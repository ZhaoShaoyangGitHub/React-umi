import React from "react";

import styles from "./index.module.scss";

interface moduleProps {
  className?: any;
  status: boolean;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Gender {
  props: moduleProps;
  state: StateType;
}

class Gender extends React.Component<moduleProps> {
  render() {
    const {className, status} = this.props;
    if (status) {
      return (
        <div className={`${styles.wrapper} ${className}`}>
          <img
            className={styles.lodingIcon}
            src={require("./img/loding.svg").default}
            alt=""
          />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default Gender;
