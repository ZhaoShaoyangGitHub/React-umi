import React from "react";
import styles from "./index.module.scss";

import { gzipImg } from "@/utils/utils";

import { sellType } from "@/assets/filter/filter";

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

  UNSAFE_componentWillMount() {
    const { list } = this.props;
    this.setState(
      {
        list,
      },
      () => {
        this.selectItem(list[1]);
      },
    );
  }

  selectItem = (item: any) => {
    if (item && item.toyId) {
      this.setState({
        selectId: item.toyId,
        itemList: item.items,
      });
    }
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
        {/*  */}
        <div className={styles.title}>
          <div className={styles.label}>
            <img src={require("./img/title_01.svg").default} alt="" />
          </div>
          <div className={styles.value}>
            选择你要捕捉的玩具系列，盒DAN机器人会自动为你捕捉TA的各种信息哦~
          </div>
        </div>
        {/*  */}
        <div className={styles.hint}>用下面几款玩具试试看？</div>
        <div className={styles.asyncData}>
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
                      backgroundImage: `url(${gzipImg(item.thumb, 104)})`,
                    }}
                  >
                    <div className={styles.status}>
                      {item.toyId === selectId ? (
                        <img src={require("./img/on.svg").default} alt="" />
                      ) : (
                        <img src={require("./img/off.svg").default} alt="" />
                      )}
                    </div>
                  </div>
                  <div className={styles.str}>{item.title}</div>
                </div>
              );
            })}
            {/* for -end  */}
          </div>
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
                      backgroundImage: `url(${gzipImg(item.thumb, 100)})`,
                    }}
                  >
                    <div className={styles.typeLabel}>
                      {item.isNew && <div className={styles.newIcon}>New</div>}
                      {item.sellType > -1 && (
                        <div className={styles.limticon}>{sellType(item)}</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.strBox}>
                    <div className={styles.des}>{item.description}</div>
                    <div className={styles.link}>
                      来源{item.source}
                      {item.shortLink && (
                        <img
                          className={styles.linkicon}
                          src={require("@/assets/image/linkicon.svg").default}
                          alt=""
                        />
                      )}
                      {item.shortLink}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className={styles.bottom}>
          <div className={styles.bar}>
            <img
              className={styles.more}
              src={require("./img/more.svg").default}
              alt=""
            />
            <div className={styles.str}>
              盒DAN机器人还能为你捕捉各大潮玩展会讯息、或是你心理价位内的二手玩具……
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Module;
