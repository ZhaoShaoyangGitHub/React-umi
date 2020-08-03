import React from "react";
import styles from "./index.module.scss";
import Avatar from "@/components/Avatar";

interface moduleProps {
  detail: any;
  className?: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Item {
  props: moduleProps;
  state: StateType;
}

class Item extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    detail: {
      logo: require("@/assets/image/13.jpg").default,
      desc: "asdasdasdasdasd",
      momentList: [
        {
          avatar: require("@/assets/image/14.jpg").default,
          nickname: "好大 一个菠萝 呀",
        },
        {
          avatar: require("@/assets/image/14.jpg").default,
          nickname: " 呀",
        },
        {
          avatar: require("@/assets/image/14.jpg").default,
          nickname: "好大",
        },
        {
          avatar: require("@/assets/image/14.jpg").default,
          nickname: "呀 ",
        },
      ],
    },
  };

  state: StateType = {};

  render() {
    const {detail, className} = this.props;
    const {momentList} = detail;
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <div className={styles.brandLogo}>
          <img src={detail.logo} alt="" />
        </div>
        <div
          className={`${styles.descBox}`}
          dangerouslySetInnerHTML={{
            __html: detail.desc,
          }}
        />
        <div className={styles.memberBox}>
          {momentList.map((item: any, index: number) => {
            return (
              <div className={styles.userBox} key={index}>
                <Avatar className={styles.avatar} url={item.avatar} />
                <span>{item.nickname}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Item;
