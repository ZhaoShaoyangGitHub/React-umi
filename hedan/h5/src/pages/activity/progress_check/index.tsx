import React from "react";
import styles from "./index.module.scss";
import Header from "@/components/ActivityHeader";
import FontChart from "../module/FontChart";
import {
  getUserInfo,
  getProgressList,
  getProgressList_end,
  getProgressDetail,
} from "./api";
import {ACTIVITYCODE} from "../active_config";
import {activityInfo} from "../draw/api";
import {Toast} from "antd-mobile";
import {getUrlParam, diffDays} from "@/utils/utils";
import {getList, getOtherActive, getList_end} from "../guardians/api";
import ProgressMod from "./module/ProgressMod";
import {progressNode, progressFilter, countProgress} from "./filter";
import ModalBox from "@/components/ModalBox";
import ReceiveInfo from "../module/ReceiveInfo";
import LoadingPage from "@/components/LoadingPage";
import Loading from "@/components/Loading";

type StateType = {
  [propsName: string]: any;
};

const win: any = window;
const browserType = win.markComm.browserType();
const isHedanApp = browserType.isHedanApp;

const {test} = getUrlParam();
let {token} = getUrlParam();

if (test) {
  browserType.isHedanApp = true;
}
if (!browserType.isHedanApp) {
  token = "";
}

/*
  进行中： 进度状态

  开始抽奖之后： 展示抽奖权力

  抽奖结束： 抽奖结果展示，完成状态展示


*/

class Page extends React.Component<any> {
  state: StateType = {
    isMobile: browserType.isMobile,
    userInfo: {},
    active: {},

    statusList: {},

    statrTime: "",
    isStart: false,
    startTxt: "",

    loding: true,

    not_start_active: [],

    active_end: [],
    statusList_end: {},

    addresseeModalStatus: false, // 收件人弹窗状态
    isShowReceiveInfo: false, //是否有用户的信息
    isReceiveModalStatus: false, //是否显示退出填写提示弹窗
    receiveName: "", //获奖人姓名
    receivePhone: "", //获奖人电话
    receiveAddress: "", //获奖人地址
    frontId: 0, //当前品牌id
  };

  timer: any = null;

  componentDidMount() {
    this.props.history.listen(() => {
      const rootPage: any = document.getElementById("root");
      //当路由切换时
      rootPage.scrollTo(0, 0);
    });

    this.initApi();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  initApi = () => {
    getUserInfo().then((res: any) => {
      this.setState({
        userInfo: res.data,
      });
    });

    getProgressList().then((res: any) => {
      if (res.code === "OK") {
        const obj: any = {};
        for (let i = 0; i < res.data.length; i++) {
          const el = res.data[i];
          obj[`id_${el.frontId}`] = el;
        }
        const not_start_active = getOtherActive();

        const active = getList();
        const active_end = getList_end();

        this.setState({
          statusList: obj,
          active,
          not_start_active,
          active_end,
        });
      }
    });

    getProgressList_end({
      activityCode: "toy-guardian-1",
    }).then((res: any) => {
      if (res.code === "OK") {
        const {statusList_end} = this.state;
        for (let i = 0; i < res.data.length; i++) {
          const el = res.data[i];
          statusList_end[`id_${el.frontId}`] = el;
        }
        const active_end = getList_end();
        this.setState({
          statusList_end,
          active_end,
        });
      }
    });
    getProgressList_end({
      activityCode: "toy-guardian-2",
    }).then((res: any) => {
      if (res.code === "OK") {
        const {statusList_end} = this.state;
        for (let i = 0; i < res.data.length; i++) {
          const el = res.data[i];
          statusList_end[`id_${el.frontId}`] = el;
        }
        const active_end = getList_end();

        this.setState({
          statusList_end,
          active_end,
        });
      }
    });
    getProgressList_end({
      activityCode: "toy-guardian-3",
    }).then((res: any) => {
      if (res.code === "OK") {
        const active_end = getList_end();
        const {statusList_end} = this.state;
        for (let i = 0; i < res.data.length; i++) {
          const el = res.data[i];
          statusList_end[`id_${el.frontId}`] = el;
        }
        this.setState({
          statusList_end,
          active_end,
        });
      }
    });
    getProgressList_end({
      activityCode: "toy-guardian-4",
    }).then((res: any) => {
      if (res.code === "OK") {
        const active_end = getList_end();
        const {statusList_end} = this.state;
        for (let i = 0; i < res.data.length; i++) {
          const el = res.data[i];
          statusList_end[`id_${el.frontId}`] = el;
        }
        this.setState({
          statusList_end,
          active_end,
        });
      }
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

  timeDown = () => {
    const {statrTime} = this.state;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({
        loding: false,
      });
      const nowTime = new Date().getTime();
      let value = statrTime - nowTime;
      if (test) {
        //假装抽奖还未开始
        value = 123;
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
          startTxt: diffDays(value),
        });
      }
    }, 1000);
  };

