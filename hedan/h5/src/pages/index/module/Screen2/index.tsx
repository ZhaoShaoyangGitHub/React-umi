import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

import Detail from "./module/Detail";

import { getInfoList } from "../../api";

interface moduleProps {
  activeIndex: Number;
  [propsName: string]: any;
}

interface Module {}

const timeNum = 2700;

let isInitApi = false;
class Module extends React.Component<moduleProps> {
  state = {
    isShow: false,
    start: false,
    list: [],
  };

  timer: any;

  UNSAFE_componentWillMount() {}

  UNSAFE_componentWillReceiveProps() {
    if (this.props.activeIndex === 1) {
      this.init();
    }
  }

  init = () => {
    const _this = this;
    this.setState(
      {
        isShow: true,
      },
      () => {
        _this.setAnimation();
        this.initApi();
      },
    );
  };

  initApi = () => {
    if (!isInitApi) {
      isInitApi = true;
      getInfoList().then((res) => {
        this.setState({
          list: res.data,
        });
      });
    }
  };

  setAnimation = () => {
    const _this = this;
    const { isShow } = this.state;
    if (isShow) {
      clearTimeout(_this.timer);
      _this.timer = setTimeout(() => {
        _this.setState({
          start: true,
        });
      }, timeNum);
    }
  };

  UNSAFE_componentWillUpdate() {}

  render() {
    const { isShow, start, list } = this.state;
    // console.log(isShow);

    return (
      <div className={styles.wrapper}>
        {isShow && (
          <div className={styles.contBox}>
            {!start && (
              <div className={styles.helloBlock}>
                <div className={styles.helloText}>Hello，初次见面</div>
                <div className={styles.cont_txt}>
                  我是盒DAN机器人，可以为你智能捕捉各种玩具信息哦~
                </div>

                <img
                  className={styles.reboot}
                  src={require("@/assets/image/ufo.svg").default}
                  alt=""
                />
              </div>
            )}

            {start && (
              <div className={styles.detail}>
                <Detail list={list} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Module;
