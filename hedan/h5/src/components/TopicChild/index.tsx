import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import {formatDate} from "@/utils/utils";
import {withRouter} from "react-router-dom";
import Address from "@/components/Address";
import AtCont from "@/components/AtCont";
import AuthIcon from "@/components/AuthIcon";
import OpenApp from "@/components/OpenApp";

interface ComponentsProps extends props {
  detail: {
    [key: string]: any;
  };
  className: any;
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
  link_dynamic_user = (item: any) => {
    window.location.href = `/dynamic_user?momentId=${item.momentId}`;
  };

  item_view = (item: any) => {
    return (
      <div
        className={styles.itemBox}
        onClick={() => {
          this.link_dynamic_user(item);
        }}
      >
        <div className={styles.contentText}>
          <span
            className={styles.userName}
            onClick={() => {
              this.props.history.push(`/user?userId=${item.userId}`);
            }}
          >
            @{item.nickname}
          </span>
          ：
          <AtCont className={styles.cont_desc} data={item} />
        </div>
        <div className={styles.local_time}>
          {formatDate(item.createTime)}
          {item.locationTitle && <span className={styles.prep}>于</span>}
          <Address data={item} />
        </div>
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
                src={require("../TopicList/img/pic.svg").default}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const {detail, className} = this.props;
    if (detail) {
      return (
        <div className={`${styles.wrapper} ${className}`}>
          {detail.isDelete ? (
            <div>抱歉，该动态已被删除</div>
          ) : (
            this.item_view(detail)
          )}
        </div>
      );
    } else {
      return "";
    }
  }
}

export default withRouter(Module);