  readStatus = (id: string) => {
    const {statusList} = this.state;
    return statusList[`id_${id}`];
  };

  gotoDrawPage = (item: any) => {
    this.props.history.push(
      `/activity/draw?id=${item.id}&token=${token || ""}`,
    );
  };

  inputReceive = (key: any, value: any) => {
    this.setState({
      [key]: value,
    });
  };

  submitForm = () => {
    this.initApi();
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.setState({
        addresseeModalStatus: false,
      });
    }, 1500);
  };

  isShowAddresseeModal = (status: any) => {
    if (status.receiveAddress && status.receiveName && status.receivePhone) {
      this.setState({
        isShowReceiveInfo: true,
      });
    }
    this.setState({
      receiveAddress: status.receiveAddress,
      receiveName: status.receiveName,
      receivePhone: status.receivePhone,
      addresseeModalStatus: true,
      frontId: status.frontId,
    });
  };

  isCloseAddresseeModal = (value: boolean) => {
    this.setState({
      addresseeModalStatus: !value,
    });
  };

  isCloseReceiveModal = () => {
    this.setState({
      isReceiveModalStatus: false,
    });
  };

  isShowReceiveModal = () => {
    this.setState({
      isReceiveModalStatus: true,
    });
  };

  goGuardians = (e: any) => {
    e.stopPropagation(); //阻止冒泡
    const _this = this;
    const {token} = getUrlParam();
    if (token) {
      _this.props.history.push(`/activity/guardians?token=${token || ""}`);
    }
  };

  render() {
    const {
      isMobile,
      userInfo,
      active,
      statusList,
      isStart,
      startTxt,
      loding,
      not_start_active,
      active_end,
      statusList_end,
      addresseeModalStatus,
      isShowReceiveInfo,
      isReceiveModalStatus,
      receiveName,
      receivePhone,
      receiveAddress,
      frontId,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <LoadingPage status={loding} />
        <div
          className={styles.wrapperMask}
          style={{
            backgroundImage: `url(${require("./img/bg.jpg").default})`,
          }}
        ></div>
        {!isHedanApp && <Header className={styles.header} color="black" />}
        <div className={`${styles.wrapperBox} ${isMobile && styles.mobile}`}>
          {!isHedanApp && <div className={`${styles.line}`}></div>}
          <div className={styles.contentBox}>
            <div className={styles.userHello}>
              Hello, {userInfo && userInfo.nickname}
              <br />
              你的玩具守护者任务进度：
            </div>
            <FontChart
              className={styles.chartTitle}
              str={active.date}
              type={active.type}
              color="white"
            />
          </div>
          <div className={styles.brandList}>
            <Loading status={loding} />
            {!loding &&
              active &&
              active.list &&
              active.list.map((item: any, index: number) => {
                const status = statusList[`id_${item.id}`];
                //test
                // status.momentDays = 15;
                // status.shareCount = 7;
                // test -- end

                const textParam = {
                  item,
                  status,
                };

                return (
                  <div key={index} className={styles.item}>
                    <div className={styles.title}>
                      守护助力品牌 {item.title}
                    </div>

                    {isStart ? Start_text(textParam) : NotStart_text(textParam)}

                    {!isStart && (
                      <ProgressMod
                        className={styles.ProgressMod}
                        dynamic={status.momentDays}
                        share={status.shareCount}
                      />
                    )}

                    {draw_btn({
                      ...textParam,
                      isStart,
                      func: this.gotoDrawPage,
                      startTxt,
                    })}

                    <div className={styles.listWarn}>
                      *分享到微信或QQ时，需要点击“返回盒DAN”才计为成功*
                    </div>

                    <div className={`${styles.line}`}></div>
                  </div>
                );
              })}
          </div>

          {/* 未开始的活动 */}
          {notStart(not_start_active)}

          {/* 已经结束的活动 */}
          {acyive_end_view(active_end, statusList_end, this)}

          {/* 活动申明 */}
          {bottomView()}

          {/* 返回首页 */}
          {backBtnBox(() => {
            this.props.history.push(`/activity/guardians?token=${token}`);
          })}
        </div>
        {addresseeModalStatus && AddresseeLayer(this)}
        {isReceiveModalStatus && ReceiveModal(this)}
      </div>
    );

    //未中奖信息
    function AddresseeLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={isShowReceiveInfo}
          modelStatus={addresseeModalStatus}
          backBtn={false}
          onClose={that.isCloseAddresseeModal}
        >
          <ReceiveInfo
            isShowReceiveInfo={isShowReceiveInfo}
            frontId={frontId}
            receiveName={receiveName}
            receivePhone={receivePhone}
            receiveAddress={receiveAddress}
            handleInput={that.inputReceive}
            submitForm={that.submitForm}
          />
        </ModalBox>
      );
    }

    //退出填写弹窗
    function ReceiveModal(parm: any) {
      const that = parm;
      return (
        <div className={styles.receiveModal}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>请填写礼品收取信息</div>
            <div className={styles.modalText}>
              尚未输入详细的礼品领取信息，是否要返回？（7个工作日内未填写视为逾期自动放弃领奖）
            </div>
            <div className={styles.modalFoot}>
              <div className={styles.left} onClick={that.goGuardians}>
                返回
              </div>
              <div className={styles.left} onClick={that.isCloseReceiveModal}>
                继续填写
              </div>
            </div>
          </div>
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
function text_unlock({item, status}: any, type: string) {
  let isImgShow = false;

  if (type === "NotStart_text") {
    isImgShow = true;
  }

  if (type === "Start_text") {
    if (status.qualifyType - 1 === 0 || status.qualifyType - 4 === 0) {
      isImgShow = true;
    }
  }

  if (!item.contter_cont) {
    isImgShow = false;
  }
  return (
    <div className={`${styles.carry} ${!isImgShow && styles.carryMB}`}>
      <span className={styles.yellow}>
        恭喜你！成功解锁了 <b>{item.award}</b>
      </span>
      <br />
      务必记得5日当天来抽奖哦，过时作废哦●﹏●
      {isImgShow && (
        <img className={styles.contter_cont} src={item.contter_cont} alt="" />
      )}
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
    return text_unlock({item}, "NotStart_text");
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
    return text_unlock(
      {
        item,
        status,
      },
      "Start_text",
    );
  } else {
    return resultView(status);
  }
}

function resultView(status: any, type?: string) {
  if (status.qualifyType - 2 === 0) {
    return (
      <div className={styles.notBlock}>
        非常可惜，你在活动期间的累计发布天数为{" "}
        <span className={styles.blue}>{status.momentDays}</span> 天，分享了{" "}
        <span className={styles.blue}>{status.shareCount}</span>{" "}
        次，没有完成终极任务
      </div>
    );
  } else if (status.qualifyType - 3 === 0) {
    return (
      <div className={styles.notBlock}>
        非常可惜，因为违反社区规则， 您未获得抽奖资格
      </div>
    );
  }
  if (type === "acyive_end_view") {
    if (status.qualifyType - 1 === 0) {
      return (
        <div className={styles.notBlock}>
          抽奖已经结束啦
          <br />
          小伙伴你晚来了一步●﹏●
        </div>
      );
    }
  }
}

// 按钮的逻辑

function draw_btn({item, status, isStart, func, startTxt}: any) {
  if (isStart) {
    if (status.qualifyType - 1 === 0 || status.qualifyType - 4 === 0) {
      return Start_btn(func, item);
    }
  } else {
    const {type} = countProgress(status.momentDays, status.shareCount);

    if (type === 3) {
      return notStart_btn(startTxt);
    }
  }

  return "";
}

function Start_btn(func: any, item: any) {
  return (
    <div
      className={styles.gotoDraw}
      onClick={() => {
        func(item);
      }}
    >
      立即前往抽奖
      <img
        className={styles.icon}
        src={require("../guardians/img/goto_draw.png").default}
        alt=""
      />
    </div>
  );
}

function notStart_btn(startTxt: string) {
  return (
    <div className={styles.awaitBtn}>
      距离抽选日还有&nbsp;
      <span className={styles.blue}>{startTxt}</span>
    </div>
  );
}

// 提出来的代码，简化结构
function notStart(not_start_active: Array<any>) {
  const expectList = not_start_active;
  return (
    <div className={styles.expect}>
      {expectList.map((item, index) => {
        return (
          <div key={item.date}>
            <FontChart
              className={styles.chartTitle}
              str={item.date}
              type={1}
              color="white"
            />
            <div className={styles.awaitBtn}>活动尚未开始 敬请期待……</div>
            <div className={`${styles.line}`}></div>
          </div>
        );
      })}
    </div>
  );
}

function acyive_end_view(active_end: any, statusList_end: any, self?: any) {
  return active_end.map((active: any, active_index: any) => {
    return (
      <div className={styles.acyive_end_view} key={active.date}>
        <FontChart
          className={`${styles.chartTitle} ${styles.chartTitle_end}`}
          str={active.date}
          type={active.type}
          color="white"
        />
        {active &&
          active.list &&
          active.list.map((item: any, index: number) => {
            const status = statusList_end[`id_${item.id}`];
            if (status) {
              return (
                <div key={item.id}>
                  <div className={styles.title}>守护助力品牌 {item.title}</div>
                  {resultView(status, "acyive_end_view")}
                  {status.qualifyType - 4 === 0 &&
                    prizeResult(item, status, self, active_index)}
                  {index < active.list.length - 1 && (
                    <div className={`${styles.line}`}></div>
                  )}
                </div>
              );
            } else {
              return "";
            }
          })}
      </div>
    );
  });
}

function prizeResult(item: any, status: any, self?: any, active_index?: any) {
  if (status.drawResult - 3 === 0) {
    return winResult(item, status.prizeTitle);
  } else if (status.drawResult - 4 === 0) {
    return AutoAbandon();
  } else {
    return fallResult(self, status, active_index);
  }
}

function winResult(prizeInfo: any, prizeTitle: any) {
  return (
    <div className={`${styles.win_prize} ${styles.model_content}`}>
      <div className={styles.font_size_1}>
        <p>o(*≧▽≦)ツ</p>
        <p>恭喜欧皇！你中奖啦！</p>
      </div>
      <div className={styles.font_size_2}>
        <p>
          恭喜小伙伴抽中了{prizeInfo.reName}提供的
          <span className={styles.font_weight}>
            {prizeTitle || prizeInfo.prize}
          </span>
        </p>
        <p>兑奖流程：</p>
        <p>1. 打开盒DAN APP，进入消息通知-DAN酱通知</p>
        <p>2. 点开中奖消息通知，查看兑奖码（请妥善保管，不要外泄哦）</p>
        <p className={styles.no_wrap}>3. 添加盒DAN孵蛋员微信号：heDANkefu</p>
        <p>4. 将自己的盒DAN昵称与兑奖码一起发给盒DAN的微信客服，客服进行核实</p>
        <p>5. 在客服的指引下联系品牌方完成兑奖，就可以等待奖品上门啦！</p>
      </div>
    </div>
  );
}

//自动放弃
function AutoAbandon() {
  return (
    <div className={`${styles.notBlock} ${styles.autoAbandon}`}>
      7天内未填写礼品收取信息，已视为自动放弃领取盒DAN TPU娃包吧唧套装
    </div>
  );
}

function fallResult(self: any, status: any, active_index: any) {
  const active_number = ["一", "二", "三", "四", "五", "六"];
  return (
    <div className={`${styles.AddresseeLayer} ${styles.model_content}`}>
      <div className={styles.font_size_1}>
        恭喜你！中了盒DAN限定TPU娃包套装（第{active_number[active_index]}
        期）！
      </div>
      <div className={styles.font_size_5}>
        *每期每个帐号限领取一套盒DAN TPU娃包吧唧套装
      </div>
      <div className={styles.image}>
        <img
          src={require(`./img/img_0${active_index + 1}.png`).default}
          alt=""
          className={styles.img}
        />
      </div>
      {active_index > 1 && (
        <div>
          <div className={styles.warnTitle}>
            请输入你的礼品收取信息，我们将在<b>30天</b>内将礼品发出～
          </div>
          {status.receiveName ? (
            <div
              className={styles.checkedAddresseeInfo}
              onClick={() => {
                return self.isShowAddresseeModal(status);
              }}
            >
              查看已填写地址
            </div>
          ) : (
            <div
              className={styles.openAddresseeModal}
              onClick={() => {
                return self.isShowAddresseeModal(status);
              }}
            >
              填写礼品收取信息
            </div>
          )}
        </div>
      )}
    </div>
  );
}

//3期(已淘汰)
// function fallResult(prizeInfo: any, active: any) {
//   return (
//     <div className={`${styles.no_prize} ${styles.model_content}`}>
//       <div className={styles.font_size_1}>
//         <p>很抱歉，你未中奖●﹏●</p>
//       </div>
//       <div className={styles.font_size_3}>
//         <p>*每个抽选帐号限领取一个娃包</p>
//       </div>
//       <div className={styles.font_size_2}>
//         <p>
//           希望小伙伴不要难过，DAN酱会送上一份特殊礼包——
//           <span className={`${styles.modal_color} ${styles.font_weight}`}>
//             塑料透明TPU娃包与吧唧组合套装，
//           </span>
//           以感谢你在活动期间对{prizeInfo.reName}与盒DAN做出的贡献。
//         </p>
//       </div>
//       <div className={styles.package}>
//         <img src={active.awardCover} alt="" />
//       </div>
//       <div className={styles.font_size_2}>
//         <p
//           className={`${styles.no_wrap} ${styles.font_size_4} ${styles.font_weight}`}
//         >
//           请添加盒DAN孵蛋员微信号：
//           <span>heDANkefu</span>
//         </p>
//         <p>将你的详细收件信息告诉我们，我们会在2个月内寄出特殊礼包。</p>
//         <p>再次感谢你参加我们的活动~ (๑• . •๑)</p>
//       </div>
//     </div>
//   );
// }

function bottomView() {
  return (
    <>
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
    </>
  );
}

function backBtnBox(click: Function) {
  return (
    <div
      className={styles.back}
      onClick={() => {
        click();
      }}
    >
      <img
        src={require("@/components/ModalBox/img/back.png").default}
        className={styles.back_icon}
        alt=""
      />
      <span>戳我返回活动主页面</span>
    </div>
  );
}
