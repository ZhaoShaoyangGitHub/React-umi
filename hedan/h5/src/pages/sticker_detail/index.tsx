import React from "react";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import {getUrlParam} from "@/utils/utils";
import {getDetail} from "./api";
import styles from "./index.module.scss";

interface ComponentsProps extends props {
  [propsName: string]: any;
}

type StateType = {
  stickerId: string;
  stickerInfo: any;
  isReward: boolean;
};

interface Sticker {
  props: ComponentsProps;
  state: StateType;
}

class StickerDetail extends React.Component<ComponentsProps> {
  state: StateType = {
    stickerId: "",
    stickerInfo: {},
    isReward: false, //是否开启赞赏功能
  };

  UNSAFE_componentWillMount() {
    const {stickerId} = getUrlParam();
    if (stickerId) {
      this.setState(
        {
          stickerId,
        },
        () => {
          this.initData();
        },
      );
    }
  }

  initData = () => {
    this.getStickerDetail();
  };

  getStickerDetail = () => {
    getDetail({
      stickerId: this.state.stickerId,
    }).then((res) => {
      if (res.data) {
        this.setState({
          stickerInfo: res.data,
        });
        document.title = `${res.data.title} - 盒DAN`;
      }
    });
  };

  render() {
    const {stickerInfo, isReward} = this.state;
    return (
      <div className={styles.stickerWrapper}>
        <DownloadAPP />
        <div className={styles.stickerMain}>
          <div
            className={styles.stickerTop}
            style={{backgroundColor: stickerInfo.backgroundColor}}
          >
            <div>
              <div className={styles.stickerTitle}>{stickerInfo.title}</div>
              {stickerDesc(stickerInfo)}
            </div>
            <div className={styles.stickerListImg}>
              <img src={stickerInfo.thumb} width="100%" alt="" />
            </div>
          </div>
          <div
            className={`${styles.stickerContent} ${
              isReward && styles.paddingBottom
            }`}
          >
            {stickerInfo.itemList &&
              stickerInfo.itemList.length &&
              stickerImgList(stickerInfo.itemList)}
            {stickerBottom(stickerInfo, isReward)}
          </div>
        </div>
      </div>
    );

    function stickerDesc(stickerInfo: any) {
      return (
        <div className={styles.stickerDesc}>
          {stickerInfo.type === 1 && <span className={styles.free}>免费</span>}
          {stickerInfo.type === 2 && (
            <div className={styles.discount}>
              <span className={styles.price}>
                {stickerInfo.price}
                {(stickerInfo.isDiscountTimeLimit ||
                  stickerInfo.isDiscount) && (
                  <span className={styles.delete}></span>
                )}
              </span>
              {stickerInfo.isDiscountTimeLimit && (
                <span>限时{stickerInfo.discount}</span>
              )}
              {stickerInfo.isDiscount && <span>{stickerInfo.discount}</span>}
            </div>
          )}
          {stickerInfo.type === 3 && (
            <span className={styles.unlock}>需解锁</span>
          )}
          {stickerInfo.type === 4 && (
            <span className={styles.unlock}>需兑换码</span>
          )}
        </div>
      );
    }

    function stickerImgList(itemList: any) {
      return (
        <div className={styles.stickerImgList}>
          {itemList.map((item: any) => {
            return (
              <div className={styles.imgItem} key={item.itemId}>
                <img src={item.image} width="100%" alt="" />
              </div>
            );
          })}
        </div>
      );
    }

    function stickerBottom(stickerInfo: any, isReward: boolean) {
      return (
        <div
          className={styles.stickerBottom}
          style={{backgroundColor: stickerInfo.backgroundColor}}
        >
          <div className={styles.appreciate}>
            <div className={styles.txt}>
              <div className={styles.copyright}>贴纸版权归 ©盒DAN 所有</div>
              {isReward && (
                <div className={styles.text}>
                  <span className={styles.amount}>3</span>
                  位孵DAN员赞赏了这套贴纸
                </div>
              )}
            </div>
            {isReward && <div className={styles.appreciateBtn}>赞赏</div>}
          </div>
          <OpenApp className={styles.openApp}>
            <span>打开APP使用这款贴纸吧~</span>
          </OpenApp>
        </div>
      );
    }
  }
}

export default StickerDetail;
