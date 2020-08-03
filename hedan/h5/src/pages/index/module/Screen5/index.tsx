import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import Button from "../Button";
interface moduleProps {
  showProduct: Function;
  showOperate: Function;
  [propsName: string]: any;
}

interface Module {
  contentRef: any;
  bottomRef: any;
}
class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    showProduct: () => {},
    showOperate: () => {},
  };

  constructor(props: moduleProps) {
    super(props);
    this.contentRef = React.createRef();
    this.bottomRef = React.createRef();
  }

  state = {
    isMargin: false,
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  //浏览器视口的高度
  isMarginTop = () => {
    let windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    const contentHeight: any = this.contentRef.current.offsetHeight;
    const bottomOffsetTop = this.bottomRef.current.offsetTop;
    this.setState({
      isMargin: bottomOffsetTop < contentHeight,
    });
  };

  render() {
    const {isMargin} = this.state;
    return (
      <div className={styles.wrapper}>
        <div ref={this.contentRef} className={styles.content}>
          <img
            className={`${styles.logo} ${isMargin && styles.active}`}
            src={require("./img/logo.png").default}
            alt=""
            onLoad={this.isMarginTop}
          />
          {/* <div className={styles.cont}>
            <div>
              急招
              <span
                className={styles.btn}
                onClick={() => {
                  this.props.showProduct();
                }}
              >
                产品经理
              </span>
              和
              <span
                className={styles.btn}
                onClick={() => {
                  this.props.showOperate();
                }}
              >
                运营专员!
              </span>
            </div>
            <div>
              有意者请加微信<span>HirokazuKoreeda</span>
            </div>
          </div> */}
          <Button
            className={styles.downLoadApp}
            onClick={() => {
              this.props.downLoadApp();
            }}
          >
            立即安装APP
          </Button>
        </div>
        <img
          className={styles.bottomBg}
          src={require("./img/bottom_bg.svg").default}
          alt=""
        />
        <div className={styles.bottom} ref={this.bottomRef}>
          <p>©2020 盒DAN Beta1.0</p>
          <p> / 上海禾稻文化传播有限公司 / </p>
          <p>
            <a
              href="http://www.beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
            >
              沪ICP备19033567号-1
            </a>
          </p>
        </div>
      </div>
    );
  }
}
export default Module;
