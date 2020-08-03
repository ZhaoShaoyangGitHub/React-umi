import React from "react";
import styles from "./index.module.scss";
import Header from "@/components/ActivityHeader";
import FontChart from "../module/FontChart";
import {getUrlParam} from "@/utils/utils";
import {getDetail, getList} from "../guardians/api";
import ActiveCard from "../module/Card";
import ModalBox from "@/components/ModalBox";
import ProgressMod from "../progress_check/module/ProgressMod";

import {ACTIVITYCODE} from "../active_config";
import {activityInfo} from "../draw/api";
import LoadingPage from "@/components/LoadingPage";

import {
  getUserInfo,
  getProgressList,
  getProgressDetail,
} from "../progress_check/api";
import {
  progressNode,
  progressFilter,
  countProgress,
} from "../progress_check/filter";

type StateType = {
  [propsName: string]: any;
};

const win: any = window;
const browserType = win.markComm.browserType();
const isHedanApp = browserType.isHedanApp;

const {test} = getUrlParam();
let {token} = getUrlParam();
if (!browserType.isHedanApp) {
  token = "";
}

class Page extends React.Component<any> {
  state: StateType = {
    isMobile: true,
    date: "",
    type: 0,
    detail: {},
    active: {},
    id: 0,
    moduleStatus: false,
    statusObj: {},
    userInfo: {},
    statrTime: "",
    isStart: false,

    loding: true,
  };

  componentDidMount() {
    this.props.history.listen(() => {
      const rootPage: any = document.getElementById("root");
      //当路由切换时
      rootPage.scrollTo(0, 0);
    });
    this.initApi();

    const browserType = win.markComm.browserType();
    this.setState({
      isMobile: browserType.isMobile,
    });
  }

  UNSAFE_componentWillReceiveProps() {
    const {id} = getUrlParam();
    this.initApi();
  }

  initApi = () => {
    const {id} = getUrlParam();
    const data = getDetail(Number(id));
    const active = getList();
    const {date, type, detail} = data;
    if (token) {
      getUserInfo().then((res: any) => {
        this.setState(
          {
            userInfo: res.data,
          },
          () => {
            this.getProgressDetail(String(id));
          },
        );
      });
    }

    this.setState({
      date,
      type,
      detail,
      active,
      id,
      loding: false,
    });

    activityInfo({
      activityCode: ACTIVITYCODE,
    }).then((res) => {
      this.setState(
        {
          statrTime: res.data.drawStartTime,
        },
        () => {
          this.timeDown();
        },
      );
    });
  };

  timer: any = null;

