import React from "react";
import { gzipImg } from "@/utils/utils";

import styles from "./index.module.scss";

interface moduleProps {
  url: string;
  className?: string;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Avatar {
  props: moduleProps;
  state: StateType;
}

class Avatar extends React.Component<moduleProps> {
  render() {
    const { className, url, ...other } = this.props;

    return (
      <div className={`${styles.wrapper} ${className}`} {...other}>
        <img className={styles.userCover} src={gzipImg(url, 100)} alt="" />
        {this.props.children}
      </div>
    );
  }
}

export default Avatar;
