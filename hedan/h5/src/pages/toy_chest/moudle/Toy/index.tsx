import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";
import { url } from "inspector";

interface moduleProps {
  data: {
    [propsName: string]: any;
  };
  className?: any;
  [propsName: string]: any;
}

type StateType = {
  data: {
    [propsName: string]: any;
  };
};

interface ToyBox {
  props: moduleProps;
  state: StateType;
}

class ToyBox extends React.Component<moduleProps> {
  state: StateType = {
    data: {},
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    const { className } = this.props;

    if (data) {
      //
    } else {
      return null;
    }

    if (data.image && data.type - 9 === 0) {
      return (
        <div
          className={`${styles.toyBox} ${styles.imgBox} ${className}`}
          style={{
            backgroundImage: "url()",
          }}
        >
          <img
            className={styles.bg}
            src={require("../../img/photo.svg").default}
            alt=""
          />
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          ></div>
          <img
            className={styles.clamp}
            src={require("../../img/clamp.svg").default}
            alt=""
          />
        </div>
      );
    }

    if (data.toyId) {
      return (
        <div className={`${styles.toyBox} ${className}`} data-type={data.type}>
          {data.title ? (
            <div className={styles.title}>{data.title}</div>
          ) : (
            <div className={styles.titleNull}></div>
          )}
          {data.type === 0 ? (
            <div className={styles.toyCover}></div>
          ) : (
            <img className={styles.toyCover} src={data.thumb} alt="" />
          )}
        </div>
      );
    } else {
      return (
        <div
          className={`${styles.toyBox} ${className} ${styles.toyBoxNull}`}
          data-type={data.type}
        >
          <div className={styles.title}>{data.title || " "}</div>
          <div className={styles.toyCover}></div>
        </div>
      );
    }
  }
}

export default ToyBox;
