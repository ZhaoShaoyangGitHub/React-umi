import React from "react";
import styles from "./index.module.scss";

import { sellType } from "@/assets/filter/filter";
import { getInfoList } from "@/pages/index/api.ts";

import { gzipImg } from "@/utils/utils";

interface moduleProps {
  [propsName: string]: any;
}

type StateType = {
  list: any[];
  itemList: any[];
  selectId: string;
};

interface Module {}

class Module extends React.Component<moduleProps> {
  state: StateType = {
    list: [],
    selectId: "",
    itemList: [],
  };

  timer: any;

  componentDidMount() {
    getInfoList().then((res) => {
      const list = res.data;
      this.setState(
        {
          list,
        },
        () => {
          this.selectItem(list[1]);
        },
      );
    });
  }

  UNSAFE_componentWillMount() {}

  selectItem = (item: any) => {
    const itemList = item.items;
    this.setState({
      selectId: item.toyId,
      itemList,
    });
  };

  linkTo = (item: any) => {
    if (item.link) {
      window.open(item.link);
    } else if (item.shortLink) {
      window.open(item.shortLink);
    }
  };

  render() {
    const { list, itemList, selectId } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <div className={styles.title}>
            <div className={styles.label}>01</div>
            <div className={styles.value}>
              选择你要捕捉的玩具系列，盒DAN机器人会自动为你捕捉TA的各种讯息哦，用下面几款玩具试试看？
            </div>
          </div>
          {/*  */}
          <div className={styles.selectBox}>
            {/* for  */}
            {list.map((item, index) => {
              return (
                <div
                  className={styles.selectItem}
                  key={item.toyId}
                  onClick={() => {
                    this.selectItem(item);
                  }}
                >
                  <div
                    className={styles.screen}
                    style={{
                      backgroundImage: `url(${gzipImg(item.thumb, 150)})`,
                    }}
                  >
                    <div className={styles.status}>
                      {item.toyId === selectId ? (
                        <img src={require("./img/on.png").default} alt="" />
                      ) : (
                        <img src={require("./img/off.png").default} alt="" />
                      )}
                    </div>
                  </div>
                  <div className={styles.str}>{item.title}</div>
                </div>
              );
            })}
            {/* for -end  */}
          </div>
        </div>
        {/*  */}
        <div className={styles.rightBox}>
          <div className={styles.listBox}>
            {itemList.map((item, index) => {
              return (
                <div
                  className={styles.item}
                  key={index}
                  onClick={() => {
                    return this.linkTo(item);
                  }}
                >
                  <div
                    className={styles.cover}
                    style={{
                      backgroundImage: `url(${gzipImg(item.thumb, 400)})`,
                    }}
                  >
                    <div className={styles.typeLabel}>
                      {item.isNew ? (
                        <div className={styles.newIcon}>New</div>
                      ) : (
                        ""
                      )}
                      {item.sellType > -1 ? (
                        <div className={styles.limticon}>
                          {sellType(item.sellType)}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.strBox}>
                    <div className={styles.des}>{item.description}</div>
                    <div className={styles.link}>
                      来源{item.source}
                      {item.shortLink ? (
                        <img
                          className={styles.linkicon}
                          src={require("./img/linkicon.png").default}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      {item.shortLink}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Module;
