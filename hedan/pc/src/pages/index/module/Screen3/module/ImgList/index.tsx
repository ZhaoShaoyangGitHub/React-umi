import React, { Component } from "react";
import styles from "./index.module.scss";
import AuthIcon from "@/components/AuthIcon";
import { gzipImg } from "@/utils/utils";
//组件的类型声明规范
interface moduleProps {
  data: any;
  swiperIndex: number;
  moduleIndex: number;
}

interface ImgList {}
const win: any = window;

class ImgList extends React.Component<moduleProps> {
  componentDidMount() {
    this.loadImg();
  }

  loadImg = () => {
    const { swiperIndex } = this.props;
    const elm: any = win.document.getElementById(
      `index-screen3-${swiperIndex}`,
    );
    if (elm) {
      const boxElms = elm.getElementsByClassName("screen3-img-item");
      if (boxElms.length > 0) {
        for (let i = 0; i < boxElms.length; i++) {
          const el = boxElms[i];
          const imgUrl = el.getAttribute("data-img");
          if (imgUrl) {
            el.style.backgroundImage = `url(${imgUrl})`;
          }
          el.setAttribute("data-img", "");
        }
      }
    }
  };

  render() {
    const { data, swiperIndex, moduleIndex } = this.props;
    const list = data;

    if (swiperIndex - moduleIndex === 0) {
      this.loadImg();
    }

    return (
      <div className={styles.wrapper} id={`index-screen3-${moduleIndex}`}>
        {list.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={`screen3-img-item ${styles.item} ${
                styles[`item_${index}`]
              }`}
              data-img={gzipImg(item.image, 300)}
            >
              <div className={styles.userBox}>
                <div className={styles.userInfo}>
                  <img
                    className={styles.userIcon}
                    src={gzipImg(item.avatar, 20)}
                    alt=""
                  />
                  <span className={styles.userName}>
                    Photo by {item.nickname}
                  </span>
                  <AuthIcon className={styles.dan} data={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default ImgList;
