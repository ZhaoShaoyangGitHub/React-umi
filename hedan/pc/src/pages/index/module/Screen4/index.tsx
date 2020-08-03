import React from "react";
import styles from "./index.module.scss";
import { getVideo } from "../../api";
import { observer, inject } from "mobx-react";

interface moduleProps {
  [propsName: string]: any;
}
type stateType = {
  cover: string;
  video: string;
  playStatus: boolean;
};
interface Module {}

let initModule = false;

@inject("store") // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {};

  state: stateType = {
    cover: "",
    video: "",
    playStatus: false,
  };

  videoElm: any;

  componentDidMount() {}

  initApi = () => {
    if (!initModule) {
      initModule = true;
      const _this = this;
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

  initVideo = () => {
    const _this = this;
    _this.videoElm = window.document.getElementById("indexVideo");
    _this.videoElm.addEventListener("ended", function() {
      _this.setState({
        playStatus: false,
      });
    });
  };

  toPayer = () => {
    const _this = this;
    this.setState(
      {
        playStatus: true,
      },
      () => {
        _this.videoElm.play();
      },
    );
  };

  render() {
    const { cover, video, playStatus } = this.state;
    const { activeIndex } = this.props.store.indexStore;
    if (activeIndex === 3) {
      this.initApi();
    }
    return (
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: `url(${require("./img/bg.png").default})`,
        }}
      >
        <div className={styles.strBox}>
          <div className={styles.title}>
            <p>首个可以</p>
            <p>
              <span>自由组合</span>的玩具柜
            </p>
          </div>
          <div className={styles.title2}>就像IKEA的洞洞板一样</div>
        </div>
        <div className={styles.toyChest}>
          <div className={styles.toyChest_title}>添加玩具柜组件</div>
          <img
            className={styles.toyChest_cover}
            src={require("./img/toyModule.png").default}
            alt=""
          />
        </div>

        <div className={`${styles.videBox}`}>
          <img
            className={styles.playText}
            src={require("./img/play_text.png").default}
            alt=""
          />
          {!playStatus && (
            <img
              className={styles.start}
              src={require("./img/start.png").default}
              alt=""
              onClick={this.toPayer}
            />
          )}

          <video
            id="indexVideo"
            poster={cover}
            className={styles.video}
            src={video}
          ></video>
        </div>
      </div>
    );
  }
}
export default Module;
