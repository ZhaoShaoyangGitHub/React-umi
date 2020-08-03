import React from "react";
import styles from "./index.module.scss";
import {withRouter} from "react-router-dom";
import {getUrlParam, isPoneAvailable} from "@/utils/utils";
import {Toast} from "antd-mobile";
import {ACTIVITYCODE} from "../../active_config";
import {setReceiveInfo} from "./api";

interface moduleProps {
  isShowReceiveInfo: boolean;
  receiveName: string;
  receivePhone: string;
  receiveAddress: string;
  handleInput?: Function;
  frontId?: string;
  submitForm?: Function;
  submitFormSuccess?: Function;
  [propsName: string]: any;
}

type StateType = {
  tipInfo?: any;
  allBlur: boolean;
  [propsName: string]: any;
};

const win: any = window;

class ReceiveInfo extends React.Component<any> {
  static defaultProps: moduleProps = {
    isShowReceiveInfo: false,
    receiveName: "",
    receivePhone: "",
    receiveAddress: "",
  };

  state: StateType = {
    tipInfo: {
      tip: false,
      tipContent: "",
    },
    allBlur: true, //是否全部失去焦点
  };

  networkError = (str: string) => {
    this.setState({
      tipInfo: {
        tip: true,
        tipContent: str,
      },
    });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.setState({
        tipInfo: {
          tip: false,
          tipContent: "",
        },
      });
    }, 1000);
  };

  inputReceive = (key: any, value: any) => {
    this.props.handleInput && this.props.handleInput(key, value);
  };

  setReceiveInfo = () => {
    const _this = this;
    let {id} = getUrlParam();
    if (this.props.frontId) {
      id = this.props.frontId;
    }

    const {receiveAddress, receiveName, receivePhone} = this.props;
    if (!receiveName) {
      this.networkError("请将信息填写完整");
      return;
    }
    if (!receivePhone) {
      this.networkError("请将信息填写完整");
      return;
    }
    if (!receiveAddress) {
      this.networkError("请将信息填写完整");
      return;
    }
    if (!isPoneAvailable(receivePhone)) {
      Toast.info("请填写正确的手机号");
      return;
    }
    this.props.submitForm();
    setReceiveInfo({
      activityCode: "toy-guardian-5",
      frontId: id,
      receiveAddress,
      receiveName,
      receivePhone,
    })
      .then((res: any) => {
        if ((res.code = "OK")) {
          _this.networkError("填写完毕，请耐心等待礼物发送");
          if (this.props.submitForm) {
            this.props.submitForm();
          }
          // _this.inputReceive("addresseeModalStatus", false);
        }
      })
      .catch(() => {
        _this.networkError("啊哦，网络错误，请重试~");
      });
  };

  //解决ios 页面不回弹的bug

  getBlur() {
    this.setState({
      allBlur: false,
    });
  }

  fixScroll() {
    const u = navigator.userAgent;
    const isiOS = Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)); //ios终端
    this.setState(
      {
        allBlur: true,
      },
      () => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          if (isiOS && this.state.allBlur) {
            window.scrollTo(0, 0);
          }
        }, 10);
      },
    );
  }

  render() {
    const {
      receiveName,
      receivePhone,
      receiveAddress,
      isShowReceiveInfo,
    } = this.props;
    const {tipInfo} = this.state;
    return (
      <div className={`${styles.AddresseeLayer} ${styles.model_content}`}>
        <div className={styles.font_size_1}>
          恭喜你！中了盒DAN限定TPU娃包套装（第五期）！
        </div>
        <div className={styles.font_size_5}>
          *每期每个帐号限领取一套盒DAN TPU娃包吧唧套装
        </div>
        <div className={styles.image}>
          <img
            src={require("./img/img_05.png").default}
            alt=""
            className={styles.img}
          />
        </div>
        {isShowReceiveInfo ? fillInAddress(this) : noFillIAddress(this)}
        {tipInfo.tip && (
          <div className={styles.network}>
            <span>{tipInfo.tipContent}</span>
          </div>
        )}
      </div>
    );

    //未填写信息
    function noFillIAddress(parm: any) {
      const that = parm;
      return (
        <div className={styles.noFillIAddress}>
          <div className={styles.warnTitle}>
            请在此页面输入你的礼品收取信息，我们将在<b>30天</b>内将礼品发出～
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>收件人名称：</label>
              <input
                type="text"
                value={receiveName || ""}
                className={styles.formInput}
                onBlur={(e) => {
                  that.fixScroll();
                }}
                onFocus={(e) => {
                  that.getBlur();
                }}
                onChange={(e) => {
                  that.inputReceive("receiveName", e.target.value);
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>收件人电话：</label>
              <input
                type="text"
                value={receivePhone || ""}
                className={styles.formInput}
                onChange={(e) => {
                  that.inputReceive("receivePhone", e.target.value);
                }}
                onFocus={(e) => {
                  that.getBlur();
                }}
                onBlur={(e) => {
                  that.fixScroll();
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>详 细 地 址：</label>
              <textarea
                className={styles.formTextarea}
                value={receiveAddress || ""}
                onChange={(e) => {
                  that.inputReceive("receiveAddress", e.target.value);
                }}
                onFocus={(e) => {
                  that.getBlur();
                }}
                onBlur={(e) => {
                  that.fixScroll();
                }}
              />
            </div>
            <div className={styles.submitBtn} onClick={that.setReceiveInfo}>
              确定
            </div>
          </div>
        </div>
      );
    }
    //已填写信息
    function fillInAddress(parm: any) {
      const that = parm;
      return (
        <div className={styles.fillInAddress}>
          <div className={styles.warnTitle}>
            你的礼品收取信息已填写，我们将在<b>30天</b>内将礼品发出～
          </div>
          <div className={styles.content}>
            <div className={styles.contentItem}>
              <span>收件人名称：</span>
              <strong>{receiveName}</strong>
            </div>
            <div className={styles.contentItem}>
              <span>收件人电话：</span>
              <strong>{receivePhone}</strong>
            </div>
            <div className={styles.contentItem}>
              <span>详 细 地 址 ：</span>
              <strong>{receiveAddress}</strong>
            </div>
          </div>
          <div>
            如有其他问题，可以
            <strong>添加盒DAN孵蛋员（微信号：heDANkefu）</strong>咨询。
          </div>
        </div>
      );
    }
  }
}
export default withRouter(ReceiveInfo);
