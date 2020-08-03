import React from "react";
import { withRouter } from "react-router-dom";
import { atFilter } from "./filter";

import styles from "./index.module.scss";

interface moduleProps {
  data: {
    [propsName: string]: any;
  };
  className?: string;
  [propsName: string]: any;
}

type StateType = {
  [propsName: string]: any;
};

interface AtCont {
  props: moduleProps;
  state: StateType;
}

class AtCont extends React.Component<any> {
  componentDidMount() {
    this.bindSrcEvent();
  }

  bindSrcEvent = () => {
    const _this = this;

    const origin: any = window.location.origin;

    function topicFun(e: any) {
      const Elm = e.target;
      e.cancelBubble = true;
      e.stopPropagation();
      const id = Elm.getAttribute("data-id");
      console.info("话题", id);
      _this.props.history.push(`/topic?topicId=${id}`);
    }
    function atUserFun(e: any) {
      const Elm = e.target;
      e.cancelBubble = true;
      e.stopPropagation();
      const id = Elm.getAttribute("data-id");
      console.info("用户", id);
      _this.props.history.push(`/user?userId=${id}`);
    }
    setTimeout(() => {
      const topicClick: any = document.getElementsByClassName("topicClick");
      for (let i = 0; i < topicClick.length; i++) {
        const el = topicClick[i];
        el.onclick = topicFun;
      }
    }, 700);
    setTimeout(() => {
      const topicClick: any = document.getElementsByClassName("atUserClick");
      for (let i = 0; i < topicClick.length; i++) {
        const el = topicClick[i];
        el.onclick = atUserFun;
      }
    }, 700);
  };

  render() {
    const { data, className } = this.props;

    return (
      <div
        className={`${styles.wrapper} ${className}`}
        dangerouslySetInnerHTML={{
          __html: atFilter(data),
        }}
      />
    );
  }
}

export default withRouter(AtCont);
