import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { withRouter } from "react-router-dom";
import AuthIcon from "@/components/AuthIcon";
import { roleType } from "@/assets/filter/filter";
interface moduleProps {
  brand: string;
  list: Array<any>;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};
interface Module {
  props: moduleProps;
  state: StateType;
}

class Module extends React.Component<any> {
  static defaultProps: moduleProps = {
    list: [],
    brand: " ",
  };

  state: StateType = {};

  UNSAFE_componentWillMount() {
    const { list } = this.props;
    this.setState({
      list,
    });
  }

  linkUser = (item: any) => {
    if (item.userId) {
      this.props.history.push(`/user?userId=${item.userId}`);
    }
  };

  render() {
    const { list } = this.state;
    const { brand } = this.props;
    // list = list.slice(2, 3);
    return (
      <div className={styles.wrapper}>
        <div className={styles.screenBox}>
          {list.map((item: any, index: any) => {
            return (
              <div
                className={`${styles.member} ${list.length === 1 &&
                  styles.theOne}`}
                key={index}
              >
                <div className={styles.avatarBox}>
                  <Avatar className={styles.avatar} url={item.avatar} />
                  <AuthIcon className={styles.dan} data={item} />
                </div>
                <div className={styles.name}>{item.nickname}</div>
                <div className={styles.introduction}>
                  {brand}&nbsp;&nbsp;{roleType(item.roleType)}&nbsp;&nbsp;
                  {item.introduction}
                </div>
                <div className={styles.wxBox}>
                  {item.wechat && (
                    <>
                      <img
                        className={styles.wxIcon}
                        src={require("./img/wx.png").default}
                        alt=""
                      />
                      微信号：{item.wechat}
                    </>
                  )}
                </div>

                {item.userId && (
                  <div
                    className={styles.linkUser}
                    onClick={() => {
                      this.linkUser(item);
                    }}
                  >
                    前往个人主页
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Module);