  timeDown = () => {
    const {statrTime} = this.state;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const nowTime = new Date().getTime();
      let value = statrTime - nowTime;
      if (test) {
        //假装活动没开始
        value = 99866;
      }
      if (value < 0) {
        // 活动已经开始
        clearInterval(this.timer);
        this.setState({
          isStart: true,
        });
      } else {
        //活动没有开始
        this.setState({
          isStart: false,
        });
      }
    }, 1000);
  };

  getProgressDetail = (id: string) => {
    const {userInfo} = this.state;
    if (userInfo.nickname) {
      getProgressDetail(id).then((res: any) => {
        if (res.code === "OK") {
          this.setState({
            statusObj: res.data,
          });
        }
      });
    }
  };

  linkBack = () => {
    const {id} = getUrlParam();
    this.props.history.push(`/activity/guardians?token=${token}`);
  };

  closeModule = (param: boolean) => {
    this.setState({
      moduleStatus: !param,
    });
  };

  gotToDrawList = () => {
    this.props.history.push(`/activity/progress_check?token=${token || ""}`);
  };

  render() {
    const {
      isMobile,
      date,
      type,
      detail,
      active,
      id,
      moduleStatus,
      statusObj,
      userInfo,
      isStart,
      loding,
    } = this.state;
    document.title = `${detail.documentTitle}`;

    const textParam = {
      item: detail,
      status: statusObj,
    };

    return (
      <div className={styles.wrapper}>
        <LoadingPage status={loding} />

        <div
          className={styles.wrapperMask}
          style={{
            backgroundImage: `url(${detail.bg})`,
          }}
        ></div>
        {!isHedanApp && <Header className={styles.header} color="black" />}
        <div className={`${styles.wrapperBox} ${isMobile && styles.mobile}`}>
          {!isHedanApp && <div className={`${styles.line}`}></div>}
          <div className={styles.contentBox}>
            <FontChart
              className={styles.chartTitle}
              str={date}
              type={type}
              color="white"
            />
            <div className={styles.titleStr}>守护助力品牌 {detail.title}</div>
            <div className={styles.title_desc}>
              完成以下四项助力任务，就能解锁{" "}
              <b>
                {detail.title} {detail.award}
              </b>
            </div>
          </div>
          {cardBox()}
          <div className={`${styles.explain} ${styles.cardBoxBStr}`}>
            *将于8月5日10点0分01秒在该页面开启奖池，23点59分59秒关闭奖池*
          </div>
          <div className={`${styles.cardBoxBStr} ${styles.cardBoxMargin} `}>
            获得抽奖权的小伙伴务必记得5日当天来此页面抽奖哦，过时作废哦●﹏●
          </div>
          {detail.id !== 13 && detail.contter_cont && (
            <div className={styles.contImg}>
              <img src={detail.contter_cont} alt="" />
            </div>
          )}

          <div className={styles.cardBoxBStr2}>
            没有中奖的小伙伴不要难过，DAN酱会送上一份特殊礼包——
            <b>塑料透明TPU娃包与{detail.title}吧唧组合套装</b>
            ，以感谢你在活动期间对{detail.title}与盒DAN做出的贡献。
          </div>

          <img className={styles.logo_x} src={detail.logo_x} alt="" />
          <div className={styles.ruleStr}>
            活动申明：
            <br />
            1.为了活动的公平公正，不允许反复发布同一张玩具图片进行奖励解锁，管理员在审核中会将此类动态做审核不通过处理，不通过的动态只有发布人本人可见。多次使用同一张玩具图片将会被取消抽奖资格并永久禁言处理
            <br />
            2.动态中发布的照片须为发布人拍摄，请勿使用官方图片或其他人拍摄的照片（不论是否进行二次处理），一经发现会做审核不通过处理；发现两次将会被取消抽奖资格并禁言处理
            <br />
            3.动态中发布的图片需要与话题符合，图片中须包含相应品牌旗下的玩具。如图片中仅包含与话题无关的玩具，管理员会做审核不通过处理
            <br />
            4.玩具守护者为返图活动，如果玩家希望发布自己的玩具手绘、黏土等作品进行奖励解锁，为了感谢您的爱与支持，不包含玩具主体的手绘、黏土等手工作品可算作有效动态，但有效天数至多计为2天，多于2天时不能计为有效动态。因此建议想发布手作作品解锁的小伙伴在拍摄时带上玩具主体
            <br />
            5.根据盒DAN的社区规则，如果在动态图片中发现非正版玩具，无论该非正版玩具是主体还是背景，该条动态都会做审核不通过处理；发现两次将会被取消抽奖资格并禁言处理
          </div>
          <div className={styles.declare}>*本活动最终解释权归盒DAN所有*</div>
          <div className={`${styles.line}`}></div>
          {active && active.list && (
            <div className={styles.activeBox}>
              <FontChart
                className={styles.chart}
                str={active.date}
                type={0}
                size="small"
                color="white"
              />
              <div className={styles.activeAxplain}>
                {active.list.length > 1 && (
                  <b>同期还有这些玩具品牌也在进行活动哦~</b>
                )}
              </div>
              <div className={styles.listBox}>
                {active.list.map((item: any) => {
                  if (item.id - id === 0) {
                    return "";
                  } else {
                    return (
                      <ActiveCard
                        color="black"
                        key={item.id}
                        className={styles.item}
                        detail={item}
                      />
                    );
                  }
                })}
                <div
                  className={`${styles.item} ${styles.backBtn}`}
                  onClick={this.linkBack}
                >
                  <img
                    className={styles.backStr}
                    src={require("./img/back_str.svg").default}
                    alt=""
                  />
                  <img
                    className={styles.backBtnBG}
                    src={require("./img/back_btn_bg.svg").default}
                    alt=""
                  />
                  <img
                    className={`${styles.danFly} ${styles.jump_5}`}
                    src={require("../guardians/img/dan_fly.png").default}
                    alt=""
                  />
                  <img
                    className={`${styles.cloud_1}`}
                    src={require("../guardians/img/cloud_1.svg").default}
                    alt=""
                  />
                  <img
                    className={`${styles.cloud_2}`}
                    src={require("../guardians/img/cloud_2.svg").default}
                    alt=""
                  />
                  <img
                    className={`${styles.cloud_3}`}
                    src={require("../guardians/img/cloud_3.svg").default}
                    alt=""
                  />
                  <img
                    className={`${styles.cloud_4}`}
                    src={require("../guardians/img/cloud_4.svg").default}
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {statusObj.frontId && (
          <div className={styles.fixedBtnBox}>
            <div
              className={styles.checkProg}
              onClick={() => {
                this.setState({
                  moduleStatus: true,
                });
              }}
            >
              看看我的任务进度
            </div>
          </div>
        )}

        {statusObj.frontId && (
          <ModalBox
            modelStatus={moduleStatus}
            closeStatus={true}
            onClose={this.closeModule}
            backBtn={false}
          >
            <div className={styles.model_content}>
              <div className={styles.titleBox}>
                <div>{userInfo.nickname}</div>
                <div>守护助力品牌 {detail.title}</div>
                <div>的任务进度： </div>
              </div>
              <div className={styles.modalTxt}>
                {isStart ? Start_text(textParam) : NotStart_text(textParam)}
              </div>

              {!isStart && (
                <ProgressMod
                  className={styles.ProgressMod}
                  dynamic={statusObj.momentDays}
                  share={statusObj.shareCount}
                />
              )}
              <div className={styles.checkProg} onClick={this.gotToDrawList}>
                看看全部活动任务进度
              </div>
            </div>
          </ModalBox>
        )}
      </div>
    );

    function Card(param: any) {
      const {className, title, cont, bg} = param;
      return (
        <div className={className}>
          <img className={styles.bgImg} src={bg} alt="" />
          <div className={styles.card_cont}>
            <b className={styles.card_title}>{title}</b>
            <div className={styles.card_cont_des}>{cont}</div>
          </div>
        </div>
      );
    }

    function cardBox() {
      return (
        <div className={styles.cardBox}>
          {Card({
            className: styles.cardLeft,
            bg: require("./img/card_l1.svg").default,
            title: "任务一",
            cont: `添加${detail.title}品牌下的${detail.reName}至盒DAN玩具柜（玩具柜在“我”频道页面）`,
          })}

          {Card({
            className: styles.cardLeft,
            bg: require("./img/card_r1.svg").default,
            title: "解锁奖励",
            cont: (
              <>
                <div>{`${detail.reName}守护者限定盒DAN虚拟徽章`}</div>
                <img className={styles.badge_r1} src={detail.badge} alt="" />
              </>
            ),
          })}

          {Card({
            className: styles.cardLeft,
            bg: require("./img/card_l1.svg").default,
            title: "任务二",
            cont: (
              <>
                {`首次发布${detail.title + detail.reName}的玩具图片动态，带上`}
                <b className={styles.blue}>{`#${detail.title} #玩具守护者 `}</b>
                话题，
                <b>{"并分享"}</b>
              </>
            ),
          })}

          {Card({
            className: styles.cardR2Box,
            bg: require("./img/card_r2.svg").default,
            title: "解锁奖励",
            cont: (
              <>
                <div>{`${detail.reName}守护者限定盒DAN应用图标`}</div>
                <img className={styles.badge_r2} src={detail.icon} alt="" />
              </>
            ),
          })}

          {Card({
            className: styles.cardLeft3,
            bg: require("./img/card_l1.svg").default,
            title: "任务三",
            cont: (
              <>
                <b>{`累计${progressNode().dynamic_2}天`}</b>
                {`发布带正确话题的${
                  detail.title + detail.reName
                }玩具图片动态，`}
                <b>{`并分享 ≥ 其中任意${progressNode().share_2}条动态`}</b>
              </>
            ),
          })}

          {Card({
            className: styles.cardR3Box,
            bg: require("./img/card_r3.svg").default,
            title: "解锁奖励",
            cont: (
              <div className={styles.cardStrBox}>
                <div>{`${detail.reName}守护者限定盒DAN玩具柜皮肤`}</div>
                <img className={styles.badge_r3} src={detail.phone} alt="" />
              </div>
            ),
          })}

          {Card({
            className: styles.cardLeft,
            bg: require("./img/card_l1.svg").default,
            title: "终极任务",
            cont: (
              <>
                <b>{`累计${progressNode().dynamic_3}天`}</b>
                {`发布带正确话题的${
                  detail.title + detail.reName
                }玩具图片动态，`}
                <b>{`并分享 ≥ 其中任意${progressNode().share_3}条动态`}</b>
                <div className={styles.explain}>
                  {"*累计任务将8月4日23点59分59秒结束统计*"}
                </div>
              </>
            ),
          })}

          {Card({
            className: styles.cardR4Box,
            bg: require("./img/card_r4.svg").default,
            title: "解锁奖励",
            cont: (
              <div
                className={styles.cardStrBox}
                style={
                  detail.longBox && {
                    width: `${140 / 100}rem`,
                  }
                }
              >
                {`${detail.title}的${detail.award}`}
                <div>售价580元（顺丰陆运保价到付）</div>
                <img
                  className={styles.badge_r4}
                  src={require("./img/arrow.png").default}
                  alt=""
                />
              </div>
            ),
          })}
        </div>
      );
    }
  }
}
export default Page;

/*
剥离组件，将开始和未开始进行分离  Start 、 NotStart

将模块进行剥离： 文字描述部分 text  ， 进度条部分  Prog ， 按钮部分

命名方式： 开始 + _ + 模块名

*/

// 解锁了抽奖资格
function text_unlock({item}: any) {
  return (
    <div className={styles.carry}>
      <span className={styles.yellow}>
        恭喜你！成功解锁了{" "}
        <b>
          {item.title}
          {item.award}
        </b>
      </span>
      <br />
      务必记得5日当天来抽奖哦，过时作废哦●﹏●
    </div>
  );
}

function NotStart_text({item, status}: any) {
  /*
    未开始的文案部分：再发布几天动态就xxxx  ||  恭喜解锁抽奖
  */

  const {shareNum, dynamicNum, type} = countProgress(
    status.momentDays,
    status.shareCount,
  );
  if (type === 3) {
    return text_unlock({item});
  } else {
    return (
      <div className={styles.underway}>
        {Boolean(status.momentDays > 0 || status.shareCount > 0) && "再"}
        <span className={styles.yellow}>
          <b>
            {dynamicNum > 0 ? `发布 ${dynamicNum} 天动态` : ""}
            {Boolean(dynamicNum > 0 && shareNum > 0) ? "，" : ""}
            {shareNum > 0 ? `分享 ${shareNum} 次动态` : ""}
          </b>
        </span>
        <br />
        就能解锁{" "}
        <b>
          {item.title}
          {type === 2 && item.award}
          {type !== 2 && progressFilter(type)}
        </b>
      </div>
    );
  }
}

function Start_text({item, status}: any) {
  /*
  已经开始的文案部分： 恭喜你解锁抽奖权力 || 你没获得抽奖资格
  */
  if (status.qualifyType - 1 === 0 || status.qualifyType - 4 === 0) {
    return text_unlock({item});
  } else {
    return (
      <div className={styles.notBlock}>
        非常可惜，你在活动期间的累计发布天数为{" "}
        <span className={styles.blue}>{status.momentDays}</span> 天，分享了{" "}
        <span className={styles.blue}>{status.shareCount}</span>{" "}
        次，没有完成终极任务
      </div>
    );
  }
}
