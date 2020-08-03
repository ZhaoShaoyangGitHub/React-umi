/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */

import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";

import "./index.scss";

import { getImageList } from "../../api";

import ImgList from "./module/ImgList";

interface moduleProps {
  [propsName: string]: any;
}

type stateType = {
  list: any;
  activeIndex: number;
};

interface Module {}

const win: any = window;

const Swiper = win.Swiper as any;
let isInitApi = false;

class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {};

  state: stateType = {
    list: [],
    activeIndex: 0,
  };

  mySwiper: any;

  UNSAFE_componentWillReceiveProps() {
    if (this.props.activeIndex === 2) {
      this.initApi();
    }
  }

  initApi = () => {
    if (!isInitApi) {
      isInitApi = true;
      getImageList().then((res) => {
        if (res.code === "OK") {
          this.setState(
            {
              list: res.data,
            },
            () => {
              this.initSwiper();
            },
          );
        }
      });
    }
  };

  componentDidMount() {}

  initSwiper = () => {
    const _this = this;

    _this.mySwiper = new Swiper(".screen3-swiper", {
      on: {
        slideChangeTransitionStart() {
          const $this: any = this;
          _this.setState({
            activeIndex: $this.activeIndex,
          });
        },
      },
      pagination: {
        el: ".screen3-pagination",
        clickable: true,
        renderBullet(index: any, className: any) {
          return `<div class="${className}"></div>`;
        },
      },
    });
  };

  render() {
    const { list, activeIndex } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.h2}>可能是聚集</div>
        <div className={styles.h1}>最多摄影达人</div>
        <div className={styles.h2}>的潮玩图片社区</div>
        {/* 6个一组开始遍历 */}
        <div className={`${styles.swiperBox} screen3_swiper_box`}>
          {/*  */}
          <div className="swiper-container screen3-swiper">
            <div className="swiper-wrapper">
              {list.map((itemList: any, index: number) => {
                return (
                  <div className="swiper-slide screen3-silder" key={index}>
                    <ImgList
                      data={itemList}
                      swiperIndex={activeIndex}
                      moduleIndex={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="screen3-pagination"></div>
        </div>
      </div>
    );
  }
}
export default Module;
