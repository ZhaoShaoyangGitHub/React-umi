import React from "react";
import styles from "./index.module.scss";
import ButtonList from "../ButtonList";

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
          <ButtonList type="black" className={styles.buttonList} />
        </div>
      </div>
    );
  }
}
export default Module;
