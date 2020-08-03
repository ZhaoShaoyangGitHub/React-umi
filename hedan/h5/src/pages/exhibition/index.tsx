import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getUrlParam } from "@/utils/utils";
import { getDetail, getList } from "./api";
import DownloadAPP from "@/components/DownloadApp";
import Clipboard from "clipboard";
import ToyListFalls from "./module/ToyListFalls";
import OpenApp from "@/components/OpenApp";
import { Toast } from "antd-mobile";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";

interface ComponentsProps extends props {
  name: string;
}

type StateType = {
  exhibitionId: string;
  detail: any;
  expoList: any;
  toyList: any;
  [propsName: string]: any;
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    exhibitionId: "",
    detail: {},
    expoList: [],
    toyList: [],
    copystr: "xxxasasd",
  };

  UNSAFE_componentWillMount() {
    let { exhibitionId } = getUrlParam();
    const { test } = getUrlParam();
    if (exhibitionId) {
      //
    } else {
      if (test) {
        exhibitionId = "1207584320303140866";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 exhibitionId");
      }
    }

    this.setState(
      {
        exhibitionId,
      },
      () => {
        this.initData();
      },
    );
  }

  componentDidMount() {}

  initData = () => {
    const { exhibitionId } = this.state;
    getDetail({
      exhibitionId,
    }).then((res) => {
      if (res.data) {
        const { exhibition, expoList } = res.data;
        this.setState({
          detail: exhibition,
          expoList,
        });
      } else {
        this.setState({
          exhibitionId: "",
        });
      }
    });
    getList({
      exhibitionId,
      pageSize: 10,
      pageIndex: 1,
    }).then((res) => {
      const { list } = res.data;
      this.setState({
        toyList: list,
      });
    });
  };

  copyFun = (e: any) => {
    const clipboard = new Clipboard(".cobyOrderSn");
    clipboard.on("success", function() {
      Toast.success("复制成功", 1);
    });
    clipboard.on("error", function() {
      Toast.fail("复制失败", 1);
    });
  };

  render() {
    const { detail, expoList, toyList, exhibitionId } = this.state;

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />

        {!detail.title && <NullPage />}

        <div
          className={styles.detailCover}
          style={{
            backgroundImage: `url(${detail.poster})`,
          }}
        >
          <div className={styles.mask}></div>
          <div className={styles.content}>
            <img
              className={styles.headPortrait}
              src={detail.seriesThumb}
              alt=""
            />
            <div
              data-clipboard-action="copy"
              data-clipboard-text={detail.title}
              onClick={this.copyFun}
              className={`${styles.name} cobyOrderSn`}
            >
              {detail.title}
            </div>
            <div
              className={`${styles.address} cobyOrderSn`}
              data-clipboard-action="copy"
              data-clipboard-text={detail.address}
              onClick={this.copyFun}
            >
              <img
                className={styles.icon}
                src={require("./img/local.png").default}
                alt=""
              />
              {detail.address}
            </div>
            <div
              className={`${styles.address} cobyOrderSn`}
              data-clipboard-action="copy"
              data-clipboard-text={detail.holdTime}
              onClick={this.copyFun}
            >
              <img
                className={styles.icon}
                src={require("./img/calendar.png").default}
                alt=""
              />
              {detail.holdTime}
            </div>
          </div>
        </div>

        <div className={styles.exhibitor}>
          <OpenApp className={styles.catchBtn}>捕捉该展会</OpenApp>
          <div className={styles.exhibitorList}>
            <div className={styles.title}>参展方一览</div>
            <div className={styles.listBox}>
              <div className={styles.scrollBox}>
                {expoList.map((item: any) => {
                  return (
                    <div className={styles.item} key={item.title}>
                      <img
                        className={styles.exhibitorCover}
                        src={item.thumb}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <OpenApp className={styles.all}>
              查看全部 {expoList.length} 参展方
              <img
                className={styles.allIcon}
                src={require("./img/arrow.png").default}
                alt=""
              />
            </OpenApp>
          </div>
        </div>

        {/* 玩具列表 */}
        <div className={styles.toy}>
          <div className={styles.originalTitle}>
            <span className={styles.originalTitle_item}>参展玩具一览</span>
          </div>

          {toyList.length ? <ToyListFalls list={toyList} /> : ""}
        </div>

        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP浏览该展会完整资讯吧
        </OpenApp>
        <OpenAppFooter />
      </div>
    );
  }
}
export default Page;
