import React from "react";
import styles from "./index.module.scss";
import { observer, inject } from "mobx-react";

interface moduleProps {
  onSwatch: Function;
  [propsName: string]: any;
}

interface Header {}

@inject("store") // 将store注入到当前组件中
@observer // 将该组件变成响应式组件
class Header extends React.Component<moduleProps> {
  static defaultProps: moduleProps = {
    onSwatch: () => {},
  };

  state = {
    navList: [
      {
        value: 0,
        name: "首页",
      },
      {
        value: 1,
        name: "盒DAN机器人",
      },
      {
        value: 2,
        name: "摄影达人",
      },
      {
        value: 3,
        name: "特好玩的玩具柜",
      },
    ],
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  swatchTo = (index: number) => {
    this.props.onSwatch(index);
  };

  headerColor = (index: number) => {
    let isDownApp = false;
    let isWhite = false;
    switch (index) {
      case 0:
        break;
      case 1:
        isDownApp = true;
        break;
      case 2:
        isDownApp = true;
        isWhite = true;
        break;
      case 3:
        isDownApp = true;
        break;
      case 4:
        isWhite = true;
        break;
      default:
        break;
    }

    return {
      isDownApp,
      isWhite,
    };
  };

  render() {
    const { navList } = this.state;
    const { activeIndex } = this.props.store.indexStore;

    const { isDownApp, isWhite } = this.headerColor(activeIndex);
    return (
      <div className={styles.wrapper}>
        <div className={styles.logoBox}>
          {isWhite ? (
            <img
              className={styles.logo}
              src={require("@/assets/image/header-logo-white.png").default}
              alt=""
            />
          ) : (
            <img
              className={styles.logo}
              src={require("@/assets/image/header-logo.png").default}
              alt=""
            />
          )}
        </div>

        <div className={styles.btnBox}>
          {navList.map((item) => {
            return (
              <div
                key={item.value}
                className={`${styles.item} ${
                  isWhite ? styles.white : ""
                }  ${activeIndex === item.value && styles.active}`}
                onClick={() => {
                  this.swatchTo(item.value);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        {isDownApp && (
          <img
            className={styles.downloadNow}
            src={require("@/assets/image/down-now.png").default}
            alt=""
            onClick={() => {
              this.swatchTo(4);
            }}
          />
        )}
      </div>
    );
  }
}
export default Header;
