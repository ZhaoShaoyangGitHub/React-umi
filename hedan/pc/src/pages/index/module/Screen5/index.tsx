import React from "react";
import styles from "./index.module.scss";
import ButtonList from "../ButtonList";
interface moduleProps {
  showProduct: Function;
  showOperate: Function;
  [propsName: string]: any;
}

interface Module {}
class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    showProduct: () => {},
    showOperate: () => {},
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <div className={styles.wrapper}>
        <img
          className={styles.logo}
          src={require("./img/logo.png").default}
          alt=""
        />

        <ButtonList type="white" className={styles.buttonList} />

        <div className={styles.footer}>
          {/* <div className={styles.hd}>
            <div>
              急招
              <span
                className={styles.btn}
                onClick={() => {
                  this.props.showProduct();
                }}
              >
                产品经理
              </span>
              和
              <span
                className={styles.btn}
                onClick={() => {
                  this.props.showOperate();
                }}
              >
                运营专员!
              </span>
            </div>
          </div> */}
        </div>
        <div className={styles.records}>
          <span>©2020 盒DAN Beta1.0 / 上海禾稻文化传播有限公司 / </span>
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            沪ICP备19033567号-1
          </a>
          <a
            href="http://wap.scjgj.sh.gov.cn/businessCheck/verifKey.do?showType=extShow&serial=9031000020180903093006000002809324-SAIC_SHOW_310000-2c9be8bd70bfe5a60170f385ee941cf8044&signData=MEUCIQDTAbAxH6vlGKcT7J9UtGOjmgtu4KF7m8vlyAWE+kBXkQIga/AJWO0akmF9Hbcz9//mMQxDAAtajemfAKLYLrzNrS0="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.icon}
              src={require("./img/icon.png").default}
              alt=""
            />
          </a>
        </div>
        <img
          className={styles.bottomBg}
          src={require("./img/bottom_bg.png").default}
          alt=""
        />
      </div>
    );
  }
}
export default Module;
