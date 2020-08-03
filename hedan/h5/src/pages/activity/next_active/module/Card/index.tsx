import React from "react";
import styles from "./index.module.scss";
import {withRouter} from "react-router-dom";
import {getUrlParam} from "@/utils/utils";
interface moduleProps {
  detail: any;
  color: "white" | "black";
  className?: any;
  gotoDraw?: Function;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Card {
  props: moduleProps;
  state: StateType;
}

const win: any = window;

class Card extends React.Component<any> {
  static defaultProps: moduleProps = {
    detail: {
      logoH: "",
      cover: "",
      logo: "",
      desc: "",
    },
    color: "white",
  };

  state: StateType = {};

  linkHref = () => {
    const _this = this;
    const {token} = getUrlParam();
    const {gotoDraw} = this.props;

    const {detail} = this.props;
    const id = detail.id;

    const isStart = false;
    //如果是抽奖当天，则点击进入抽奖
    if (gotoDraw) {
      gotoDraw(id);
    } else {
      if (id) {
        _this.props.history.push(
          `/activity/task?id=${id}&token=${token || ""}`,
        );
      }
    }
  };

  render() {
    const {detail, className, color} = this.props;

    return (
      <div className={`${styles.wrapper} ${styles[color]} ${className} `}>
        <div className={styles.brandBox} onClick={this.linkHref}>
          <img
            className={styles.coverBg}
            src={require(`./img/${color}_bg.png`).default}
            alt=""
          />
          <img className={styles.cover} src={detail.cover} alt="" />
          <div className={styles.logoBox}>
            <div className={styles.logo}>
              {detail.logo && (
                <img
                  src={detail.logo}
                  alt=""
                  style={
                    detail.logoH && {
                      height: `${detail.logoH / 100}rem`,
                    }
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={`${styles.descBox}`}
          dangerouslySetInnerHTML={{
            __html: detail.desc,
          }}
        />
      </div>
    );
  }
}
export default withRouter(Card);
