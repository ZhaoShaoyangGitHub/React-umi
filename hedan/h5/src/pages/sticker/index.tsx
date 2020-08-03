import React from "react";
import DownloadAPP from "@/components/DownloadApp";
import OpenApp from "@/components/OpenApp";
import {getList} from "./api";
import styles from "./index.module.scss";

interface ComponentsProps extends props {
  [propsName: string]: any;
}

type StateType = {
  stickerList: Array<any>;
};

interface Sticker {
  props: ComponentsProps;
  state: StateType;
}

class Sticker extends React.Component<ComponentsProps> {
  state: StateType = {
    stickerList: [],
  };

  UNSAFE_componentWillMount() {
    this.initData();
  }

  initData = () => {
    this.getStickerList();
  };

  getStickerList = () => {
    getList({}).then((res) => {
      if (res.data && res.data.length) {
        this.setState({
          stickerList: res.data,
        });
      }
    });
  };

  goDetailPage = (stickerId: number) => {
    this.props.history.push(`/sticker_detail?stickerId=${stickerId}`);
  };

  render() {
    const {stickerList} = this.state;
    return (
      <div className={styles.stickerWrapper}>
        <DownloadAPP />
        <div className={styles.stickerMain}>
          {stickerList.length && (
            <div className={styles.classificationList}>
              {stickerList.map((items) => {
                return (
                  <div className={styles.classificationListItem} key={items.id}>
                    <div className={styles.listTitle}>{items.title}</div>
                    {items.stickerList && items.stickerList.length && (
                      <div className={styles.stickerList}>
                        {items.stickerList.map((sticker: any) => {
                          return (
                            <div
                              className={styles.stickerListItem}
                              key={sticker.stickerId}
                              style={{backgroundColor: sticker.backgroundColor}}
                              onClick={() => {
                                this.goDetailPage(sticker.stickerId);
                              }}
                            >
                              <div className={styles.stickerListImg}>
                                <img src={sticker.thumb} width="100%" alt="" />
                              </div>
                              <div className={styles.stickerListMain}>
                                <div className={styles.stickerTitle}>
                                  {sticker.title}
                                  {sticker.isNew && (
                                    <span className={styles.newTag}>NEW</span>
                                  )}
                                </div>
                                {stickerDesc(sticker)}
                              </div>
                              <div className={styles.moreIcon}>
                                <img
                                  src={
                                    require("./img/chevron-right-small.png")
                                      .default
                                  }
                                  alt=""
                                  width="100%"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <OpenApp className={styles.openApp}>
            <span>打开APP一起来玩玩具贴纸吧~</span>
          </OpenApp>
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
  }
}

export default Sticker;
