import React from "react";
import styles from "./index.module.scss";
import Avatar from "@/components/Avatar";
import Header from "@/components/ActivityHeader";
import FontChart from "../module/FontChart";
import ModalBox from "@/components/ModalBox";
import OpenApp from "@/components/OpenApp";
import LoadingPage from "@/components/LoadingPage";
import ReceiveInfo from "../module/ReceiveInfo";
import Snow from "./Snow";
import {getUrlParam} from "@/utils/utils";
import {activityInfo, drawCheck, prizeDetail, draw} from "./api";
import {getDetail} from "../guardians/api";
import {ACTIVITYCODE} from "../active_config";

const win: any = window;
const browserType = win.markComm.browserType();
const Swiper = win.Swiper as any;

// test-start
// const isHedanApp = true;
const isHedanApp = browserType.isHedanApp;
// test-end

type stateType = {
  modalType: number;
  modalStatus: boolean;
  id: number;
  aggIndex: number;
  momentDays: number;
  shareCount: number;
  eggList: Array<any>;
  eggIndex: number;
  drawResult: number;
  time: string;
  prizeList: Array<object>;
  snowStatus: boolean;
  prizeInfo: any;
  loading: boolean;
  addresseeModalStatus: boolean;
  isShowReceiveInfo: boolean;
  isReceiveModalStatus: boolean;
  receiveName: string;
  receivePhone: string;
  receiveAddress: string;
  tipInfo?: any;
  prizeTitle?: string;
};

class Draw extends React.Component<any> {
  state: stateType = {
    id: 1,
    modalType: 0,
    modalStatus: false,
    aggIndex: -1,
    momentDays: 0,
    shareCount: 0,
    eggList: [],
    eggIndex: -1,
    drawResult: 1,
    time: "00:00:00",
    prizeList: [],
    snowStatus: false,
    tipInfo: {
      tip: false,
      tipContent: "",
      tipImg: true,
    },
    prizeInfo: "",
    loading: true,
    addresseeModalStatus: false,
    isShowReceiveInfo: false,
    isReceiveModalStatus: false,
    receiveName: "",
    receivePhone: "",
    receiveAddress: "",
    prizeTitle: "",
  };

  mySwiper: any;

  timer: any;

