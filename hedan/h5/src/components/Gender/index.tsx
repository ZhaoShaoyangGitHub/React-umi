import React from "react";

import styles from "./index.module.scss";

interface moduleProps {
  gender: string | number;
  className?: string;
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
    const { className, gender, ...other } = this.props;
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <img src={require(`./img/${gender}.svg`).default} alt="" />
      </div>
    );
  }
}

export default Gender;
