/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable consistent-this */

import React from "react";
import styles from "./index.module.scss";
import { observer, inject } from "mobx-react";

import "./index.scss";

import { getImageList } from "../../api";

import ImgList from "./module/ImgList";

interface moduleProps {
  [propsName: string]: any;
}

type stateType = {
  list: any;
  screen3_swiper_index: number;
};

interface Module {}

const win: any = window;

const Swiper = win.Swiper as any;

let initModule = false;

@inject("store") // 将store注入到当前组件中
@observer // 将该组件
class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {};

  state: stateType = {
    list: [],
    screen3_swiper_index: 0,
  };

  mySwiper: any;

  UNSAFE_componentWillMount() {}

  initApi = () => {
    if (!initModule) {
      initModule = true;
      getImageList().then((res) => {
        this.setState(
          {
            list: res.data,
          },
          () => {
            this.initSwiper();
          },
        );
      });
    }
  };

  componentDidMount() {}

  initSwiper = () => {
    const _this = this;
    _this.mySwiper = new Swiper(".screen3-swiper", {
      autoplay: {
        delay: 5000,
      },
      on: {
        slideChangeTransitionStart() {
          const $this: any = this;
          _this.setState({
            screen3_swiper_index: $this.activeIndex,
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
    const { list, screen3_swiper_index } = this.state;
    const { activeIndex } = this.props.store.indexStore;
    if (activeIndex === 2) {
      this.initApi();
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.fontBox}>
          <div className={styles.h2}>可能是聚集</div>
          <div className={styles.h1}>最多摄影达人</div>
          <div className={styles.h2}>的潮玩图片社区</div>
        </div>

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
                      swiperIndex={screen3_swiper_index}
                      moduleIndex={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="screen3-pagination"></div>
      </div>
    );
  }
}
export default Module;
