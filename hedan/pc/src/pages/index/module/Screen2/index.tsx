import React from "react";
import styles from "./index.module.scss";
import { observer, inject } from "mobx-react";

import Detail from "./module/Detail";

interface moduleProps {
  [propsName: string]: any;
}

interface Module {}

let showModule = false;

@inject("store") // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class Module extends React.Component<moduleProps> {
  state = {};

  timer: any;

  componentDidMount() {}

  UNSAFE_componentWillMount() {}

  UNSAFE_componentWillReceiveProps() {}

  UNSAFE_componentWillUpdate() {}

  render() {
    const { activeIndex } = this.props.store.indexStore;
    if (activeIndex === 1) {
      showModule = true;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.contBox}>
          {showModule && <Detail />}
          <div className={styles.shadeBox}></div>
        </div>
        {/*  */}
        <img
          className={styles.helloBg}
          src={require("./img/hello.svg").default}
          alt=""
        />
        {/* <div className={styles.helloBlock}>
          <div className={styles.helloText}>Hello, 初次见面</div>
          <div className={styles.cont_txt}>
            我是盒DAN机器人，可以为你智能捕捉各种玩具信息哦~
          </div>
          <img
            className={styles.reboot}
            src={require("./img/roboot.png").default}
            alt=""
          />
        </div> */}
        {/*  */}
        <div className={styles.bar}>
          <img
            className={styles.more}
            src={require("./img/more.png").default}
            alt=""
          />
          <div className={styles.str}>
            盒DAN机器人还能为你捕捉各大潮玩展会讯息、或是你心理价位内的二手玩具……更多功能等你体验
          </div>
        </div>
      </div>
    );
  }
}
export default Module;
