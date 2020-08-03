import React from "react";
import {withRouter} from "react-router-dom";

import styles from "./index.module.scss";
import FontChart from "../../../module/FontChart";

import Card from "../../../module/Card";

import {getList, getOtherActive, getList_end} from "../../../guardians/api";

import Item from "../../../module/Item";

import {getPrizeList} from "./api";
import {ACTIVITYCODELIST} from "../../../active_config";
import {getUrlParam} from "@/utils/utils";

interface moduleProps {
  className?: any;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface Content {
  props: moduleProps;
  state: StateType;
}

class Content extends React.Component<any> {
  state: StateType = {
    active: {}, // 当前正在进行的活动

    active_end: [], // 已经结束的活动
    prizeList: {}, // 已经结束活动的获奖名单

    otherActive: [], // 其它的未开始的活动
  };

  componentDidMount() {
    const otherActive = getOtherActive();
    const active_end = getList_end();
    const active = getList();
    this.setState({
      active,
      active_end,
      otherActive,
    });
    this.initApi();
  }

  initApi = () => {
    this.getPrizeList();
  };

  getPrizeList = () => {
    const _this = this;
    ACTIVITYCODELIST.forEach((item) => {
      getPrizeList({
        activityCode: item,
      }).then((res: any) => {
        if (res.code === "OK") {
          const list = res.data;
          const {prizeList} = this.state;

          for (let i = 0; i < list.length; i++) {
            const el = list[i];
            prizeList[`id_${el.frontId}`] = el;
          }
          _this.setState({
            prizeList,
          });
        }
      });
    });
  };

  render() {
    const {className} = this.props;

    const {active, otherActive, active_end, prizeList} = this.state;

    return (
      <div className={`${styles.wrapper} ${className}`} id="guardians-content">
        <div className={styles.contnetBox}>
          <div className={styles.titleBox}>
            <div className={styles.line}></div>
            <div className={styles.endTitle}>活动日程表</div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.title}>
            盒DAN联合众多玩具品牌为大家献上开站福利~ 从3.14日开站日起，
            <span> 每月都有玩具品牌为大家献礼哦~</span>
            让我们一起来看看对应的日程表安排吧！
          </div>
          {/* 第一栏活动 */}
          {active && active.list && (
            <div>
              <FontChart
                className={styles.chart}
                str={active.date}
                type={active.type}
              />
              <div className={styles.listBox}>
                {active.list.map((item: any) => {
                  return (
                    <Card
                      key={item.id}
                      className={styles.item}
                      detail={item}
                      gotoDraw={this.props.goToDraw}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className={styles.line}></div>
          <div className={styles.draft}>
            <img
              className={styles.draftIcon}
              src={require("./img/drafts.svg").default}
              alt=""
            />
            <b>戳对应的玩具品牌可以查具体活动说明哦</b>
          </div>
          <div className={styles.line}></div>
          {/* 第一栏活动 -- end */}

          {/* 第二栏活动 */}
          {otherActive.map((item: any) => {
            return (
              <div key={item.date}>
                <FontChart
                  className={styles.chart}
                  str={item.date}
                  type={item.type}
                />
                <div className={styles.listBox}>
                  {item.list.map((item: any, index: number) => {
                    return (
                      <Card key={index} className={styles.item} detail={item} />
                    );
                  })}
                </div>
                <div className={styles.line}></div>
              </div>
            );
          })}

          {/* 第二栏活动 -- end */}

          {/* 结束的活动 */}
          {active_end.map((active: any) => {
            return (
              <div key={active.date}>
                <FontChart
                  className={styles.chart}
                  str={active.date}
                  type={active.type}
                />
                <div className={styles.listBox}>
                  {active.list.map((item: any, index: number) => {
                    const prize = prizeList[`id_${item.id}`];
                    if (prize) {
                      const detail = {
                        logo: item.logo,
                        desc: `${item.prize}获奖名单`,
                        momentList: prize.items,
                      };

                      return <Item key={index} detail={detail} />;
                    } else {
                      return "";
                    }
                  })}
                </div>
              </div>
            );
          })}
          {/* 结束的活动 -- end */}

          <div className={styles.endTitle}>DAN酱有话说</div>
          <div className={styles.line}></div>
          <div className={styles.speech}>
            盒DAN作为全新的潮玩社区，还是一颗非常幼小的DAN。在DAN酱刚刚孵化出来的时候就有这么多的玩具品牌愿意信任我们，并支持参与我们发起的「玩具守护者」，我们非常感激。
            我们希望，盒DAN能成为爱买玩具的大小孩们的乌托邦，在这个乌托邦内，
            <b>希望你能发现乐趣，分享快乐。</b>
          </div>
          <div className={styles.draft}>
            <b>盒DAN孵蛋委员会</b>
          </div>
        </div>
        <img
          className={styles.bgImg}
          src={require("./img/bottombg.png").default}
          alt=""
        />
      </div>
    );
  }
}

export default withRouter(Content);
