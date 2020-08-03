import React from "react";
import Avatar from "@/components/Avatar";
import { withRouter } from "react-router-dom";

import styles from "./index.module.scss";
import AuthIcon from "@/components/AuthIcon";
import { roleType } from "@/assets/filter/filter";
import { DefaultTopicCard } from "@/config/constants";

interface moduleProps {
  [propsName: string]: any;
}

type StateType = {
  detail: any;
  userList: any[];
};

interface Module {
  props: moduleProps;
  state: StateType;
}

class Module extends React.Component<any> {
  state: StateType = {
    detail: {},
    userList: [],
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      detail: data.brand,
      userList: data.memberList,
    });
  }

  userItem_view = (item: any, index: any) => {
    const { detail } = this.state;
    const brand = detail.title;
    return (
      <div
        className={styles.userItem}
        key={index}
        onClick={() => {
          this.linkUser(item);
        }}
      >
        <div className={styles.left}>
          <div className={styles.avatarBox}>
            <Avatar className={styles.avatar} url={item.avatar} />
            <AuthIcon className={styles.danicon} data={item} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{item.nickname}</div>
            <div className={styles.desc}>
              {brand}&nbsp;&nbsp;{roleType(item.roleType)}&nbsp;&nbsp;
              {item.introduction}
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <img
            className={styles.homeIcon}
            src={require("./img/home.png").default}
            alt=""
          />
        </div>
      </div>
    );
  };

  linkUser = (item: any) => {
    const { history } = this.props;
    if (item.userId) {
      history.push(`/user?userId=${item.userId}`);
    }
  };

  linkDan = () => {
    const { detail } = this.state;
    const { history } = this.props;
    if (detail.id) {
      history.push(`/brand?brandId=${detail.id}`);
    }
  };

  render() {
    const { detail, userList } = this.state;
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.cardInfo}
          style={{
            backgroundImage: `url(${detail.background || DefaultTopicCard})`,
          }}
        >
          <div className={styles.cont}>
            <div className={styles.cont_header}>
              <div className={styles.cont_title}>{detail.title}</div>
              <div onClick={this.linkDan}>
                <img
                  className={styles.btnImg}
                  src={require("./img/button.svg").default}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.linkBox} onClick={this.linkDan}>
              前往该玩具品牌的「DAN」生录
              <img
                className={styles.arrow}
                src={require("./img/arrow.png").default}
                alt=""
              />
            </div>
          </div>
        </div>

        {userList.length ? (
          <div className={styles.userList}>
            {userList.map((item, index) => {
              return this.userItem_view(item, index);
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Module);
