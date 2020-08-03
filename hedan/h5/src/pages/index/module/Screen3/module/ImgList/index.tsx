import React from "react";
import styles from "./index.module.scss";
import Avatar from "@/components/Avatar";
import { pureData, gzipImg } from "@/utils/utils";

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
    if (swiperIndex - moduleIndex === 0) {
      this.loadImg();
    }

    const list = pureData(data);

    list[0].nickname = `Photo by ${list[0].nickname}`;

    return (
      <div className={styles.wrapper} id={`index-screen3-${moduleIndex}`}>
        {list.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className={`screen3-img-item ${styles.item} ${
                styles[`item_${index}`]
              }`}
              data-img={gzipImg(item.image, 200)}
            >
              <div className={styles.userBox}>
                <div className={styles.userInfo}>
                  <Avatar className={styles.userIcon} url={item.avatar} />
                  <span>{item.nickname}</span>
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
