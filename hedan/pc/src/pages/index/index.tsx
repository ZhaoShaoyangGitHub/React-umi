/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */
import React from "react";
import { observer, inject } from "mobx-react";
import "./index.scss";
import Header from "./module/Header";
import Screen1 from "./module/Screen1";
import Screen2 from "./module/Screen2";
import Screen3 from "./module/Screen3";
import Screen4 from "./module/Screen4";
import Screen5 from "./module/Screen5";
import { getAppDownUrl } from "@/utils/getDownLoadUrl";

import Jobs from "./module/Jobs";
import { getJobText } from "./api";

const win: any = window;

const Swiper = win.Swiper as any;

type StateType = {
  jobs: any[];
  operateStatus: boolean;
  productStatus: boolean;
  androidUrl: string;
  iosUrl: string;
};

let isJobsApi = false;

@inject("store") // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class Page extends React.Component<props> {
  state: StateType = {
    jobs: [],
    operateStatus: false,
    productStatus: false,
    androidUrl: "",
    iosUrl: "",
  };

  mySwiper: any;

  componentDidMount() {
    this.initSwiper();

    this.mouseWhel();
    this.initDownAppApi();
  }

  initDownAppApi = () => {
    getAppDownUrl().then((res) => {
      this.props.store.indexStore.iosUrl = res.iosUrl;
      this.props.store.indexStore.androidUrl = res.androidUrl;
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

  timeOut: any = null;

  mouseWhel = () => {
    const elm = win.document.getElementsByClassName("IndexWrapper")[0];
    const _this = this;
    elm.onmousewheel = (e: any) => {
      const event = e;
      let down = true;
      if (event) {
        if (event.deltaY > 0) {
          down = true;
        } else {
          down = false;
        }
      }

      clearTimeout(_this.timeOut);
      _this.timeOut = setTimeout(() => {
        if (down) {
          _this.mySwiper.slideNext();
        } else {
          _this.mySwiper.slidePrev();
        }
      }, 100);
    };
  };

  initSwiper = (callback = () => {}) => {
    const _this = this;
    const { indexStore } = this.props.store;
    const { activeIndex } = indexStore;
    this.mySwiper = new Swiper(".swiper_index_box", {
      direction: "vertical", // 垂直切换选项
      loop: false, // 循环模式选项
      initialSlide: activeIndex,
      on: {
        slideChangeTransitionStart() {
          const $this: any = this;
          _this.props.store.indexStore.updateSwiperActiveIndex(
            $this.activeIndex,
          );
          if ($this.activeIndex === 4 && !isJobsApi) {
            _this.getJobApi();
          }
        },
      },
      pagination: {
        el: ".index-pagination",
        clickable: true,
        renderBullet(index: any, className: any) {
          return `<div class="${className}"></div>`;
        },
      },
    });
    callback();
  };

  showOperate = () => {
    this.setState({
      operateStatus: true,
    });
  };

  showProduct = () => {
    this.setState({
      productStatus: true,
    });
  };

  cloesMask = () => {
    this.setState({
      operateStatus: false,
      productStatus: false,
      // downLoadStatus: false,
    });
  };

  showMask = () => {};

  onSwatch = (index: number) => {
    this.mySwiper.slideTo(index, 1000);
  };

  render() {
    const { operateStatus, productStatus, jobs } = this.state;
    // const { indexStore } = this.props.store;
    // let downLoadStatus = false;
    // if (indexStore.type) {
    //   downLoadStatus = true;
    // }
    return (
      <div className="IndexWrapper">
        <Header onSwatch={this.onSwatch} />
        <div className="index-pagination"></div>
        {/*  */}
        <div className="swiper-container swiper_index_box swiper-no-swiping">
          <div className="swiper-wrapper">
            <div className="swiper-slide swiper_index_slide">
              <Screen1 />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen2 />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen3 />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen4 />
            </div>
            <div className="swiper-slide swiper_index_slide">
              <Screen5
                showOperate={this.showOperate}
                showProduct={this.showProduct}
              />
            </div>
          </div>
        </div>
        {/*  */}
        {operateStatus && (
          <div className="downLoadPage">
            <Jobs active={1} jobs={jobs} onClose={this.cloesMask} />
          </div>
        )}
        {productStatus && (
          <div className="downLoadPage">
            <Jobs active={0} jobs={jobs} onClose={this.cloesMask} />
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
                this.props.store.indexStore.close();
              }}
            ></div>
          </div>
        )} */}
      </div>
    );
  }
}
export default Page;
