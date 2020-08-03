import React from "react";
import {Modal} from "antd-mobile";
import {getUrlParam} from "@/utils/utils";
import {withRouter} from "react-router-dom";

import styles from "./index.module.scss";

interface moduleProps {
  modelStatus: boolean;
  closeStatus: boolean;
  onClose: Function;
  backBtn: boolean;
  isShowReceiveInfo?: boolean;
  isShowReceiveModal?: Function;
  [propsName: string]: any;
}

interface ModalBox {
  props: moduleProps;
}

class ModalBox extends React.Component<any> {
  static defaultProps: moduleProps = {
    modelStatus: false,
    closeStatus: true,
    backBtn: true,
    isShowReceiveInfo: false,
    onClose: () => {},
  };

  onClose = () => {
    const {modelStatus} = this.props;
    this.props.onClose(modelStatus);
  };

  goGuardians = (e: any) => {
    e.stopPropagation(); //阻止冒泡
    if (this.props.isShowReceiveModal && !this.props.isShowReceiveInfo) {
      this.props.isShowReceiveModal();
      return;
    }
    const _this = this;
    const {token} = getUrlParam();
    if (token) {
      _this.props.history.push(`/activity/guardians?token=${token || ""}`);
    }
  };

  render() {
    const {modelStatus, closeStatus, backBtn} = this.props;
    return (
      <div className={styles.modal}>
        {modelStatus && <div className={styles.modal_mask}></div>}
        {modelStatus && (
          <div
            className={`${styles.modal_wraper} ${
              backBtn ? styles.modal_wraper_overflow : ""
            }`}
          >
            <div className={styles.modal_content}>
              {this.props.children}
              {closeStatus && (
                <div
                  className={styles.close}
                  onClick={() => {
                    this.props.onClose(modelStatus);
                  }}
                >
                  <img src={require("./img/close.png").default} alt="" />
                </div>
              )}
            </div>
          </div>
        )}
        {modelStatus && backBtn && (
          <div className={styles.back} onClick={this.goGuardians}>
            <img
              src={require("./img/back.png").default}
              className={styles.back_icon}
              alt=""
            />
            <span>戳我返回活动主页面</span>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ModalBox);
