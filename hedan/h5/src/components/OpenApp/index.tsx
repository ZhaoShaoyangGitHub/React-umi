import React from "react";
import Avatar from "@/components/Avatar";
import {withRouter} from "react-router-dom";

import {encodeUnicode, openApp} from "@/utils/utils";
import {isLink_outwx} from "@/config/constants";

interface moduleProps {
  isDown?: false | true;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface OpenApp {
  props: moduleProps;
  state: StateType;
}

const win: any = window;

class OpenApp extends React.Component<any> {
  static defaultProps: moduleProps = {
    isDown: false,
  };

  openAppFun = (e: any) => {
    e.stopPropagation(); //阻止冒泡
    const {isDown} = this.props;
    if (isDown) {
      this.down();
    } else {
      this.open();
    }
  };

  down = () => {
    const _this = this;
    const browserType = win.markComm.browserType();
    if (browserType.isPc) {
      window.location.href = "//www.hedan.art";
    } else {
      if (isLink_outwx()) {
        _this.props.history.push("/out_wx");
      } else {
        _this.props.history.push("/");
      }
    }
  };

  open = () => {
    const _this = this;
    const url = window.location.href;
    if (isLink_outwx()) {
      this.props.history.push(`/out_wx?url=${encodeUnicode(url)}`);
    } else {
      openApp();

      const openTime = Number(new Date());
      const timer = setTimeout(function () {
        const newDate: number = Number(new Date());
        if (newDate - openTime < 2200) {
          //加了200ms基准误差
          window.location.href = "/";
        }
        if (newDate - openTime > 2200) {
          clearTimeout(timer);
        }
      }, 2000);
    }
  };

  render() {
    const {isDown, staticContext, ...other} = this.props;

    return (
      <a onClick={this.openAppFun} {...other}>
        {this.props.children}
      </a>
    );
  }
}

export default withRouter(OpenApp);
