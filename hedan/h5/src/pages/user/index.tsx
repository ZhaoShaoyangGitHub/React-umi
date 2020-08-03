import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getUrlParam } from "@/utils/utils";
import { getUserDetail, getOriginal } from "./api";
import OpenApp from "@/components/OpenApp";
import DownloadAPP from "@/components/DownloadApp";
import AuthIcon from "@/components/AuthIcon";
import TopicList from "@/components/TopicList";
import NullPage from "@/components/NullPage";
import { USER_DESC, DefaultUserBg } from "@/config/constants";
import { getImgColor } from "@/utils/catchColor";
import OpenAppFooter from "@/components/OpenAppFooter";
import Gender from "@/components/Gender";

function numAdd(num: number) {
  let count = num + 51;
  if (count > 255) {
    count = 255;
  }
  return count;
}

function numDown(num: number) {
  let count = num - 51;
  if (count < 0) {
    count = 0;
  }
  return count;
}

interface ComponentsProps extends props {
  name: string;
  [propsName: string]: any;
}

type StateType = {
  customerId: string;
  age: number;
  detail: any;
  originalList: any;
  bgColor: string;
};

interface User {
  props: ComponentsProps;
  state: StateType;
}

class User extends React.Component<ComponentsProps> {
  state: StateType = {
    customerId: "",
    age: 123,
    detail: null,
    originalList: null,
    bgColor: "",
  };

  UNSAFE_componentWillMount() {
    let { userId } = getUrlParam();
    const { test } = getUrlParam();
    if (userId) {
      //
    } else {
      if (test) {
        userId = "5";
        userId = "1229333854918021122";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 userId");
      }
    }

    this.setState(
      {
        customerId: userId,
      },
      () => {
        this.initData();
      },
    );
  }

  componentDidMount() {}

  getBgColor = async () => {
    const { detail } = this.state;
    const url = detail.background || DefaultUserBg;
    const color: any = await getImgColor(url);
    const rgbStr = color
      .replace("rgb(", "")
      .replace(")", "")
      .replace(" ", "");
    const rgbArr = rgbStr.split(",");
    const r = rgbArr[0];
    const g = rgbArr[1];
    const b = rgbArr[2];

    const upColor = `rgb(${numAdd(r)},${numAdd(g)},${numAdd(b)})`;
    const downClor = `rgb(${numDown(r)},${numDown(g)},${numDown(b)})`;
    this.setState({
      // bgColor: `linear-gradient(174deg,${upColor} 0%, ${downClor} 100%)`,
      bgColor: color,
    });
  };

  initData = () => {
    const { customerId } = this.state;
    getUserDetail({
      customerId,
    }).then((res: any) => {
      if (res.data) {
        this.setState(
          {
            detail: res.data,
          },
          () => {
            this.getBgColor();
          },
        );
      } else {
        this.setState({
          customerId: "",
        });
      }
    });
    getOriginal({
      customerId,
      pageIndex: 1,
      pageSize: 20,
    }).then((res) => {
      const originalList = res.data.list;

      this.setState({
        originalList,
      });
    });
  };

  scrollFun = () => {
    const Elm: any = document.getElementById("user_page_dynamic");
    const Root_elm: any = document.getElementById("root");
    Root_elm.scrollTop = Elm.offsetTop;
  };

  hrefToy = () => {
    const { detail, originalList } = this.state;
    this.props.history.push(`/toy_chest?userId=${detail.userId}`);
  };

  linkDynamic_user = (item: any) => {
    this.props.history.push(`/dynamic_user?momentId=${item.momentId}`);
  };

  render() {
    const { detail, originalList, customerId, bgColor } = this.state;

    if (detail && detail.nickname) {
      document.title = `${detail.nickname}的个人主页 - 盒DAN `;
    }

    let userArea = "乌托邦";
    if (detail && detail.country) {
      userArea = `${detail.country}`;
      if (detail.area) {
        userArea += `·${detail.area}`;
      }
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!customerId && <NullPage />}
        {/* 主页信息 */}
        {detail ? (
          <>
            <div
              className={styles.profile}
              style={{
                backgroundImage: `url(${detail.background || DefaultUserBg})`,
              }}
            >
              <div className={styles.mask}></div>
              <div className={styles.userinfo}>
                <Avatar url={detail.avatar} className={styles.avatar}>
                  <AuthIcon className={styles.authIcon} data={detail} />
                </Avatar>
                <div className={styles.username}>{detail.nickname}</div>
                <div className={styles.location}>
                  <Gender className={styles.localIcon} gender={detail.gender} />
                  {userArea}
                </div>
              </div>
              <OpenApp isDown={true} className={styles.followBtn}>
                关注
              </OpenApp>
            </div>
            {/*  */}
            <div
              className={styles.detail}
              style={{
                background: bgColor,
              }}
            >
              <div className={styles.mask}>
                <div className={styles.countList}>
                  <OpenApp isDown={true} className={styles.countItem}>
                    <div className={styles.countNum}>{detail.fansCount}</div>
                    <div className={styles.countDesc}>粉丝</div>
                  </OpenApp>
                  <OpenApp isDown={true} className={styles.countItem}>
                    <div className={styles.countNum}>{detail.followCount}</div>
                    <div className={styles.countDesc}>关注</div>
                  </OpenApp>
                  <div className={styles.countItem} onClick={this.scrollFun}>
                    <div className={styles.countNum}>{detail.momentCount}</div>
                    <div className={styles.countDesc}>动态</div>
                  </div>
                  <div className={styles.countItem} onClick={this.hrefToy}>
                    <div className={styles.countNum}>{detail.cabinetCount}</div>
                    <div className={styles.countDesc}>玩具</div>
                  </div>
                </div>

                <pre className={styles.introduction}>
                  {detail.introduction || USER_DESC}
                </pre>

                {detail.authIntro ? (
                  <div className={styles.authIntroBox}>
                    <div className={styles.authIntroTitle}>
                      认证介绍
                      <AuthIcon className={styles.authIcon} data={detail} />
                    </div>
                    <pre className={styles.authIntroCont}>
                      {detail.authIntro}
                    </pre>
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.badge}>
                  <div className={styles.badgeTitle}>SPECIAL徽章</div>
                  <div className={styles.badgeList}>
                    <div className={styles.screenBox}>
                      {detail.badgeList.map((badge: any) => {
                        return (
                          <div className={styles.badgeItem} key={badge.badgeId}>
                            <img src={badge.image} alt="徽章" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {/* 原创动态列表 */}
        {originalList ? (
          <div className={styles.originalList} id="user_page_dynamic">
            <div className={styles.originalTitle}>
              <span className={styles.originalTitle_item}>原创</span>
            </div>
            {originalList.length ? (
              <TopicList type="user" list={originalList} />
            ) : (
              ""
            )}
          </div>
        ) : null}

        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP浏览{detail && detail.nickname}的完整主页
        </OpenApp>
        <OpenAppFooter />
      </div>
    );
  }
}
export default User;
