import React from "react";
import styles from "./index.module.scss";
import TopContent from "./module/TopContent";
import Content from "./module/Content";
import QRcode from "../module/QRcode";
import Sponsor from "../module/Sponsor";
import {cloud, random} from "./count";
import {getUrlParam} from "@/utils/utils";
import ModalBox from "@/components/ModalBox";
import OpenApp from "@/components/OpenApp";
import {activityInfo} from "../draw/api";
import {ACTIVITYCODE} from "../active_config";

import LoadingPage from "@/components/LoadingPage";

type StateType = {
  [propsName: string]: any;
};

const win: any = window;

const browserType = win.markComm.browserType();
const {test} = getUrlParam();
let {token} = getUrlParam();

if (test) {
  token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY3NjI4NzMwOSIsImNyZWF0ZWQiOjE1OTYwOTU0ODc4OTAsImV4cCI6MTU5ODY4NzQ4N30.eYKmvgvOsZzuek3_Cp6x5I7UT927uUcfPz0VS8xWV4pMBMi9aaj9R44nWsslitdhls0vl4Qr999vDXh2Oy95yA";
  browserType.isHedanApp = true;
}

if (!browserType.isHedanApp) {
  token = "";
}

class Page extends React.Component<any> {
  state: StateType = {
    loding: true,
    isMobile: true,
    cloudArr: [],
    moduleStatus: false,
    isStart: false,
    statrTime: "",
  };

  componentDidMount() {
    this.props.history.listen(() => {
      const rootPage: any = document.getElementById("root");
      //当路由切换时
      rootPage.scrollTo(0, 0);
    });
    const browserType = win.markComm.browserType();
    this.setState({
      isMobile: browserType.isMobile,
    });
    // setTimeout(() => {
    this.insertCloud();
    // }, 300);

    clearInterval(this.timer);
    this.initApi();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  timer: any = null;

  initApi = () => {
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
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.setState({
        loding: false,
      });
      const nowTime = new Date().getTime();
      let value = statrTime - nowTime;
      if (test) {
        //假装活动没开始
        value = 20;
      }
      if (value < 0) {
        // 活动已经开始
        clearInterval(this.timer);
        this.setState({
          isStart: true,
        });
      } else {
        //活动没有开始
      }
    }, 1000);
  };

  insertCloud = () => {
    const _this = this;
    // 这里不采用随机 , 采用固定写死
    const cloudArr = [
      {
        jump: random(1, 7),
        left: -135,
        top: 500,
        type: 3,
      },
      {
        jump: random(1, 7),
        left: 240,
        top: 1163,
        type: 2,
      },
      {
        jump: random(1, 7),
        left: 260,
        top: 2300,
        type: 1,
      },
    ];

    _this.setState({
      cloudArr,
    });
    /*
      const bgElm: any = win.document.getElementById("guardians-content-bg");
      const contElm: any = win.document.getElementById("guardians-content");
      if (bgElm && contElm) {
        const w = bgElm.offsetWidth;
        const h = contElm.offsetHeight;
        const cloudArr = cloud(random(5, 14), w, h);
        console.log(cloudArr);

        _this.setState({
          cloudArr,
        });
      } else {
        this.insertCloud();
      }
    */
  };

  gotToDrawList = () => {
    const _this = this;

    if (browserType.isHedanApp) {
      if (token) {
        _this.props.history.push(
          `/activity/progress_check?token=${token || ""}`,
        );
      } else {
        this.setState({
          moduleStatus: true,
        });
      }
    } else {
      this.setState({
        moduleStatus: true,
      });
    }
  };

  closeModule = (param: boolean) => {
    this.setState({
      moduleStatus: !param,
    });
  };

  goToDraw = (id: string | number) => {
    const {isStart} = this.state;
    if (isStart) {
      const _this = this;
      if (browserType.isHedanApp) {
        if (token) {
          this.props.history.push(
            `/activity/draw?id=${id}&token=${token || ""}`,
          );
        } else {
          this.setState({
            moduleStatus: true,
          });
        }
      } else {
        this.setState({
          moduleStatus: true,
        });
      }
    }
  };

  render() {
    const {isMobile, cloudArr, moduleStatus, isStart, loding} = this.state;

    return (
      <div className={styles.wrapper}>
        <LoadingPage status={loding} />
        <div className={`${styles.wrapperBox} ${isMobile && styles.mobile}`}>
          <TopContent />
          <div id="guardians-content-bg" className={styles.conttentBG}>
            {cloudArr.map((item: any, index: number) => {
              return (
                <img
                  key={index}
                  className={`${styles[`cloud_${item.type}`]} ${
                    styles[`jump_${item.jump}`]
                  }`}
                  style={{
                    left: `${item.left / 100}rem`,
                    top: `${item.top / 100}rem`,
                  }}
                  src={
                    require(`../guardians/img/cloud_${item.type}.svg`).default
                  }
                  alt=""
                />
              );
            })}
            {/* 在这里用js插入背景 */}
          </div>
          <Content
            className={styles.content}
            goToDraw={isStart && this.goToDraw}
          />
          <div className={styles.footerBox}>
            <div className={styles.QRbox}>
              <QRcode />
            </div>
            <div className={styles.sponsorBox}>
              <Sponsor />
            </div>
          </div>
        </div>
        <div className={styles.drawGate} onClick={this.gotToDrawList}>
          <img src={require("./img/draw_gate.png").default} alt="" />
        </div>

        <ModalBox
          modelStatus={moduleStatus}
          closeStatus={true}
          onClose={this.closeModule}
          backBtn={false}
        >
          <div className={styles.model_content}>
            <div className={`${styles.font_size_1} ${styles.no_wrap}`}>
              <p>●﹏●</p>
              <p>啊哦你还没有登录哦</p>
              <p>
                {browserType.isHedanApp ? (
                  <div className={styles.modal_color}>请登录后</div>
                ) : (
                  <OpenApp className={styles.modal_color}>
                    请在「盒DAN APP」内登录
                  </OpenApp>
                )}
              </p>
              <p>再进行查看</p>
            </div>
          </div>
        </ModalBox>
      </div>
    );
  }
}
export default Page;
