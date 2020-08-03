import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import {getUrlParam, formatDate} from "@/utils/utils";
import {getDetail, getCommenList} from "./api";
import DownloadAPP from "@/components/DownloadApp";
import SwiperBox from "./module/SwiperBox";
import AuthIcon from "@/components/AuthIcon";
import AtCont from "@/components/AtCont";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";
import {USER_DESC} from "@/config/constants";
import TopicChild from "@/components/TopicChild";

import OpenApp from "@/components/OpenApp";

import MapBg from "@/components/MapBg";

import CommentModule from "./module/CommentModule";

interface ComponentsProps extends props {
  name: string;
  [propsName: string]: any;
}

type StateType = {
  momentId: string;
  detail: any;
  commentList: any;
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    momentId: "",
    detail: {},
    commentList: [],
  };

  UNSAFE_componentWillMount() {
    let {momentId} = getUrlParam();
    const {test} = getUrlParam();
    if (momentId) {
      //
    } else {
      if (test) {
        momentId = "5";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 momentId");
      }
    }

    this.setState(
      {
        momentId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const {momentId} = this.state;
    getDetail({
      momentId,
    }).then((res) => {
      if (res.data) {
        this.setState({
          detail: res.data,
        });
      } else {
        this.setState({
          momentId: "",
        });
      }
    });
    getCommenList({
      momentId,
      pageSize: 4,
      pageIndex: 1,
    }).then((res) => {
      this.setState({
        commentList: res.data.list,
      });
    });
  };

  linkUser = () => {
    this.props.history.push(`/user?userId=${this.state.detail.userId}`);
  };

  linkLocal = () => {
    const {detail} = this.state;
    if (detail.location) {
      this.props.history.push(`/local?locationId=${detail.location.id}`);
    }
  };

  render() {
    const {detail, commentList, momentId} = this.state;

    if (detail.nickname) {
      document.title = `${detail.nickname}的玩具动态 - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!momentId && <NullPage />}
        <div className={styles.focus}>
          <div className={styles.left} onClick={this.linkUser}>
            <Avatar className={styles.avatar} url={detail.avatar}>
              <AuthIcon className={styles.authIcon} data={detail} />
            </Avatar>

            <div className={styles.info}>
              <div className={styles.name}>{detail.nickname}</div>
              <div className={styles.des}>
                {detail.introduction || USER_DESC}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <OpenApp isDown={true} className={styles.btn}>
              关注
            </OpenApp>
          </div>
        </div>
        <div className={styles.swiperBox}>
          {detail.image && detail.image.length ? (
            <SwiperBox list={detail.image} />
          ) : (
            ""
          )}
        </div>
        <AtCont className={styles.detailContent} data={detail} />

        <TopicChild
          detail={detail.parentMoment}
          className={styles.TopicChild}
        />

        <div className={styles.detailTime}>{formatDate(detail.createTime)}</div>
        {detail.location && detail.location.id && (
          <div className={styles.mapBg} onClick={this.linkLocal}>
            <MapBg data={detail.location} />
          </div>
        )}
        <div className={styles.commentBox}>
          <div className={styles.title}>评论&nbsp;{detail.commentCount}</div>
          {commentList.length ? <CommentModule list={commentList} /> : ""}
        </div>
        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP与大家一起互动吧
        </OpenApp>
        {commentList.length > 3 && <OpenAppFooter />}
      </div>
    );
  }
}
export default Page;
