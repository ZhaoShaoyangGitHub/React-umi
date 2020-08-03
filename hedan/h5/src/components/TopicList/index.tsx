import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import {formatDate} from "@/utils/utils";
import {withRouter} from "react-router-dom";
import Address from "@/components/Address";
import AtCont from "@/components/AtCont";
import AuthIcon from "@/components/AuthIcon";
import OpenApp from "@/components/OpenApp";
import TopicChild from "@/components/TopicChild";

interface ComponentsProps extends props {
  list: Array<any>;
  type?: "user";
  [propsName: string]: any;
}

type StateType = {
  list: Array<any>;
  [propsName: string]: any;
};

interface Module {
  props: ComponentsProps;
  state: StateType;
}

class Module extends React.Component<any> {
  state: StateType = {
    list: [],
  };

  componentDidMount() {
    const {list} = this.props;
    this.setState({
      list,
    });
  }

  link_dynamic_user = (item: any) => {
    this.props.history.push(`/dynamic_user?momentId=${item.momentId}`);
  };

  actions_view = (item: any) => {
    return (
      <div className={styles.originalActions}>
        <OpenApp isDown={true} className={styles.user}>
          <Avatar className={styles.avatar} url={item.avatar} />
          <span>添加评论...</span>
        </OpenApp>

        <OpenApp isDown={true} className={styles.interact}>
          <div className={styles.box}>
            <img
              className={styles.icon}
              src={require("./img/message.svg").default}
              alt=""
            />
            <span className={styles.originalComment}>{item.commentCount}</span>
          </div>

          <div className={styles.box}>
            <img
              className={styles.icon}
              src={require("./img/share.svg").default}
              alt=""
            />
            <span className={styles.originalShare}>{item.relayCount}</span>
          </div>

          <div className={styles.box}>
            <img
              className={styles.icon}
              src={require("./img/heart.svg").default}
              alt=""
            />
            <span className={styles.originalLike}>{item.likeCount}</span>
          </div>
        </OpenApp>
      </div>
    );
  };

  item_view = (item: any, index: any) => {
    const {type} = this.props;
    return (
      <div
        className={styles.itemBox}
        key={index}
        onClick={() => {
          this.link_dynamic_user(item);
        }}
      >
        {type !== "user" && (
          <div className={styles.avatarBox}>
            <div className={styles.left}>
              <Avatar className={styles.avatar} url={item.avatar} />
              <div className={styles.name}>{item.nickname}</div>
              <AuthIcon className={styles.dan} data={item} />
            </div>

            <div className={styles.right}>
              <img
                className={styles.dian}
                src={require("@/assets/image/more-black.svg").default}
                alt=""
              />
            </div>
          </div>
        )}
        {item.image && (
          <div
            className={styles.coverBox}
            style={{
              backgroundImage: `url(${item.image.length && item.image[0]})`,
            }}
          >
            {item.image.length > 1 ? (
              <img
                className={styles.pic}
                src={require("./img/pic.svg").default}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        )}
        <AtCont className={styles.cont_desc} data={item} />
        <TopicChild detail={item.parentMoment} />
        <div className={styles.local_time}>
          <span className={styles.local_time_time}>
            {formatDate(item.createTime)}
          </span>
          {item.locationTitle && <span className={styles.prep}>于</span>}
          <Address data={item} />
        </div>
        {this.actions_view(item)}
      </div>
    );
  };

  render() {
    const {list} = this.state;
    return (
      <div className={styles.wrapper}>
        {list.map((item, index) => {
          return this.item_view(item, index);
        })}
      </div>
    );
  }
}

export default withRouter(Module);
