/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */
import React from "react";
import Avatar from "@/components/Avatar";
import "./index.scss";
import Header from "./module/Header";
import Screen1 from "./module/Screen1";
import Screen2 from "./module/Screen2";
import Screen3 from "./module/Screen3";
import Screen4 from "./module/Screen4";
import Screen5 from "./module/Screen5";

import NavModule from "./module/Nav";
import Jobs from "./module/Jobs";
import {getJobText} from "./api";

import {APPSTORE_LINK, isLink_outwx} from "@/config/constants";

import {getAppDownUrl} from "@/utils/getDownLoadUrl";

const win: any = window;

const Swiper = win.Swiper as any;

let isJobsApi = false;

type StateType = {
  jobs: any[];
  navStatus: boolean;
  headerColor: "white" | "vi";
  swiperColor: "white" | "vi";
  activeIndex: Number;
  operateStatus: boolean;
  productStatus: boolean;
  videStatus: boolean;
  // downLoadStatus: boolean;
  videoSrc: string;
  downAppUrl: string;
};

class Page extends React.Component<props> {
  state: StateType = {
    jobs: [],
    navStatus: false,
    headerColor: "vi",
    swiperColor: "vi",
    activeIndex: 0,
    operateStatus: false,
    productStatus: false,
    videStatus: false,
    // downLoadStatus: false,
    downAppUrl: APPSTORE_LINK,
    videoSrc: "",
  };

  mySwiper: any;

  componentDidMount() {
    this.initSwiper();
    this.initDownAppApi();
  }

  initDownAppApi = () => {
    getAppDownUrl().then((res) => {
      this.setState({
        downAppUrl: res,
      });
    });
  };

  getJobApi = () => {
    isJobsApi = true;
    getJobText().then((res) => {
      this.setState({
        jobs: res.data,
      });
    });
  };

  initSwiper = () => {
    const _this = this;
    const {activeIndex} = this.state;

    this.mySwiper = new Swiper(".swiper_index_box", {
      direction: "vertical", // 垂直切换选项
      loop: false, // 循环模式选项
      initialSlide: activeIndex,
      on: {
        slideChangeTransitionStart() {
          const $this: any = this;

          _this.setState(
            {
              activeIndex: $this.activeIndex,
            },
            () => {
              _this.setTopBarColor();
            },
          );

          if ($this.activeIndex === 4 && !isJobsApi) {
            _this.getJobApi();
          }
        },
      },
    });
  };

  setTopBarColor = () => {
    const _this = this;
    const {activeIndex} = this.state;
    let headerColor = "white";
    switch (activeIndex) {
      case 0:
      case 1:
      case 3:
        headerColor = "vi";
        break;
      case 2:
      case 4:
        headerColor = "white";
        break;
      default:
        headerColor = "vi";
        break;
    }
    _this.setState({
      headerColor,
    });
  };

  closeMask = () => {
    const _this = this;
    this.setState(
      {
        navStatus: false,
        operateStatus: false,
        productStatus: false,
        videStatus: false,
      },
      () => {
        _this.setTopBarColor();
      },
    );
  };

  topBarStatus = () => {
    const {navStatus, operateStatus, productStatus, videStatus} = this.state;
    if (navStatus || operateStatus || productStatus || videStatus) {
      return true;
    } else {
      return false;
    }
  };

  showNav = () => {
    const _this = this;
    if (_this.topBarStatus()) {
      _this.closeMask();
    } else {
      //打开
      this.setState({
        navStatus: true,
        headerColor: "white",
      });
    }
  };

  showOperate = () => {
    this.setState({
      operateStatus: true,
      headerColor: "vi",
    });
  };

  showProduct = () => {
    this.setState({
      productStatus: true,
      headerColor: "vi",
    });
  };

  playVideo = () => {
    this.setState({
      videStatus: true,
      headerColor: "white",
    });
  };

  showMask = () => {};

  downLoadApp = () => {
    const {downAppUrl} = this.state;
    if (isLink_outwx()) {
      this.props.history.push("/out_wx?open=store");
    } else {
      window.location.href = downAppUrl;
    }
  };

  render() {
    const {
      headerColor,
      activeIndex,
      navStatus,
      operateStatus,
      productStatus,
      videStatus,
      // downLoadStatus,
      jobs,
      videoSrc,
    } = this.state;

    return (
      <div className="IndexWrapper">
        <Header
          status={this.topBarStatus()}
          color={headerColor}
          onChange={this.showNav}
        />
        {/*  */}
        <div className="swiper-container swiper_index_box">
          <div className="swiper-wrapper">
            <div className="swiper-slide swiper_index_slide">
              <Screen1 downLoadApp={this.downLoadApp} />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen2 activeIndex={activeIndex} />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen3 activeIndex={activeIndex} />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen4
                playVideo={(param: any) => {
                  this.setState({
                    videoSrc: param.video,
                  });
                  this.playVideo();
                }}
                activeIndex={activeIndex}
              />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen5
                showOperate={this.showOperate}
                showProduct={this.showProduct}
                downLoadApp={this.downLoadApp}
              />
            </div>
          </div>
        </div>
        {/*  */}
        {navStatus && (
          <div className="maskPage">
            <NavModule
              downLoadApp={() => {
                this.closeMask();
                this.downLoadApp();
              }}
              screenTop={(index: Number) => {
                this.closeMask();
                this.mySwiper.slideTo(index, 1000);
              }}
            />
          </div>
        )}
        {operateStatus && (
          <div className="maskPage">
            <Jobs active={1} jobs={jobs} />
          </div>
        )}
        {productStatus && (
          <div className="maskPage">
            <Jobs active={0} jobs={jobs} />
          </div>
        )}
        {videStatus && (
          <div className="maskPage videoPage">
            <video
              id="indexVideo"
              controls
              autoPlay
              className="video"
              src={videoSrc}
            ></video>
          </div>
        )}
        {/* {downLoadStatus && (
          <div className="downLoadPage">
            <div className="downLoadPage_bg"></div>
            <img
              className="downImg"
              src={require("@/assets/image/androld_down.png").default}
              alt=""
            />
            <div
              className="closeBtn"
              onClick={() => {
                this.setState({
                  downLoadStatus: false,
                });
              }}
            ></div>
          </div>
        )} */}
      </div>
    );
  }
}
export default Page;
