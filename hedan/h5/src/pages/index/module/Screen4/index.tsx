import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import { getVideo } from "../../api";
interface moduleProps {
  playVideo: Function;
  [propsName: string]: any;
}
type stateType = {
  cover: string;
  video: string;
  playStatus: boolean;
};
interface Module {}

let isInitApi = false;

class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    playVideo: () => {},
  };

  state: stateType = {
    cover: "",
    video: "",
    playStatus: false,
  };

  videoElm: any;

  UNSAFE_componentWillReceiveProps() {
    if (this.props.activeIndex === 3) {
      this.initApi();
    }
  }

  initApi = () => {
    const _this = this;
    if (!isInitApi) {
      isInitApi = true;
      getVideo().then((res: any) => {
        this.setState(
          {
            cover: res.data.thumb,
            video: res.data.video,
          },
          () => {
            _this.initVideo();
          },
        );
      });
    }
  };

  initVideo = () => {};

  toPayer = () => {
    const { video, cover } = this.state;
    const { playVideo } = this.props;
    playVideo({
      video,
      cover,
    });
  };

  render() {
    const { cover /*  video, playStatus */ } = this.state;
    return (
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: `url(${require("./img/bg.png").default})`,
        }}
      >
        <div className={styles.title}>
          <p>首个可以</p>
          <p>
            <span>自由组合</span>的<br />
          </p>
          <p>玩具柜</p>
        </div>
        <div className={styles.title2}>就像IKEA的洞洞板一样</div>

        <div className={styles.videoBox}>
          <img
            className={styles.start}
            src={require("./img/start.svg").default}
            alt=""
            onClick={this.toPayer}
          />
          <img className={styles.cover} src={cover} alt="" />
          <img
            className={styles.playText}
            src={require("./img/play_text.svg").default}
            alt=""
          />
        </div>
      </div>
    );
  }
}
export default Module;
