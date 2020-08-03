import React from "react";
import Avatar from "@/components/Avatar";
import styles from "./index.module.scss";
import Button from "../Button";

interface moduleProps {
  [propsName: string]: any;
}

interface Module {}
class Module extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {};

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  downLoadApp = () => {
    this.props.downLoadApp();
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.text1}>你在买玩具时的</div>
        <div className={styles.text2}>好帮手!</div>
        <img
          className={styles.bg}
          src={require("./img/bg.png").default}
          alt=""
        />
        <div className={styles.footer}>
          <Button className={styles.downLoadBtn} onClick={this.downLoadApp}>
            下载安装APP
          </Button>
        </div>
      </div>
    );
  }
}
export default Module;
