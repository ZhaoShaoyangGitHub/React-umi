import React from "react";
import Avatar from "@/components/Avatar";

import styles from "./index.module.scss";
import { withRouter } from "react-router-dom";

import { formatDate, pureData } from "@/utils/utils";
import OpenApp from "@/components/OpenApp";
import AuthIcon from "@/components/AuthIcon";
import AtCont from "@/components/AtCont";

interface moduleProps {
  list: any[];
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface CommentModule {
  props: moduleProps;
  state: StateType;
}

class CommentModule extends React.Component<any> {
  state: StateType = {
    list: [],
  };

  componentDidMount() {
    const { list } = this.props;
    this.setState({
      list,
    });
  }

  operation_view = (item: any) => {
    return (
      <div className={styles.handleBox}>
        <div className={styles.time}>{formatDate(item.createTime)}</div>
        <div className={styles.clickTem}>
          <OpenApp isDown={true} className={styles.clickElm}>
            回复
            {item.replyCount ? (
              <span className={styles.count}>{item.replyCount}</span>
            ) : (
              ""
            )}
          </OpenApp>
          <OpenApp isDown={true} className={styles.clickElm}>
            转发
            {item.relayCount ? (
              <span className={styles.count}>{item.relayCount}</span>
            ) : (
              ""
            )}
          </OpenApp>
          <OpenApp isDown={true} className={styles.clickElm}>
            喜欢
            <img
              className={styles.likeIcon}
              src={require("./img/heart.svg").default}
              alt=""
            />
            {item.likeCount ? (
              <span className={styles.count}>{item.likeCount}</span>
            ) : (
              ""
            )}
          </OpenApp>
        </div>
      </div>
    );
  };

  childComment_view = (listData: Array<any>, name: string) => {
    const list = pureData(listData);

    const returnList: any = [];
    if (list.length) {
      list.forEach((item: any, index: any) => {
        returnList.push(
          <div className={styles.childComment} key={index}>
            <div className={styles.nameBox}>
              <div className={styles.childNameBox}>
                <Avatar
                  className={styles.avatar}
                  url={item.avatar}
                  onClick={() => {
                    this.linkUser(item);
                  }}
                />
                <div
                  className={styles.name}
                  onClick={() => {
                    this.linkUser(item);
                  }}
                >
                  {item.nickname}
                </div>
              </div>
              <OpenApp isDown={true} className={styles.dian}>
                <img
                  src={require("@/assets/image/more-black.svg").default}
                  alt=""
                />
              </OpenApp>
            </div>

            {item.isDelete ? (
              <div className={styles.delete}>该评论被删除</div>
            ) : (
              <AtCont className={styles.content} data={item} />
            )}

            {this.operation_view(item)}
          </div>,
        );
      });
    }
    return returnList;
  };

  linkUser = (data: any) => {
    this.props.history.push(`/user?userId=${data.userId}`);
  };

  render() {
    const { list } = this.state;

    return (
      <div className={styles.wrapper}>
        {list.map((item: any, index: any) => {
          return (
            <div key={index} className={styles.comment}>
              <div
                className={styles.avatarBox}
                onClick={() => {
                  this.linkUser(item);
                }}
              >
                <Avatar className={styles.avatar} url={item.avatar} />
                <AuthIcon className={styles.danicon} data={item} />
              </div>

              <div className={styles.right}>
                <div className={styles.nameBox}>
                  <div
                    className={styles.name}
                    onClick={() => {
                      this.linkUser(item);
                    }}
                  >
                    {item.nickname}
                  </div>
                  <OpenApp isDown={true} className={styles.dian}>
                    <img
                      src={require("@/assets/image/more-black.svg").default}
                      alt=""
                    />
                  </OpenApp>
                </div>

                {item.isDelete ? (
                  <div className={styles.delete}>该评论被删除</div>
                ) : (
                  <AtCont className={styles.content} data={item} />
                )}

                {this.operation_view(item)}
                <div className={styles.childCommentBox}>
                  {this.childComment_view(item.childList, item.nickname)}
                </div>
                {item.childCount > 3 && (
                  <OpenApp className={styles.commentOpenApp}>
                    打开APP查看全部回复
                  </OpenApp>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(CommentModule);
