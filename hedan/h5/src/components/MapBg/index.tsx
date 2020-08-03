import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";
import { provinceFilter } from "@/assets/filter/filter";
interface moduleProps {
  data: any;
  type?: 2;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface MapBg {
  props: moduleProps;
  state: StateType;
}

class MapBg extends React.Component<moduleProps> {
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
    const { type } = this.props;

    return (
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: `url(${require("./img/mapbg.png").default})`,
        }}
      >
        <div className={styles.contentBox}>
          <div className={styles.labelBox}>
            {type === 2 ? (
              <div className={styles.mapLabel}>
                <div className={styles.left}>
                  <div
                    className={styles.cover}
                    style={{
                      backgroundImage: `url(${data.thumb})`,
                    }}
                  ></div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      {provinceFilter(data.province)}·{data.title}
                    </div>
                    <div className={styles.desc}>
                      {data.city}
                      {data.district}
                      {data.address}
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <img src={require("./img/local.png").default} alt="" />
                </div>
              </div>
            ) : (
              <div className={styles.label}>{data.title}</div>
            )}
            <div className={styles.triangleBox}>
              <i className={styles.triangle}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapBg;
