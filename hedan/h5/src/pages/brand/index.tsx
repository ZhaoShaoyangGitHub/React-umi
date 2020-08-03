import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getUrlParam } from "@/utils/utils";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import { getDetail } from "./api";
import ToyGroupList from "./module/ToyGroupList";
import MemberList from "./module/MemberList";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";

interface ComponentsProps extends props {
  [propsName: string]: any;
}

type otherObj = {
  title: string;
  link: string;
};

type StateType = {
  brandId: string;
  brand: {
    // 品牌信息
    [propsName: string]: any;
  };
  briskAdoptList: any[]; // 活跃成员
  contributeAdoptList: any[]; // 特殊贡献成员
  memberList: any[]; // 成员
  toyGroupList: { time: number; toyList: any[] }[]; // 玩具
  showStyleBtn: boolean;
  showStyleStatus: boolean;
  ohterArr: otherObj[];
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}

const chatIcons = ["facebook", "instagram", "weibo", "twitter"];

class Page extends React.Component<ComponentsProps> {
  state: StateType = {
    brandId: "",
    brand: {},
    memberList: [],
    briskAdoptList: [],
    contributeAdoptList: [],
    toyGroupList: [],
    showStyleBtn: false,
    showStyleStatus: false,
    ohterArr: [],
  };

  UNSAFE_componentWillMount() {
    let { brandId } = getUrlParam();
    const { test } = getUrlParam();
    if (brandId) {
      //
    } else {
      if (test) {
        brandId = "1195243859798396930";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 brandId");
      }
    }

    this.setState(
      {
        brandId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const { brandId } = this.state;
    // console.log(brandId);
    getDetail({
      brandId,
    }).then((res: any) => {
      const { data } = res;
      if (data) {
        const {
          brand,
          briskAdoptList,
          memberList,
          contributeAdoptList,
          toyGroupList,
        } = data;
        const ohterArr: any = [];
        chatIcons.forEach((el) => {
          if (brand[el]) {
            ohterArr.push({
              title: el,
              link: brand[el],
            });
          }
        });
        this.setState(
          {
            brand,
            briskAdoptList,
            memberList,
            contributeAdoptList,
            toyGroupList,
            ohterArr,
          },
          () => {
            this.infoFun();
          },
        );
      } else {
        this.setState({
          brandId: "",
        });
      }
    });
  };

  infoFun = () => {
    const _this = this;
    setTimeout(() => {
      const boxElm: any = document.getElementById("brand-infoBox");
      const infoElm: any = document.getElementById("brand-info");
      const boxH = boxElm.offsetHeight;
      const infoH = infoElm.offsetHeight;
      if (infoH > boxH) {
        _this.setState({
          showStyleBtn: true,
        });
      }
    }, 100);
  };

  showStyleFun = () => {
    this.setState({
      showStyleStatus: !this.state.showStyleStatus,
    });
  };

  render() {
    const {
      brand,
      memberList,
      toyGroupList,
      showStyleBtn,
      showStyleStatus,
      ohterArr,
      brandId,
    } = this.state;

    let infoBoxStyle = {};

    if (showStyleStatus) {
      infoBoxStyle = {
        maxHeight: "none",
      };
    } else {
      infoBoxStyle = {
        maxHeight: "1.12rem",
      };
    }

    if (brand.title) {
      document.title = `${brand.title} - 盒DAN`;
    }

    return (
      <div className={styles.wrapper}>
        <DownloadAPP />
        {!brandId && <NullPage />}

        <div className={styles.brandBox}>
          <div className={styles.brandTitle}>
            <img className={styles.cover} src={brand.thumb} alt="" />
            <div className={styles.name}>{brand.title}</div>
          </div>

          <div className={styles.introduce}>
            <div className={styles.title}>品牌介绍</div>
            <div
              className={styles.introductionBox}
              id="brand-infoBox"
              style={infoBoxStyle}
            >
              <pre id="brand-info" className={styles.introduction}>
                {brand.introduction}
              </pre>
              {showStyleBtn && (
                <span
                  className={styles.showStyleBtn}
                  onClick={this.showStyleFun}
                >
                  <span className={styles.diandiandian}> ... </span>
                  {showStyleStatus ? "收起" : "展开"}
                </span>
              )}
            </div>
          </div>

          {memberList.length ? (
            <div className={styles.member}>
              <div className={styles.title}>「{brand.title}」成员</div>
              <MemberList brand={brand.title} list={memberList} />
            </div>
          ) : (
            ""
          )}
          {ohterArr.length > 0 && (
            <div className={styles.otherInfo}>
              <div className={styles.title}>其他信息</div>
              <div className={styles.iconBox}>
                {ohterArr.map((item) => {
                  return (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.title}
                      className={styles.icon}
                    >
                      <img
                        src={require(`./img/${item.title}.svg`).default}
                        alt=""
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {brand.website && (
            <div className={styles.otherInfo}>
              <div className={styles.title}>网站</div>
              <div className={styles.link}>
                <a
                  className={styles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={brand.website}
                >
                  {brand.website}
                </a>
                <img
                  className={styles.icon}
                  src={require("./img/linkicon.svg").default}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.toyList}>
          <div className={styles.title}>「{brand.title}」的玩具创作一览</div>
          {toyGroupList.length ? <ToyGroupList list={toyGroupList} /> : ""}
        </div>

        {/* footer */}
        <OpenApp className={styles.footerOpenBtn}>
          打开APP看看该玩具的完整品牌资料吧
        </OpenApp>
        <OpenAppFooter />
      </div>
    );
  }
}
export default Page;
