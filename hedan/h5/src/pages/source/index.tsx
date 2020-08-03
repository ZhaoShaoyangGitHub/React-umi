import React from "react";
import styles from "./index.module.scss";
import { getUrlParam, formatDate, openApp, encodeUnicode } from "@/utils/utils";
import { getDetail } from "./api";
import DownloadAPP from "@/components/DownloadApp";
import { sellType } from "@/assets/filter/filter";
import OpenApp from "@/components/OpenApp";
import NullPage from "@/components/NullPage";

import { DefaultRobotImg, isLink_outwx } from "@/config/constants";

type stateType = {
  detail: any;
  robotId: string;
};

class Page extends React.Component<props> {
  state: stateType = {
    detail: {},
    robotId: "",
  };

  UNSAFE_componentWillMount() {
    let { robotId } = getUrlParam();
    const { test } = getUrlParam();
    if (robotId) {
      //
    } else {
      if (test) {
        robotId = "6";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 robotId");
      }
    }

    this.setState(
      {
        robotId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const _this = this;
    const { robotId } = _this.state;
    getDetail({
      robotId,
    }).then((res) => {
      if (res.data) {
        _this.setState(
          {
            detail: res.data,
          },
          () => {
            _this.linkHerf(false);
          },
        );
      } else {
        _this.setState({
          robotId: "",
        });
      }
    });
  };

  filterDay = (time: string = "") => {
    const str = formatDate(time);

    const date = str.split(" ")[0];

    const arr = date.split(".");

    if (arr.length === 3) {
      return `${arr[1]}.${arr[2]}`;
    } else {
      return "";
    }
  };

  filterYear = (time: string = "") => {
    const str = new Date(time);
    const year = str.getFullYear();

    return String(year);
  };

  linkHerf = (param: boolean) => {
    //在这里有不同类型的跳转
    const _this = this;
    const { detail } = this.state;

    if (detail.type === 2) {
      const openUrl = `/exhibition?exhibitionId=${detail.exhibitionId}`;
      const hostName = window.location.origin + openUrl;
      openApp(hostName);

      const openTime = Number(new Date());
      const timer = setTimeout(function() {
        const newDate: number = Number(new Date());
        if (newDate - openTime < 2200) {
          //加了200ms基准误差
          if (param) {
            _this.props.history.push(openUrl);
          }
        }
        if (newDate - openTime > 2200) {
          clearTimeout(timer);
        }
      }, 2000);
    } else {
      //正常流程
      _this.open();
    }
  };

  open = () => {
    const _this = this;
    const url = window.location.href;
    if (isLink_outwx()) {
      this.props.history.push(`/out_wx?url=${encodeUnicode(url)}`);
    } else {
      openApp();
      const openTime = Number(new Date());
      const timer = setTimeout(function() {
        const newDate: number = Number(new Date());
        if (newDate - openTime < 2200) {
          //加了200ms基准误差
          window.location.href = "/";
        }
        if (newDate - openTime > 2200) {
          clearTimeout(timer);
        }
      }, 2000);
    }
  };

  render() {
    const { detail, robotId } = this.state;
    if (detail.title) {
      document.title = `${detail.title} - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP isOpenApp={false} />
        {!robotId && <NullPage desc="抱歉,此玩具动态已被无情删除" />}
        <div className={styles.robot}>
          <div className={styles.robotTitle}>Hello, 我是盒DAN机器人</div>
          <div className={styles.robotDesc}>
            以下是我捕捉到的相关玩具资讯，请查阅~
          </div>
          <img
            className={styles.robot_bg}
            src={require("@/assets/image/ufo.svg").default}
            alt=""
          />
        </div>

        <div className={styles.source}>
          <div className={styles.sourceDate}>
            <div className={styles.day}>
              {this.filterDay(detail.gatherTimeUnix)}
            </div>
            <div className={styles.year}>
              {this.filterYear(detail.gatherTimeUnix)}
            </div>
          </div>

          <a
            href={detail.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceDesc}
          >
            <div
              className={styles.imgWrapper}
              style={{
                backgroundImage: `url(${detail.thumb || DefaultRobotImg})`,
              }}
            >
              <div className={styles.typeLabel}>
                {detail.isNew ? <div className={styles.newIcon}>New</div> : ""}
                {detail.sellType > -1 ? (
                  <div className={styles.limticon}>{sellType(detail)}</div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.more}>
                <img
                  className={styles.moreIcon}
                  src={require("@/assets/image/more.svg").default}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.strBox}>
              <div className={styles.des}>{detail.description}</div>
              <div className={styles.link}>
                来源
                {detail.source}
                {detail.shortLink && (
                  <img
                    className={styles.linkicon}
                    src={require("@/assets/image/linkicon.svg").default}
                    alt=""
                  />
                )}
                {detail.shortLink}
              </div>
            </div>
          </a>
        </div>

        <OpenApp
          className={styles.footerOpenBtn}
          onClick={() => {
            this.linkHerf(true);
          }}
        >
          打开APP浏览更多该玩具相关资讯
        </OpenApp>
      </div>
    );
  }
}
export default Page;
