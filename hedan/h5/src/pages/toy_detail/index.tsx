/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */

import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import "./index.scss";
import { getUrlParam } from "@/utils/utils";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import { getDetail } from "./api";
import ToyTable from "./module/ToyTable";
import { getImgColor } from "@/utils/catchColor";
import NullPage from "@/components/NullPage";
import OpenAppFooter from "@/components/OpenAppFooter";

interface ComponentsProps extends props {
  [propsName: string]: any;
}

type StateType = {
  toyId: string;
  toyDetail: {
    [propsName: string]: any;
  };
  photoList: any[];
  activeIndex: number;
  bgColorArr: string[];
  bgColor: string;
};

interface Page {
  props: ComponentsProps;
  state: StateType;
}
const win: any = window;

const Swiper = win.Swiper as any;

class Page extends React.Component {
  state: StateType = {
    toyId: "",
    toyDetail: {},
    photoList: [],
    activeIndex: 0,
    bgColorArr: [],
    bgColor: "",
  };

  mySwiper: any;

  UNSAFE_componentWillMount() {
    let { toyId } = getUrlParam();
    const { test } = getUrlParam();
    if (toyId) {
      //
    } else {
      if (test) {
        toyId = "1195243859798396930";
      } else {
        // eslint-disable-next-line no-alert
        window.alert("缺少 toyId");
      }
    }

    this.setState(
      {
        toyId,
      },
      () => {
        this.initData();
      },
    );
  }

  initData = () => {
    const { toyId } = this.state;
    getDetail({
      toyId,
    }).then((res: any) => {
      if (res.data) {
        const { toy } = res.data;
        const photoList = toy.photo;
        // photoList.push("http://file.hedan.art/FiCUMcwaSGC7mnYDaLQ9vA9Hb6EI");
        // photoList.push("http://file.hedan.art/FrPaxZwSREak_z9qASBtmHvxqcTp");
        // photoList.push("http://file.hedan.art/FtKN7xPHw9bq3gL_dfKk7zhEryWH");
        this.setState(
          {
            toyDetail: toy,
            photoList,
          },
          () => {
            this.getBgColor();
          },
        );
      } else {
        this.setState({
          toyId: "",
        });
      }
    });
  };

  getBgColor = () => {
    const _this = this;
    const { photoList } = this.state;
    let count = 0;
    const maxCount = photoList.length;
    const bgColorArr: string[] = new Array(maxCount).fill("#dbcddd");

    photoList.forEach(async (el, index) => {
      const color: any = await getImgColor(el);
      count += 1;
      bgColorArr[index] = color;
      if (count >= maxCount) {
        outPut();
      }
    });
    function outPut() {
      _this.setState(
        {
          bgColorArr,
        },
        () => {
          _this.initSwiper();
        },
      );
    }
  };

  initSwiper = () => {
    const _this = this;
    _this.setBarColor();
    _this.mySwiper = new Swiper(".toy_detail-swiper", {
      on: {
        slideChangeTransitionStart() {
          const $this: any = this;
          _this.setState(
            {
              activeIndex: $this.activeIndex,
            },
            () => {
              _this.setBarColor();
            },
          );
        },
      },
      pagination: {
        el: ".toy_detail-pagination",
        clickable: true,
        renderBullet(index: any, className: any) {
          return `<div class="${className}"></div>`;
        },
      },
    });
  };

  setBarColor = () => {
    const { activeIndex, bgColorArr } = this.state;
    const bgColor = bgColorArr[activeIndex];
    this.setState({
      bgColor,
    });
  };

  render() {
    const { toyDetail, photoList, bgColor, toyId } = this.state;

    if (toyDetail.title) {
      document.title = `${toyDetail.title} - 盒DAN`;
    }

    return (
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <DownloadAPP />
        {!toyId && <NullPage />}

        <div className={styles.title}>{toyDetail.title}</div>

        <div className={`${styles.swiperBox} toy_detail_swiper_box`}>
          {/*  */}
          <div className="swiper-container toy_detail-swiper">
            <div className="swiper-wrapper">
              {photoList.map((item: any, index: number) => {
                return (
                  <div className="swiper-slide toy_detail-silder" key={index}>
                    {toyDetail.isCoop && (
                      <div className={styles.coop}>合作款</div>
                    )}
                    <img className={styles.toyImg} src={item} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          {photoList.length > 1 && (
            <div className="toy_detail-pagination"></div>
          )}
        </div>

        <div className={styles.table}>
          {toyDetail.title && <ToyTable data={toyDetail} />}
        </div>

        <div className={styles.rightNav}>
          <OpenApp isDown={true} className={styles.btnHeart}>
            <img src={require("./img/heart.png").default} alt="" />
          </OpenApp>
          <OpenApp className={styles.btnBook}>
            <img src={require("./img/book.png").default} alt="" />
          </OpenApp>
        </div>
        <OpenApp className={styles.footerOpenBtn}>
          打开APP查看更多玩具信息吧
        </OpenApp>
      </div>
    );
  }
}
export default Page;
