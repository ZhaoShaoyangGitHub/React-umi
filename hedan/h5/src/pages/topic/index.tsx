import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getUrlParam } from "@/utils/utils";
import { getDetail, getList } from "./api";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import TopicCard from "./module/TopicCard";
import TopicList from "@/components/TopicList";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";
import { DefaultTopicAvatar } from "@/config/constants";

interface ComponentsProps extends props {
  [propsName: string]: any;
}

type StateType = {
  topicId: string;
  detail: any;
  groupList: any[];
  list: any[];
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    topicId: "",
    detail: {},
    groupList: [],
    list: [],
  };

  UNSAFE_componentWillMount() {
    let { topicId } = getUrlParam();
    const { test } = getUrlParam();
    if (topicId) {
      //
    } else {
      if (test) {
        topicId = "1195243859798396930";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 topicId");
      }
    }

    this.setState(
      {
        topicId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const { topicId } = this.state;
    getDetail({
      topicId,
    }).then((res) => {
      if (res.data) {
        this.setState({
          detail: res.data,
          groupList: res.data.brandGroupList,
        });
      } else {
        this.setState({
          topicId: "",
        });
      }
    });
    getList({
      topicId,
      tab: 2,
      pageSize: 10,
      pageIndex: 1,
    }).then((res) => {
      const { list } = res.data;
      if (list) {
        this.setState({
          list,
        });
      }
    });
  };

  render() {
    const { detail, groupList, list, topicId } = this.state;
    if (detail.title) {
      document.title = `${detail.title} - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!topicId && <NullPage />}
        <div className={styles.details}>
          <div className={styles.focus}>
            <div className={styles.left}>
              {detail.thumb ? (
                <Avatar className={styles.avatar8} url={detail.thumb} />
              ) : (
                <Avatar className={styles.avatar14} url={DefaultTopicAvatar} />
              )}
              <div className={styles.info}>
                <div className={styles.name}>{detail.title}</div>
                <div className={styles.des}>
                  {detail.momentCount} 条相关内容
                </div>
              </div>
            </div>
            <OpenApp isDown={true} className={styles.right}>
              <div className={styles.btn}>关注</div>
            </OpenApp>
          </div>
          <div className={styles.TopicCardScreenBox}>
            {groupList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.TopicCardItem} ${groupList.length ===
                    1 && styles.theOne}`}
                >
                  <TopicCard data={item} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.listBox}>
          <div className={styles.originalTitle}>
            <span className={styles.originalTitle_item}>热门</span>
          </div>

          {list.length ? <TopicList list={list} /> : ""}
        </div>

        {/* */}
        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP看看更多话题内有爱玩具动态吧
        </OpenApp>
        <OpenAppFooter />
      </div>
    );
  }
}
export default Page;