  UNSAFE_componentWillMount() {
    this.init();
    //test
    // this.setState({
    //   snowStatus: true,
    // });
    //test-end
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  init = () => {
    const {id} = getUrlParam();
    this.getActivityInfo();
    this.initEggList();
    this.getPrizeList();
    this.setState({
      prizeInfo: getDetail(Number(id)).detail,
    });
  };

  getActivityInfo = () => {
    activityInfo({
      activityCode: ACTIVITYCODE,
    })
      .then((res) => {
        const drawEndTime = res.data.drawEndTime;
        this.remainingTime(drawEndTime);
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.networkError("啊哦，网络错误，请重试~");
      });
  };

  // 初始化时间
  remainingTime = (endTime: number) => {
    const {token} = getUrlParam();
    // const endTime = new Date(ACTIVITYENDTIME).getTime();
    const startTime = new Date().getTime();
    if (endTime - startTime > 0) {
      const timeDiff: any = new Date(endTime - startTime);
      const hours = Math.floor(timeDiff / (3600 * 1000));
      const remainder1 = Math.floor(timeDiff % (3600 * 1000));
      const minutes = Math.floor(remainder1 / (60 * 1000));
      const remainder2 = Math.floor(remainder1 % (60 * 1000));
      const seconds = Math.round(remainder2 / 1000);
      this.setState({
        time: `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`,
      });
      this.countDown();
      if (!isHedanApp) {
        this.setState({
          modalType: 6,
          modalStatus: true,
        });
      } else if (token.length === 0) {
        this.setState({
          modalType: 5,
          modalStatus: true,
        });
      } else {
        this.getDrawCheck();
      }
    } else {
      this.setState({
        modalType: 7,
      });
    }
  };

  // 活动倒计时
  countDown = () => {
    const _this = this;
    _this.timer = setInterval(() => {
      const {time} = this.state;
      const arr = time.split(":");
      let hours = parseInt(arr[0], 10);
      let minutes = parseInt(arr[1], 10);
      let seconds = parseInt(arr[2], 10);
      seconds -= 1;
      if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
          if (hours < 0) {
            hours = 0;
            minutes = 0;
            seconds = 0;
            clearInterval(_this.timer);
          }
        }
      }
      this.setState({
        time: `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`,
      });
    }, 1000);
  };

  initEggList = () => {
    for (let i = 0; i < 18; i++) {
      this.getRandomNum();
    }
  };

  getRandomNum = () => {
    const {eggList} = this.state;
    let glod = false;
    for (let i = 0; i < eggList.length; i++) {
      if (eggList[i] === 10) {
        glod = true;
      }
    }
    const randomNum = Math.ceil(Math.random() * 10);
    if (glod && randomNum === 10) {
      this.getRandomNum();
    } else {
      eggList.push(randomNum);
      this.setState({
        eggList,
      });
    }
  };

  getPrizeList = () => {
    const {id} = getUrlParam();
    prizeDetail({
      activityCode: ACTIVITYCODE,
      frontId: Number(id),
    })
      .then((res) => {
        this.setState({
          prizeList: res.data,
        });
        this.initSwiper();
      })
      .catch(() => {
        this.networkError("啊哦，网络错误，请重试~");
      });
  };

  getDrawCheck = () => {
    const {id} = getUrlParam();
    drawCheck({
      activityCode: ACTIVITYCODE,
      frontId: Number(id),
    })
      .then((res) => {
        if (
          res.data.receiveAddress &&
          res.data.receiveName &&
          res.data.receivePhone
        ) {
          this.setState({
            isShowReceiveInfo: true,
          });
        }
        this.setState({
          receiveAddress: res.data.receiveAddress,
          receiveName: res.data.receiveName,
          receivePhone: res.data.receivePhone,
          addresseeModalStatus: true,
        });
        if (res.data.qualifyType === 2) {
          this.setState({
            modalType: res.data.qualifyType,
            momentDays: res.data.momentDays,
            shareCount: res.data.shareCount,
            modalStatus: true,
          });
        } else if (res.data.qualifyType === 4) {
          if (res.data.drawResult === 3) {
            this.setState({
              snowStatus: true,
              prizeTitle: res.data.prizeTitle,
            });
          }
          this.setState({
            modalType: res.data.qualifyType,
            drawResult: res.data.drawResult,
            modalStatus: true,
            aggIndex: res.data.drawResult,
          });
        } else if (res.data.qualifyType === 1) {
          this.setState({
            modalType: res.data.qualifyType,
          });
        } else {
          this.setState({
            modalType: res.data.qualifyType,
            modalStatus: true,
          });
        }
      })
      .catch(() => {
        this.networkError("啊哦，网络错误，请重试~");
      });
  };

  initSwiper = () => {
    this.mySwiper = new Swiper(".swiper_preize_box", {
      direction: "vertical",
      loop: true,
      noSwiping: true,
      autoplay: {
        delay: 2000,
      },
    });
  };

  lotteryDraw = (index: number) => {
    const {id} = getUrlParam();
    const {modalType} = this.state;
    const _this = this;
    if (
      modalType === 6 ||
      modalType === 5 ||
      modalType === 2 ||
      modalType === 4 ||
      modalType === 3
    ) {
      _this.setState({
        modalStatus: true,
      });
    } else if (modalType === 1) {
      _this.setState({
        aggIndex: index + 1,
        LoadingPage: true,
      });
      const timeout = setTimeout(() => {
        _this.networkError("太多人在砸蛋啦~ 正在为你排队~");
        _this.setState({
          aggIndex: 0,
          LoadingPage: false,
        });
      }, 3000);
      draw({
        activityCode: ACTIVITYCODE,
        frontId: Number(id),
      })
        .then((res: any) => {
          clearTimeout(timeout);
          this.setState({
            LoadingPage: false,
          });
          if (res.code === "OK") {
            if (res.data.drawResult === 3) {
              _this.setState({
                snowStatus: true,
                prizeTitle: res.data.prizeTitle,
              });
            }
            if (
              res.data.receiveAddress &&
              res.data.receiveName &&
              res.data.receivePhone
            ) {
              this.setState({
                isShowReceiveInfo: true,
              });
            }
            _this.setState({
              receiveAddress: res.data.receiveAddress,
              receiveName: res.data.receiveName,
              receivePhone: res.data.receivePhone,
              addresseeModalStatus: true,
            });
            const time1 = setTimeout(() => {
              clearTimeout(time1);
              _this.setState({
                modalStatus: true,
                modalType: 4,
              });
            }, 1200);
            const time2 = setTimeout(() => {
              clearTimeout(time2);
              _this.setState({
                drawResult: res.data.drawResult,
              });
            }, 1000);
          } else {
            _this.setState({
              aggIndex: 0,
            });
          }
        })
        .catch(() => {
          _this.setState({
            aggIndex: 0,
            LoadingPage: false,
          });
          _this.networkError("啊哦，网络错误，请重试~");
        });
    }
  };

  onCloseActivityEnd = (parm: boolean) => {
    this.setState({
      modalStatus: !this.state.modalStatus,
    });
  };

  networkError = (str: string, img: boolean = true) => {
    this.setState({
      tipInfo: {
        tip: true,
        tipImg: img,
        tipContent: str,
      },
    });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.setState({
        tipInfo: {
          tip: false,
          tipImg: true,
          tipContent: "",
        },
      });
    }, 1000);
  };

  onEnd = () => {
    this.setState({
      snowStatus: false,
    });
  };

  inputReceive = (key: any, value: any) => {
    this.setState({
      [key]: value,
    });
  };

  submitForm = () => {
    this.setState({
      isShowReceiveInfo: true,
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
      modalType,
      aggIndex,
      eggList,
      drawResult,
      momentDays,
      shareCount,
      time,
      prizeList,
      modalStatus,
      snowStatus,
      tipInfo,
      prizeInfo,
      loading,
      addresseeModalStatus,
      isShowReceiveInfo,
      isReceiveModalStatus,
      receiveName,
      receivePhone,
      receiveAddress,
      prizeTitle,
    } = this.state;
    const children1 = Array(5)
      .fill(1)
      .map((c, i) => {
        return (
          <div
            key={i}
            className="addMoneyAnim1"
            style={{animationDelay: `${-Math.random() * 0.6}s`}}
          />
        );
      });
    const children2 = Array(5)
      .fill(1)
      .map((c, i) => {
        return (
          <div
            key={i}
            className="addMoneyAnim2"
            style={{animationDelay: `${-Math.random() * 0.6}s`}}
          />
        );
      });
    const children3 = Array(5)
      .fill(1)
      .map((c, i) => {
        return (
          <div
            key={i}
            className="addMoneyAnim3"
            style={{animationDelay: `${-Math.random() * 0.6}s`}}
          />
        );
      });

    return (
      <div className={styles.wrapper}>
        <LoadingPage status={loading} />
        <div
          className={styles.wrapperMask}
          style={{
            backgroundImage: `url(${prizeInfo.bg})`,
          }}
        ></div>
        {!isHedanApp && <Header className={styles.header} color={"black"} />}
        <div className={styles.content}>
          {!isHedanApp && <div className={`${styles.line}`}></div>}
          <div className={styles.remaining_time}>
            <div className={styles.title}>距离抽奖结束还有</div>
            <FontChart color={"white"} str={time} />
          </div>
          <div className={styles.rule}>
            <p>抽奖规则：</p>
            <p>
              {prizeInfo.reName}
              「玩具守护者」活动分区正式开奖啦～获得抽奖权的小伙伴可以在下方18颗DAN里挑一颗合眼缘的DAN，然后敲（点）打（击）它就可以抽奖啦，最高奖励为
              <b>{prizeInfo.prize}。你的机会只有一次哦，还请慎重选择一颗DAN~</b>
            </p>
          </div>
          <div className={styles.egg_list}>
            {eggListImg(this)}
            <div className={`${styles.pedestal} ${styles.pedestal1}`}></div>
            <div className={`${styles.pedestal} ${styles.pedestal2}`}></div>
            <div className={`${styles.pedestal} ${styles.pedestal3}`}></div>
            <div className={`${styles.pedestal} ${styles.pedestal4}`}></div>
            <div className={`${styles.pedestal} ${styles.pedestal5}`}></div>
          </div>
        </div>
        {prizeList.length > 0 && winnersList()}
        {snowStatus && SnowLayer(this)}
        {modalType === 2 && DaysLayer(this)}
        {modalType === 3 && IneligibleLayer(this)}
        {modalType === 4 && drawResult === 2 && AddresseeLayer(this)}
        {modalType === 4 && drawResult === 3 && WinPrizeLayer(this)}
        {modalType === 5 && AppLoginLayer(this)}
        {modalType === 6 && OpenAppLayer(this)}
        {modalType === 7 && ActivityEndLayer(this)}
        {tipInfo.tip && (
          <div className={styles.network}>
            {tipInfo.tipImg && (
              <img
                src={require("./img/img_09.png").default}
                alt=""
                className={styles.icon}
              />
            )}
            <span>{tipInfo.tipContent}</span>
          </div>
        )}
        {isReceiveModalStatus && ReceiveModal(this)}
      </div>
    );

    // 中奖列表
    function winnersList() {
      return (
        <div className={`swiper-container swiper_preize_box ${styles.tips}`}>
          <div className="swiper-wrapper">
            {prizeList.map((item: any, index) => {
              return (
                <div
                  className={`swiper-slide swiper-no-swiping ${styles.swiper_preize_slide}`}
                  key={index}
                >
                  <div>
                    <div className={styles.winner}>
                      <Avatar
                        className={styles.avatar}
                        url={item.avatar}
                      ></Avatar>
                      <div className={styles.name}>{item.nickname}</div>
                    </div>
                    <div className={styles.prize_text}>
                      抽中{item.prizeTitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 蛋图片列表
    function eggListImg(parm: any) {
      const that = parm;
      return eggList.map((item, index) => {
        return (
          <div
            className={` ${styles.egg_list_item} ${
              aggIndex === index + 1 && drawResult === 1 ? styles.active : ""
            } `}
            key={index}
            onClick={() => {
              that.lotteryDraw(index);
            }}
          >
            {drawResult === 2 && aggIndex === index + 1 && (
              <div className={styles[`egg_${item}_no`]}></div>
            )}
            {drawResult === 3 && aggIndex === index + 1 && (
              <div className={styles[`egg_${item}_prize`]}></div>
            )}
            {!(
              (drawResult === 2 && aggIndex === index + 1) ||
              (drawResult === 3 && aggIndex === index + 1)
            ) && <div className={styles[`egg_${item}`]}></div>}
          </div>
        );
      });
    }

    // 中奖动画
    function SnowLayer(parm: any) {
      const that = parm;
      return (
        <div className={styles.snow_wrapper}>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: -500,
              y: "100%",
              width: "200%",
              height: 100,
            }}
            basicToDuration={2500}
            startDelayRandom={2500}
          >
            {children1}
          </Snow>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: -300,
              y: "100%",
              width: "180%",
              height: 100,
            }}
            basicToDuration={3500}
            startDelayRandom={3000}
          >
            {children2}
          </Snow>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: -300,
              y: "100%",
              width: "180%",
              height: 100,
            }}
            startDelayRandom={2000}
            onEnd={that.onEnd}
          >
            {children3}
          </Snow>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: -500,
              y: "100%",
              width: "200%",
              height: 100,
            }}
            basicToDuration={3000}
            startDelayRandom={2000}
          >
            {children1}
          </Snow>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: -300,
              y: "100%",
              width: "100%",
              height: 100,
            }}
          >
            {children2}
          </Snow>
          <Snow
            startArea={{
              x: 0,
              y: -300,
              width: "100%",
              height: 50,
            }}
            endArea={{
              x: 500,
              y: "100%",
              width: "100%",
              height: 100,
            }}
          >
            {children3}
          </Snow>
        </div>
      );
    }

    // 连发天数不够，没有资格
    function DaysLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={true}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.authority} ${styles.model_content}`}>
            <img
              src={require("./img/img_05.png").default}
              alt=""
              className={styles.top_img}
            />
            <div className={styles.font_size_1}>
              <p>非常可惜●﹏●</p>
              <p>
                你的连发天数为{" "}
                <span className={styles.modal_color}>{momentDays}</span> 天，
              </p>
              <p>
                分享次数为{" "}
                <span className={styles.modal_color}>{shareCount}</span> 次，
              </p>
              <p>没有完成终极任务，</p>
              <p>所以不能砸DAN哦～</p>
            </div>
            <div className={styles.font_size_2}>
              <p>希望小伙伴不要难过，还有更多轮次的</p>
              <p>「玩具守护者」活动哦~ 期待与你下次</p>
              <p>相见鸭~(๑• . •๑)</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    // 没有资格
    function IneligibleLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={true}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.authority} ${styles.model_content}`}>
            <img
              src={require("./img/img_05.png").default}
              alt=""
              className={styles.top_img}
            />
            <div className={styles.font_size_1}>
              <p>非常可惜●﹏●</p>
              <p>因为违反社区规则，</p>
              <p>您未获得抽奖资格，</p>
              <p>所以不能砸DAN哦～</p>
            </div>
            <div className={styles.font_size_2}>
              <p>希望小伙伴不要难过，还有更多轮次的</p>
              <p>「玩具守护者」活动哦~ 期待与你下次</p>
              <p>相见鸭~(๑• . •๑)</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    // 在app内登录
    function AppLoginLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={true}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={styles.model_content}>
            <div className={`${styles.font_size_1} ${styles.no_wrap}`}>
              <p>●﹏●</p>
              <p>啊哦你还没有登录哦</p>
              <p className={styles.modal_color}>请在「盒DAN APP」内登录</p>
              <p>再进行抽奖</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    // 未中奖（已淘汰）
    function NoPrizeLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={false}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.no_prize} ${styles.model_content}`}>
            <div className={styles.font_size_1}>
              <p>很抱歉，你未中奖●﹏●</p>
            </div>
            <div className={styles.font_size_3}>
              <p>*每个抽选帐号限领取一个娃包</p>
            </div>
            <div className={styles.font_size_2}>
              <p>
                希望小伙伴不要难过，DAN酱会送上一份特殊礼包——
                <span className={`${styles.modal_color} ${styles.font_weight}`}>
                  塑料透明TPU娃包与吧唧组合套装，
                </span>
                以感谢你在活动期间对{prizeInfo.reName}与盒DAN做出的贡献。
              </p>
            </div>
            <div className={styles.package}>
              <img src={require("./img/img_08.png").default} alt="" />
            </div>
            <div className={styles.font_size_2}>
              <p
                className={`${styles.no_wrap} ${styles.font_size_4} ${styles.font_weight}`}
              >
                请添加盒DAN孵蛋员微信号：
                <span>heDANkefu</span>
              </p>
              <p>将你的详细收件信息告诉我们，我们会在2个月内寄出特殊礼包。</p>
              <p>再次感谢你参加我们的活动~ (๑• . •๑)</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    // 中奖
    function WinPrizeLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={false}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.win_prize} ${styles.model_content}`}>
            <div className={styles.font_size_1}>
              <p>o(*≧▽≦)ツ</p>
              <p>恭喜欧皇！你中奖啦！</p>
            </div>
            <div className={styles.font_size_2}>
              <p>
                恭喜小伙伴抽中了{prizeInfo.reName}提供的
                <span className={styles.font_weight}>{prizeTitle}</span>
              </p>
              <p>兑奖流程：</p>
              <p>1. 打开盒DAN APP，进入消息通知-DAN酱通知</p>
              <p>2. 点开中奖消息通知，查看兑奖码（请妥善保管，不要外泄哦）</p>
              <p className={styles.no_wrap}>
                3. 添加盒DAN孵蛋员微信号：heDANkefu
              </p>
              <p>
                4.
                将自己的盒DAN昵称与兑奖码一起发给盒DAN的微信客服，客服进行核实
              </p>
              <p>5. 在客服的指引下联系品牌方完成兑奖，就可以等待奖品上门啦！</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    // 打开app抽奖
    function OpenAppLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={true}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.model_content} ${styles.model_app_login}`}>
            <div className={styles.font_size_1}>
              <p>●﹏●</p>
              <p>这里不能抽奖哦</p>
              <p>
                <OpenApp className={styles.modal_color}>
                  请打开「盒DAN APP」
                </OpenApp>
              </p>
              <p>再进行抽奖</p>
            </div>
            <div>
              <OpenApp className={styles.modal_button}>
                打开盒DAN APP进行抽奖
              </OpenApp>
            </div>
          </div>
        </ModalBox>
      );
    }

    //活动结束
    function ActivityEndLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={true}
          modelStatus={modalStatus}
          onClose={that.onCloseActivityEnd}
        >
          <div className={`${styles.authority} ${styles.model_content}`}>
            <img
              src={require("./img/img_05.png").default}
              alt=""
              className={styles.top_img}
            />
            <div className={styles.font_size_1}>
              <p>●﹏●</p>
              <p>抽奖已经结束啦</p>
              <p>小伙伴你晚来了一步</p>
            </div>
            <div className={styles.font_size_2}>
              <p>希望小伙伴不要难过，还有更多轮次的</p>
              <p>「玩具守护者」活动哦~ 期待与你下次</p>
              <p>相见鸭~(๑• . •๑)</p>
            </div>
          </div>
        </ModalBox>
      );
    }

    //3期抽奖新增
    //未中奖信息
    function AddresseeLayer(parm: any) {
      const that = parm;
      return (
        <ModalBox
          closeStatus={false}
          modelStatus={addresseeModalStatus}
          isShowReceiveModal={that.isShowReceiveModal}
          isShowReceiveInfo={isShowReceiveInfo}
        >
          <ReceiveInfo
            isShowReceiveInfo={isShowReceiveInfo}
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

export default Draw;
